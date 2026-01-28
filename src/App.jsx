import React, { useState, useMemo, useEffect } from 'react';
import { TabNavigation, TABS } from './components/TabNavigation';
import { QuizCard } from './components/QuizCard';
import { CompletionScreen } from './components/CompletionScreen';
// Static sample questions removed as per user request
const QUESTIONS = [];
import { useScoreKeeper } from './hooks/useScoreKeeper';
import { useQuizLogic } from './hooks/useQuizLogic';
import { AlertCircle, Sparkles, Loader2, GraduationCap, ChevronLeft, ArrowRight, BookOpen, Scale, HeartHandshake, RefreshCcw } from 'lucide-react';
import { Settings } from './components/Settings';
import { HomeScreen } from './components/HomeScreen';
import { UnitSelector } from './components/UnitSelector';
import { useAIQuestions } from './hooks/useAIQuestions';
import { COURSE_STRUCTURE } from './data/constants';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const { recordResult, getReviewList, getStats, clearStats } = useScoreKeeper();
  const { generateQuestion, getGeneratedQuestions, clearAllQuestions, isGenerating } = useAIQuestions();
  const [generatedQuestionsState, setGeneratedQuestionsState] = useState([]);
  const [generationFailed, setGenerationFailed] = useState(false);

  // Load generated questions on mount
  useEffect(() => {
    setGeneratedQuestionsState(getGeneratedQuestions());
  }, [getGeneratedQuestions]);

  // Reset category/unit when tab changes to home or settings
  useEffect(() => {
    if (activeTab === 'home' || activeTab === 'settings' || activeTab === 'miss_review') {
      setActiveCategory(null);
      setActiveUnit(null);
    }
    setGenerationFailed(false);
  }, [activeTab]);

  // Stats for dashboard
  const stats = useMemo(() => getStats(), [recordResult, getStats]);

  const activeTabLabel = useMemo(() => {
    if (activeTab === 'home') return 'ダッシュボード';
    if (activeTab === 'settings') return '設定';
    if (activeTab === 'miss_review') return 'ミス復習';
    if (activeUnit) return activeUnit.label;
    if (activeCategory) return COURSE_STRUCTURE[activeCategory]?.label;
    return '学習コース';
  }, [activeTab, activeUnit, activeCategory]);

  // Determine questions based on category AND unit
  const activeQuestions = useMemo(() => {
    const allAvailable = generatedQuestionsState;

    if (activeTab === 'miss_review') {
      return getReviewList(allAvailable);
    }

    if (!activeCategory || !activeUnit) {
      return [];
    }

    // Filter by category and unit
    return allAvailable.filter(q =>
      q.category === activeCategory &&
      (q.unit === activeUnit.id)
    );
  }, [activeTab, activeCategory, activeUnit, getReviewList, generatedQuestionsState]);

  // Quiz Logic
  const quiz = useQuizLogic(activeQuestions);

  // Auto-generate 10 questions when entering a unit if it's empty
  useEffect(() => {
    if (activeCategory && activeUnit && activeTab !== 'miss_review' && activeQuestions.length === 0 && !isGenerating && !generationFailed) {
      handleHandleAI(10);
    }
  }, [activeCategory, activeUnit, activeQuestions.length, activeTab, isGenerating, generationFailed]);

  // Force reset when unit changes
  useEffect(() => {
    quiz.resetQuiz();
    setGenerationFailed(false);
  }, [activeUnit]);

  const handleHandleAI = async (count = 1) => {
    if (!activeCategory || !activeUnit) return;
    setGenerationFailed(false);
    try {
      const catLabel = COURSE_STRUCTURE[activeCategory]?.label || '教職一般';
      const updated = await generateQuestion(activeCategory, catLabel, activeUnit.id, activeUnit.label, count);
      setGeneratedQuestionsState(updated);

      if (quiz.isFinished) {
        quiz.resetQuiz();
      }
    } catch (err) {
      setGenerationFailed(true);
      console.error("AI Generation failed:", err.message);
    }
  };

  const handleResetStats = () => {
    clearStats();
    // Stats will auto-refresh via getStats()
  };

  const handleResetQuestions = () => {
    clearAllQuestions();
    setGeneratedQuestionsState([]);
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
            {(activeUnit || activeCategory) ? (
              <button
                onClick={() => {
                  if (activeUnit) setActiveUnit(null);
                  else setActiveCategory(null);
                }}
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
              {activeUnit ? activeUnit.label : (activeCategory ? COURSE_STRUCTURE[activeCategory].label : 'T-Lab Kyosai')}
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
          <HomeScreen stats={stats} onSelectTab={setActiveTab} onSelectCategory={setActiveCategory} />
        ) : activeTab === 'settings' ? (
          <Settings
            onResetStats={handleResetStats}
            onResetQuestions={handleResetQuestions}
          />
        ) : activeTab === 'miss_review' ? (
          activeQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center text-slate-500">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">復習完了！</h2>
              <p>現在、間違えた問題の履歴はありません。<br />ホームから学習を進めましょう！</p>
            </div>
          ) : (
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
          )
        ) : !activeCategory ? (
          <div className="px-6 py-8 space-y-4">
            <h2 className="text-xl font-extrabold text-slate-800 px-1">カテゴリーを選択</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(COURSE_STRUCTURE).map(([id, cfg]) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${cfg.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white`}>
                      {id === 'pedagogy' ? <BookOpen size={24} /> : id === 'social_studies' ? <Scale size={24} /> : <HeartHandshake size={24} />}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">{cfg.label}</h3>
                      <p className="text-[10px] text-slate-400 font-medium">{cfg.description}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          </div>
        ) : !activeUnit ? (
          <UnitSelector categoryId={activeCategory} onSelectUnit={setActiveUnit} />
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
                <div className="flex flex-col items-center justify-center min-h-[50vh] px-8 text-center">
                  {!generationFailed ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="relative mb-6">
                        <Loader2 size={48} className="animate-spin text-indigo-500" />
                        <Sparkles size={20} className="absolute -top-1 -right-1 text-amber-400 animate-bounce" />
                      </div>
                      <p className="text-slate-700 font-black text-lg">AIが良問を10問作成中...</p>
                      <p className="text-xs text-slate-400 mt-2 font-medium">最新の出題傾向と九州の過去問を分析しています</p>
                    </div>
                  ) : (
                    <div className="bg-white p-8 rounded-3xl border-2 border-rose-50 border-dashed flex flex-col items-center">
                      <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                        <AlertCircle size={32} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">生成に失敗しました</h3>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        API制限に達したか、接続が不安定です。<br />1分ほど待ってから再試行してください。
                      </p>
                      <button
                        onClick={() => handleHandleAI(10)}
                        className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-slate-200"
                      >
                        <RefreshCcw size={18} />
                        もう一度試す
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <CompletionScreen
                onRetry={quiz.resetQuiz}
                onAddMore={() => handleHandleAI(5)}
                isGenerating={isGenerating}
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
