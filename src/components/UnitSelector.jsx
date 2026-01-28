import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, CheckCircle } from 'lucide-react';
import { COURSE_STRUCTURE } from '../data/constants';

export const UnitSelector = ({ categoryId, onSelectUnit, stats }) => {
    const course = COURSE_STRUCTURE[categoryId];
    if (!course) return null;

    return (
        <div className="p-6 pt-2 space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <LayoutGrid size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">{course.label}の単元</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {course.units.map((unit, index) => (
                    <motion.button
                        key={unit.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectUnit(unit)}
                        className="group relative bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left flex items-center gap-4 active:scale-[0.98]"
                    >
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                {unit.label}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">{unit.description}</p>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <ChevronRight size={18} />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Quick Guide Card */}
            <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold mb-1">効率的な学習のヒント</h4>
                        <p className="text-white/60 text-xs leading-relaxed">
                            単元ごとに集中して解くことで、知識の定着率が3倍に向上します。苦手な単元はAIで追加問題を生成しましょう。
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full -mr-12 -mt-12 blur-2xl"></div>
            </div>
        </div>
    );
};
