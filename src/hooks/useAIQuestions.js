import { useState, useCallback } from 'react';

const GENERATED_QUESTIONS_KEY = 'kyosai_app_generated_questions_v1';

export const useAIQuestions = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    const getGeneratedQuestions = useCallback(() => {
        const saved = localStorage.getItem(GENERATED_QUESTIONS_KEY);
        return saved ? JSON.parse(saved) : [];
    }, []);

    const saveGeneratedQuestions = useCallback((newQuestions) => {
        const existing = getGeneratedQuestions();
        const updated = [...existing, ...newQuestions.map(q => ({ ...q, id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }))];
        localStorage.setItem(GENERATED_QUESTIONS_KEY, JSON.stringify(updated));
        return updated;
    }, [getGeneratedQuestions]);

    const generateQuestion = async (category, categoryLabel, unitId, unitLabel, count = 1) => {
        const apiKey = localStorage.getItem('gemini_api_key')?.trim();
        const prefecture = localStorage.getItem('user_prefecture') || '福岡県';

        if (!apiKey) {
            throw new Error('API Keyが設定されていません。設定画面で登録してください。');
        }

        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `
あなたは日本の教員採用試験（教採）の対策専門家です。
以下の条件に基づいて、合格レベルの高品質な4択問題を【${count}問】作成してください。

【厳守事項】
1. 正解のランダム化: 各問題の正解インデックス(answer)が 0, 1, 2, 3 の中でバラバラになるようにしてください。
2. 内容の網羅性: 単元「${unitLabel}」の範囲内で、出題テーマが重複しないよう、多角的（知識、理解、思考）な問題を${count}問作成してください。
3. 形式: 必ず以下のJSON形式の配列のみで返答してください。

[
  {
    "question": "問題文",
    "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
    "answer": 正解のインデックス番号(0-3),
    "explanation": "解説",
    "reference": "出典"
  },
  ...
]

【条件】
1. 自治体・地域: ${prefecture}
2. 大項目: ${categoryLabel}
3. 単元: ${unitLabel}
4. 難易度: 実際の1次試験（専門教養レベル）

【出題方針】
- ${category === 'prediction_2026' ? '2026年度に向けた最新予想問題。近年の傾向から重要度の高いテーマを厳選。' : '過去10年の頻出事項から、本質的な理解を問う良問。'}
- ${category === 'geography' ? '地形、気候、統計、地誌、GIS、SDGs等の多様な側面。' : ''}
- ${category === 'civics' ? '憲法、政治、経済、倫理、時事のバランス。' : ''}
- ${category === 'pedagogy_general' ? '教育法規、原理、心理、史、生徒指導、ICT、答申。' : ''}
`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json",
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error?.message || `APIエラー (Status: ${response.status})`);
            }

            const data = await response.json();

            if (!data.candidates?.[0]?.content) {
                throw new Error('AIが回答を生成できませんでした。');
            }

            let content = data.candidates[0].content.parts[0].text;
            content = content.replace(/```json\n?|```/g, '').trim();

            let parsedRaw = JSON.parse(content);
            const questionsArray = Array.isArray(parsedRaw) ? parsedRaw : [parsedRaw];

            const processedQuestions = questionsArray.map(parsed => {
                // シャッフルロジック
                const originalOptions = Array.isArray(parsed.options) ? parsed.options : ["エラー", "エラー", "エラー", "エラー"];
                const originalAnswerIndex = Number(parsed.answer) || 0;
                const optionPairs = originalOptions.map((opt, i) => ({ text: opt, isCorrect: i === originalAnswerIndex }));

                for (let i = optionPairs.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
                }

                return {
                    category,
                    unit: unitId,
                    question: parsed.question || "生成エラー",
                    options: optionPairs.map(p => p.text),
                    correctIndex: optionPairs.findIndex(p => p.isCorrect),
                    explanation: parsed.explanation || "解説なし",
                    reference: parsed.reference || '教員採用試験 出題傾向'
                };
            });

            return saveGeneratedQuestions(processedQuestions);
        } catch (err) {
            console.error('AI Generation Error:', err);
            setError(err.message);
            throw err;
        } finally {
            setIsGenerating(false);
        }
    };

    const clearAllQuestions = useCallback(() => {
        localStorage.removeItem(GENERATED_QUESTIONS_KEY);
    }, []);

    return {
        generateQuestion,
        getGeneratedQuestions,
        clearAllQuestions,
        isGenerating,
        error
    };
};
