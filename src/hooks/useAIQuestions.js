import { useState, useCallback } from 'react';

const GENERATED_QUESTIONS_KEY = 'kyosai_app_generated_questions_v1';

export const useAIQuestions = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    const getGeneratedQuestions = useCallback(() => {
        const saved = localStorage.getItem(GENERATED_QUESTIONS_KEY);
        return saved ? JSON.parse(saved) : [];
    }, []);

    const saveGeneratedQuestion = useCallback((question) => {
        const existing = getGeneratedQuestions();
        const updated = [...existing, { ...question, id: `ai_${Date.now()}` }];
        localStorage.setItem(GENERATED_QUESTIONS_KEY, JSON.stringify(updated));
        return updated;
    }, [getGeneratedQuestions]);

    const generateQuestion = async (category, categoryLabel, unitId, unitLabel) => {
        const apiKey = localStorage.getItem('gemini_api_key');
        const prefecture = localStorage.getItem('user_prefecture') || '福岡県';

        if (!apiKey) {
            throw new Error('API Keyが設定されていません。設定画面で登録してください。');
        }

        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `
あなたは日本の教員採用試験（教採）の対策専門家です。
以下の条件に基づいて、高品質な4択問題を1問作成してください。

【厳守：正解のランダム化】
正解の選択肢（answer）が毎回 0（1番目）に偏らないよう、0, 1, 2, 3 の中から完全にランダムに選んでください。

【条件】
1. 自治体・地域: ${prefecture}
2. 大項目: ${categoryLabel}
3. 単元（小項目）: ${unitLabel}
4. 難易度: 実際の1次試験（公民などは専門試験レベル）を想定
5. 形式: 必ず以下のJSON形式で返答してください。他の説明文は一切含めないでください。

{
  "question": "問題文",
  "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  "answer": 正解のインデックス(0-3),
  "explanation": "詳細な解説。なぜその選択肢が正解なのか、他の選択肢がなぜ誤りなのかを含める。",
  "reference": "出典元（学習指導要領、憲法、法律名など）"
}

【出題のヒント】
- ${category === 'prediction_2026' ? '2026年度試験に向けた最新予想問題です。「新採用職活動」の動向、令和6年・7年の答申、最新の社会情勢、および各県の過去3年の出題頻度から「次に出る」テーマを選定してください。' : ''}
- ${category === 'geography' ? '地形、気候、統計データ、地図の読解、世界の諸地域の特徴、GIS、持続可能な社会などの要素を取り入れてください。' : ''}
- ${category === 'civics' ? '憲法、政治制度、経済理論、倫理（源流・近現代思想）、時事問題などの要素を取り入れてください。' : ''}
- ${category === 'pedagogy_general' ? '教育基本法、学習指導要領、教育心理学、教育史などの要素を取り入れてください。' : ''}
      `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
                const errData = await response.json();
                throw new Error(errData.error?.message || 'APIリクエストに失敗しました');
            }

            const data = await response.json();
            let content = data.candidates[0].content.parts[0].text;

            // Clean up potentially markdown-wrapped JSON
            content = content.replace(/```json\n?|```/g, '').trim();
            const parsed = JSON.parse(content);

            // Map 'answer' to 'correctIndex' for compatibility
            const question = {
                category,
                unit: unitId,
                question: parsed.question,
                options: parsed.options,
                correctIndex: parsed.answer,
                explanation: parsed.explanation,
                reference: parsed.reference || 'AI生成問題'
            };

            return saveGeneratedQuestion(question);
        } catch (err) {
            console.error('AI Generation Error:', err);
            setError(err.message);
            throw err;
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        generateQuestion,
        getGeneratedQuestions,
        isGenerating,
        error
    };
};
