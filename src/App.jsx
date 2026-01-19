import React, { useState, useMemo, useEffect } from 'react';
import { TabNavigation, TABS } from './components/TabNavigation';
import { QuizCard } from './components/QuizCard';
import { CompletionScreen } from './components/CompletionScreen';
import { QUESTIONS } from './data/questions';
import { useScoreKeeper } from './hooks/useScoreKeeper';
import { useQuizLogic } from './hooks/useQuizLogic';
import { AlertCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('pedagogy_general');
  const { recordResult, getReviewList } = useScoreKeeper();

  // Determine questions based on tab
  const activeQuestions = useMemo(() => {
    if (activeTab === 'miss_review') {
      return getReviewList(QUESTIONS);
    }
    return QUESTIONS.filter(q => q.category === activeTab);
  }, [activeTab, getReviewList]);

  // Quiz Logic
  // We use a key based on activeTab to reset the hook/state completely when tab changes
  // But wait, if we complete a quiz and want to retry, we just call resetQuiz.
  const quiz = useQuizLogic(activeQuestions);

  // Force reset when tab changes
  useEffect(() => {
    quiz.resetQuiz();
  }, [activeTab]);

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
        {/* Empty State for Review */}
        {activeTab === 'miss_review' && activeQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center text-slate-500">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">復習完了！</h2>
            <p>現在、間違えた問題の履歴はありません。<br />他のカテゴリで学習を進めましょう！</p>
          </div>
        ) : (
          <>
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
                <div className="flex items-center justify-center h-64 text-slate-400">
                  <p>問題が見つかりません</p>
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
