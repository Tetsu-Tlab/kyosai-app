import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

export const QuizCard = ({
    question,
    questionIndex,
    totalQuestions,
    isAnswered,
    selectedOptionIndex,
    onAnswer,
    isCorrect,
    onNext
}) => {
    return (
        <div className="w-full max-w-md mx-auto px-4 pb-24 pt-4">
            {/* Progress */}
            <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Question {questionIndex + 1} / {totalQuestions}</span>
                <span>{question.category}</span>
            </div>

            {/* Question */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={question.id + "-q"}
                className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100"
            >
                <h2 className="text-lg font-bold text-slate-800 leading-relaxed">
                    {question.question}
                </h2>
            </motion.div>

            {/* Options */}
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isSelected = selectedOptionIndex === index;
                    const isCorrectOption = question.correctIndex === index;

                    // Style state logic
                    let statusClass = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"; // Default

                    if (isAnswered) {
                        if (isCorrectOption) {
                            statusClass = "bg-green-50 border-green-500 text-green-700 font-medium";
                        } else if (isSelected && !isCorrect) {
                            statusClass = "bg-red-50 border-red-500 text-red-700";
                        } else {
                            statusClass = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                        }
                    }

                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            disabled={isAnswered}
                            onClick={() => onAnswer(index)}
                            className={clsx(
                                "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 relative overflow-hidden",
                                statusClass,
                                !isAnswered && "active:scale-98 active:bg-indigo-50 active:border-indigo-200"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className={clsx(
                                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border",
                                    isAnswered && isCorrectOption ? "bg-green-500 border-green-500 text-white" :
                                        isAnswered && isSelected && !isCorrect ? "bg-red-500 border-red-500 text-white" :
                                            "bg-slate-100 border-slate-200 text-slate-500"
                                )}>
                                    {index + 1}
                                </span>
                                <span className="flex-1">{option}</span>

                                {isAnswered && isCorrectOption && <CheckCircle className="text-green-600 w-5 h-5 shrink-0" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 w-5 h-5 shrink-0" />}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Explanation / Feedback */}
            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6"
                    >
                        <div className={clsx(
                            "rounded-xl p-5 border-l-4 shadow-sm mb-4",
                            isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                        )}>
                            <div className="flex items-center gap-2 mb-2 font-bold">
                                {isCorrect ? (
                                    <span className="text-green-700">正解！ Great Job!</span>
                                ) : (
                                    <span className="text-red-700">残念... 復習しましょう</span>
                                )}
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed mb-3">
                                {question.explanation}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <BookOpen size={14} />
                                <span>出典: {question.reference}</span>
                            </div>
                        </div>

                        <button
                            onClick={onNext}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <span>次の問題へ</span>
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
