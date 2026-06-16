import React from "react";

export default function PlacesSidebar({ liveData }) {
  // 🎯 જો કોઈ ડેટા ના હોય તો ફિક્સ Zurich ના બદલે અસલી સિટી નેમ દેખાશે
  const destName = liveData?.destination || "Mumbai";

  return (
    <div className="space-y-4">
      {/* 💡 Local Travel Tips Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">💡 Local Travel Tips</h3>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="text-base">💧</span>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              Tap water in <span className="text-indigo-600 font-bold">{destName}</span> is safe at premium hotels, but bottled water is highly recommended anywhere else.
            </p>
          </div>
          <div className="flex gap-3 items-start border-t border-slate-50 pt-3">
            <span className="text-base">🛍️</span>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              Most local markets and supermarkets remain lively throughout the weekend in <span className="text-indigo-600 font-bold">{destName}</span>, plan shopping accordingly.
            </p>
          </div>
        </div>
      </div>

      {/* 🚌 City Transport Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🚌 City Transport</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
            <span className="text-xs font-bold text-slate-700">Local Trains & Buses</span>
            <span className="text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">Best Option</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
            <span className="text-xs font-bold text-slate-700">Metro / Cabs</span>
            <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-wider">Scenic Route</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
            <span className="text-xs font-bold text-slate-700">Local Taxis / Uber</span>
            <span className="text-[9px] font-black bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded uppercase tracking-wider">Expensive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
