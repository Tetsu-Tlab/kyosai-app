import React, { useState, useMemo, useEffect } from 'react';
import { TabNavigation, TABS } from './components/TabNavigation';
import { QuizCard } from './components/QuizCard';
import { CompletionScreen } from './components/CompletionScreen';
import { QUESTIONS } from './data/questions';
import { useScoreKeeper } from './hooks/useScoreKeeper';
import { useQuizLogic } from './hooks/useQuizLogic';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { Settings } from './components/Settings';
import { useAIQuestions } from './hooks/useAIQuestions';

function App() {
  const [activeTab, setActiveTab] = useState('pedagogy_general');
  const { recordResult, getReviewList } = useScoreKeeper();
  const { generateQuestion, getGeneratedQuestions, isGenerating } = useAIQuestions();
  const [generatedQuestionsState, setGeneratedQuestionsState] = useState([]);

  // Load generated questions on mount
  useEffect(() => {
    setGeneratedQuestionsState(getGeneratedQuestions());
  }, [getGeneratedQuestions]);

  // Determine questions based on tab
  const activeQuestions = useMemo(() => {
    const allAvailable = [...QUESTIONS, ...generatedQuestionsState];
    if (activeTab === 'miss_review') {
      return getReviewList(allAvailable);
    }
    if (activeTab === 'settings') {
      return [];
    }
    return allAvailable.filter(q => q.category === activeTab);
  }, [activeTab, getReviewList, generatedQuestionsState]);

  // Quiz Logic
  const quiz = useQuizLogic(activeQuestions);

  // Force reset when tab changes
  useEffect(() => {
    quiz.resetQuiz();
  }, [activeTab]);

  const handleHandleAI = async () => {
    try {
      const updated = await generateQuestion(activeTab, activeTabLabel);
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

  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-bold text-lg text-indigo-900 tracking-tight">
            教採対策アプリ
          </h1>
          <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
            {activeTabLabel}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-[calc(100vh-8rem)]">
        {activeTab === 'settings' ? (
          <Settings />
        ) : activeTab === 'miss_review' && activeQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center text-slate-500">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">復習完了！</h2>
            <p>現在、間違えた問題の履歴はありません。<br />他のカテゴリで学習を進めましょう！</p>
          </div>
        ) : (
          <>
            {/* AI Generate Button (Only for question tabs) */}
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
                      <span>AIで新しい問題を追加</span>
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
                  <p>問題がまだありません</p>
                  <button
                    onClick={handleHandleAI}
                    disabled={isGenerating}
                    className="py-2 px-6 bg-indigo-50 text-indigo-600 font-bold rounded-full border border-indigo-100 flex items-center gap-2"
                  >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    AIで作成する
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
