import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCcw, Sparkles, Loader2, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

const MESSAGES = [
    "素晴らしい！合格へ一歩近づきました！",
    "その調子です！毎日の積み重ねが大切です。",
    "お疲れ様でした！着実に力がついています。",
    "ナイスチャレンジ！この調子で頑張りましょう。",
    "継続は力なり。あなたの努力は必ず実ります！"
];

export const CompletionScreen = ({ onRetry, onAddMore, isGenerating }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981']
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mb-6 p-6 bg-amber-100 rounded-3xl text-amber-500 shadow-xl shadow-amber-100"
            >
                <Trophy size={64} strokeWidth={1.5} />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black text-slate-900 mb-2"
            >
                完了！お疲れ様でした
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 mb-10 max-w-[240px] mx-auto leading-relaxed font-medium"
            >
                {message}
            </motion.p>

            <div className="w-full max-w-xs space-y-4">
                <button
                    onClick={onAddMore}
                    disabled={isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70"
                >
                    {isGenerating ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : (
                        <Sparkles size={24} />
                    )}
                    <div className="text-left">
                        <div className="text-[10px] opacity-80 leading-none mb-1">LEARN MORE</div>
                        <div className="leading-none text-sm">さらにAIで問題を追加（5問）</div>
                    </div>
                </button>

                <button
                    onClick={onRetry}
                    className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-slate-50 active:scale-95"
                >
                    <RefreshCcw size={20} />
                    <span>同じ問題をもう一度解く</span>
                </button>
            </div>
        </div>
    );
};
