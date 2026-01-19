import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kyosai_app_scores_v1';

export const useScoreKeeper = () => {
    const [scores, setScores] = useState({});

    useEffect(() => {
        const loaded = localStorage.getItem(STORAGE_KEY);
        if (loaded) {
            try {
                setScores(JSON.parse(loaded));
            } catch (e) {
                console.error("Failed to parse scores", e);
            }
        }
    }, []);

    const saveScores = (newScores) => {
        setScores(newScores);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
    };

    const recordResult = (questionId, isCorrect) => {
        const current = scores[questionId] || { correct: 0, miss: 0, lastResult: null };
        const updated = {
            ...current,
            correct: isCorrect ? current.correct + 1 : current.correct,
            miss: isCorrect ? current.miss : current.miss + 1,
            lastResult: isCorrect ? 'correct' : 'miss',
            lastAnsweredAt: Date.now()
        };

        const newScores = {
            ...scores,
            [questionId]: updated
        };
        saveScores(newScores);
    };

    const getMissCount = (questionId) => {
        return scores[questionId]?.miss || 0;
    };

    const getReviewList = (allQuestions) => {
        // Return all questions that have at least 1 miss, sorted by miss count (desc)
        return allQuestions.filter(q => {
            const stats = scores[q.id];
            return stats && stats.miss > 0; // Only miss > 0 or also show if ratio is bad? Miss > 0 is simplest request.
        }).sort((a, b) => {
            const missA = scores[a.id]?.miss || 0;
            const missB = scores[b.id]?.miss || 0;
            return missB - missA; // Descending
        });
    };

    return {
        scores,
        recordResult,
        getMissCount,
        getReviewList
    };
};
