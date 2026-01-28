import React, { useState, useMemo, useEffect } from 'react';
import { TabNavigation, TABS } from './components/TabNavigation';
import { QuizCard } from './components/QuizCard';
import { CompletionScreen } from './components/CompletionScreen';
import { QUESTIONS } from './data/questions';
import { useScoreKeeper } from './hooks/useScoreKeeper';
import { useQuizLogic } from './hooks/useQuizLogic';
import { AlertCircle, Sparkles, Loader2, GraduationCap, ChevronLeft } from 'lucide-react';
import { Settings } from './components/Settings';
import { HomeScreen } from './components/HomeScreen';
import { UnitSelector } from './components/UnitSelector';
import { useAIQuestions } from './hooks/useAIQuestions';
import { COURSE_STRUCTURE } from './data/constants';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeUnit, setActiveUnit] = useState(null);
  const { recordResult, getReviewList, getStats } = useScoreKeeper();
  const { generateQuestion, getGeneratedQuestions, isGenerating } = useAIQuestions();
  const [generatedQuestionsState, setGeneratedQuestionsState] = useState([]);

  // Load generated questions on mount
  useEffect(() => {
    setGeneratedQuestionsState(getGeneratedQuestions());
  }, [getGeneratedQuestions]);

  // Reset unit when tab changes
  useEffect(() => {
    setActiveUnit(null);
  }, [activeTab]);

  // Stats for dashboard
  const stats = useMemo(() => getStats(), [recordResult, getStats]);

  const activeTabLabel = useMemo(() => {
    if (activeTab === 'home') return 'ダッシュボード';
    if (activeUnit) return activeUnit.label;
    return TABS.find(t => t.id === activeTab)?.label || '学習';
  }, [activeTab, activeUnit]);

  // Determine questions based on tab AND unit
  const activeQuestions = useMemo(() => {
    const allAvailable = [...QUESTIONS, ...generatedQuestionsState];
    if (activeTab === 'miss_review') {
      return getReviewList(allAvailable);
    }
    if (activeTab === 'settings' || activeTab === 'home' || !activeUnit) {
      return [];
    }
    // Filter by category and unit
    return allAvailable.filter(q => q.category === activeTab && (!q.unit || q.unit === activeUnit.id));
  }, [activeTab, activeUnit, getReviewList, generatedQuestionsState]);

  // Quiz Logic
  const quiz = useQuizLogic(activeQuestions);

  // Force reset when unit changes
  useEffect(() => {
    quiz.resetQuiz();
  }, [activeUnit]);

  const handleHandleAI = async () => {
    if (!activeUnit) return;
    try {
      const parentLabel = COURSE_STRUCTURE[activeTab]?.label || '教職一般';
      const updated = await generateQuestion(activeTab, parentLabel, activeUnit.id, activeUnit.label);
      setGeneratedQuestionsState(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAnswer = (optionIndex) => {
    const isCorrect = quiz.handleAnswer(optionIndex);
    // Record score immediately
    recordResult(quiz.currentQuestion.id, isCorrect);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeUnit ? (
              <button
                onClick={() => setActiveUnit(null)}
                className="w-10 h-10 -ml-2 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <GraduationCap size={18} />
              </div>
            )}
            <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">
              {activeUnit ? activeUnit.label : 'T-Lab Kyosai'}
            </h1>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
            {activeTabLabel}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-[calc(100vh-8rem)]">
        {activeTab === 'home' ? (
          <HomeScreen stats={stats} onSelectTab={setActiveTab} />
        ) : activeTab === 'settings' ? (
          <Settings />
        ) : activeTab === 'miss_review' && activeQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center text-slate-500">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">復習完了！</h2>
            <p>現在、間違えた問題の履歴はありません。<br />ホームから学習を進めましょう！</p>
          </div>
        ) : !activeUnit && activeTab !== 'miss_review' ? (
          <UnitSelector categoryId={activeTab} onSelectUnit={setActiveUnit} />
        ) : (
          <>
            {/* AI Generate Button (Only for unit tabs) */}
            {activeTab !== 'miss_review' && !quiz.isFinished && (
              <div className="px-4 pt-4">
                <button
                  onClick={handleHandleAI}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>問題生成中...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>{activeUnit?.label}の問題を追加</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {!quiz.isFinished ? (
              activeQuestions.length > 0 ? (
                <QuizCard
                  question={quiz.currentQuestion}
                  questionIndex={quiz.currentIndex}
                  totalQuestions={quiz.total}
                  isAnswered={quiz.isAnswered}
                  isCorrect={quiz.isCorrect}
                  selectedOptionIndex={quiz.selectedOptionIndex}
                  onAnswer={handleAnswer}
                  onNext={quiz.nextQuestion}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-4">
                  <p>{activeUnit?.label}の問題がまだありません</p>
                  <button
                    onClick={handleHandleAI}
                    disabled={isGenerating}
                    className="py-3 px-8 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2 transition-transform active:scale-95"
                  >
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    AIで問題を生成する
                  </button>
                </div>
              )
            ) : (
              <CompletionScreen
                onRetry={quiz.resetQuiz}
              />
            )}
          </>
        )}
      </main>

      {/* Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;
