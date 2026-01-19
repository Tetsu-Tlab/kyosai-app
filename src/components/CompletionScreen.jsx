import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCcw, Star, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

const MESSAGES = [
    "素晴らしい！合格へ一歩近づきました！",
    "その調子です！毎日の積み重ねが大切です。",
    "お疲れ様でした！着実に力がついています。",
    "ナイスチャレンジ！この調子で頑張りましょう。",
    "継続は力なり。あなたの努力は必ず実ります！"
];

export const CompletionScreen = ({ onRetry, onGoHome }) => {
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
                className="mb-6 p-6 bg-yellow-100 rounded-full text-yellow-500 shadow-lg shadow-yellow-200"
            >
                <Trophy size={64} strokeWidth={1.5} />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-slate-800 mb-2"
            >
                Session Complete!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 mb-8 max-w-xs mx-auto leading-relaxed"
            >
                {message}
            </motion.p>

            <div className="w-full max-w-xs space-y-3">
                <button
                    onClick={onRetry}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-transform active:scale-95"
                >
                    <RefreshCcw size={20} />
                    <span>もう一度やる</span>
                </button>

                {/* Helper to go to review or home could be nice, but simple retry is sufficient */}
            </div>
        </div>
    );
};
