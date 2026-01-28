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

    const generateQuestion = async (category, categoryLabel) => {
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

【条件】
1. 自治体・地域: ${prefecture}
2. カテゴリ: ${categoryLabel}
3. 難易度: 実際の1次試験（公民などは専門試験レベル）を想定
4. 形式: 必ず以下のJSON形式で返答してください。他の説明文は一切含めないでください。

{
  "question": "問題文",
  "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  "answer": 正解のインデックス(0-3),
  "explanation": "詳細な解説。なぜその選択肢が正解なのか、他の選択肢がなぜ誤りなのかを含める。",
  "reference": "出典元（学習指導要領、憲法、法律名など）"
}

【出題のヒント】
- ${category === 'civics' ? 'ロック、ルソーなどの思想家、日本国憲法、経済学の基礎概念、国際情勢などから出題してください。' : ''}
- ${category === 'pedagogy_general' ? '教育基本法、学校教育法、学習指導要領総則、中教審答申、心理学用語などから出題してください。' : ''}
- ${category === 'special_needs_fukuoka' ? '特別支援教育の基礎概念、福岡市独自の施策、自立活動の6区分、合理的配慮などから出題してください。' : ''}
- ${category === 'social_studies' ? '地理、歴史、公民の融合問題、または時事問題から出題してください。' : ''}
      `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        response_mime_type: "application/json",
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || 'APIリクエストに失敗しました');
            }

            const data = await response.json();
            const content = data.candidates[0].content.parts[0].text;
            const parsed = JSON.parse(content);

            // Map 'answer' to 'correctIndex' for compatibility
            const question = {
                category,
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
