import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy,
    Target,
    Zap,
    ArrowRight,
    Sparkles,
    BookOpen,
    Scale,
    Map,
    HeartHandshake,
    AlertTriangle
} from 'lucide-react';

const CATEGORY_ICONS = {
    prediction_2026: { icon: Sparkles, color: 'bg-violet-600', label: '2026予想' },
    pedagogy_general: { icon: BookOpen, color: 'bg-blue-500', label: '教職・一般' },
    civics: { icon: Scale, color: 'bg-rose-500', label: '専門：公民' },
    geography: { icon: Map, color: 'bg-emerald-500', label: '専門：地理' },
    special_needs_fukuoka: { icon: HeartHandshake, color: 'bg-amber-500', label: '福岡：特支' },
};

export const HomeScreen = ({ stats, onSelectTab }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="px-6 py-8 space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Welcome Header */}
            <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Hello! <span className="text-indigo-600">Teacher.</span>
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium">合格への道、今日も一歩前へ。</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <Trophy size={24} />
                    </div>
                </div>
            </motion.div>

            {/* Stats Dashboard */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
                {[
                    { label: '解いた問題', value: stats.totalAnswered, icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: '正解率', value: `${stats.accuracy}%`, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: '要復習', value: stats.missCount, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-white/50 shadow-sm`}>
                        <div className={`${stat.color} mb-2`}>
                            <stat.icon size={20} />
                        </div>
                        <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Course Categories */}
            <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-extrabold text-slate-800">学習コース</h2>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-tighter">
                        Select Subject
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {Object.entries(CATEGORY_ICONS).map(([id, cfg]) => (
                        <button
                            key={id}
                            onClick={() => onSelectTab(id)}
                            className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all text-left flex items-center gap-5 active:scale-[0.97]"
                        >
                            <div className={`${cfg.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                <cfg.icon size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {cfg.label}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5 font-medium">単元別にターゲットを絞って学習</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                <ArrowRight size={20} />
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* AI Special Section */}
            <motion.div variants={itemVariants}>
                <button
                    onClick={() => onSelectTab('settings')}
                    className="w-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden active:scale-[0.98] transition-transform"
                >
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-1">Gemini AI 無限問題生成</h3>
                        <p className="text-white/80 text-sm mb-4">あなたの苦手分野をAIが分析して<br />新しい問題を生成します。</p>
                        <div className="px-6 py-2 bg-white text-indigo-700 rounded-full text-xs font-bold shadow-lg">
                            AI設定を開く
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                </button>
            </motion.div>
        </motion.div>
    );
};
