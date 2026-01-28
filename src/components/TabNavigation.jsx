import { Home, BookOpen, Scale, Map, HeartHandshake, AlertTriangle, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { clsx } from 'clsx';

export const TABS = [
    { id: 'home', label: 'ホーム', icon: Home },
    { id: 'learn', label: '学習', icon: BookOpen },
    { id: 'miss_review', label: 'ミス復習', icon: AlertTriangle },
    { id: 'settings', label: '設定', icon: SettingsIcon },
];

export const TabNavigation = ({ activeTab, onTabChange }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 safe-area-bottom z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full transition-colors duration-200 active:scale-95",
                                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={clsx("text-[10px] mt-1 font-medium", isActive ? "text-indigo-600" : "text-slate-400")}>
                                {tab.label}
                            </span>
                            {isActive && (
                                <span className="absolute bottom-1 w-1 h-1 bg-indigo-600 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
