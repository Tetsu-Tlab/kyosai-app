import { useState, useCallback } from 'react';

export const useQuizLogic = (questions, onCompleteSub) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = useCallback((optionIndex) => {
        if (isAnswered) return;

        const correctLink = currentQuestion.correctIndex;
        const correct = optionIndex === correctLink;

        setIsAnswered(true);
        setSelectedOptionIndex(optionIndex);
        setIsCorrect(correct);

        return correct; // return result for immediate side-effects
    }, [currentQuestion, isAnswered]);

    const nextQuestion = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setIsCorrect(false);
            setSelectedOptionIndex(null);
        } else {
            setIsFinished(true);
            if (onCompleteSub) onCompleteSub();
        }
    }, [currentIndex, questions.length, onCompleteSub]);

    const resetQuiz = useCallback(() => {
        setCurrentIndex(0);
        setIsAnswered(false);
        setIsFinished(false);
        setSelectedOptionIndex(null);
    }, []);

    return {
        currentQuestion,
        currentIndex,
        total: questions.length,
        isAnswered,
        isCorrect, // result of current question
        selectedOptionIndex,
        isFinished,
        handleAnswer,
        nextQuestion,
        resetQuiz
    };
};
