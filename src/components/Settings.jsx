import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Key, MapPin, CheckCircle2, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

export const Settings = ({ onResetStats, onResetQuestions }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState('福岡県');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key') || '';
    const savedPref = localStorage.getItem('user_prefecture') || '福岡県';
    setApiKey(savedKey);
    setSelectedPrefecture(savedPref);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    localStorage.setItem('user_prefecture', selectedPrefecture);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const prefectures = ['福岡県', '福岡市', '佐賀県', '長崎県', '大分県'];

  return (
    <div className="p-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">設定</h2>
          <p className="text-slate-500 text-sm">AI生成と学習環境の設定</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* API Key Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <Key size={16} className="text-indigo-500" />
            Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AI生成に使用するキーを入力"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800"
          />
          <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
            ※キーはブラウザのLocalStorageにのみ保存されます。AIによる問題生成に必要です。
          </p>
        </div>

        {/* Municipality Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <MapPin size={16} className="text-indigo-500" />
            志望自治体・地域
          </label>
          <div className="grid grid-cols-2 gap-2">
            {prefectures.map(pref => (
              <button
                key={pref}
                onClick={() => setSelectedPrefecture(pref)}
                className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${selectedPrefecture === pref
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
              >
                {pref}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            AIがこの地域の出題傾向を考慮して問題を生成します。
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {showSaved ? (
            <>
              <CheckCircle2 size={20} />
              <span>保存しました</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>設定を保存する</span>
            </>
          )}
        </button>

        {/* Danger Zone */}
        <div className="pt-10 space-y-4">
          <div className="flex items-center gap-2 px-1 text-rose-600">
            <AlertTriangle size={18} />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Danger Zone</h3>
          </div>

          <div className="bg-rose-50/50 p-5 rounded-3xl border border-rose-100 space-y-3">
            <button
              onClick={() => {
                if (window.confirm('学習記録をリセットしますか？この操作は取り消せません。')) {
                  onResetStats();
                }
              }}
              className="w-full py-3 px-4 bg-white border border-rose-200 text-rose-600 font-bold rounded-2xl flex items-center justify-between group hover:bg-rose-600 hover:text-white transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <RotateCcw size={18} />
                <span className="text-sm">学習記録をリセット</span>
              </div>
              <span className="text-[10px] font-black opacity-50 group-hover:opacity-100">RESET STATS</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('生成された問題をすべて削除しますか？')) {
                  onResetQuestions();
                }
              }}
              className="w-full py-3 px-4 bg-white border border-rose-200 text-rose-600 font-bold rounded-2xl flex items-center justify-between group hover:bg-rose-600 hover:text-white transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <Trash2 size={18} />
                <span className="text-sm">生成問題をすべて削除</span>
              </div>
              <span className="text-[10px] font-black opacity-50 group-hover:opacity-100">CLEAR AI DATA</span>
            </button>

            <p className="text-[10px] text-rose-400 text-center font-medium px-2">
              ※本番前の「身の引き締め」や、まっさらな気持ちで再開したい時にご利用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
