import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Key, MapPin, CheckCircle2 } from 'lucide-react';

export const Settings = () => {
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
    localStorage.setItem('gemini_api_key', apiKey);
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
                className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                  selectedPrefecture === pref
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
      </div>
    </div>
  );
};
