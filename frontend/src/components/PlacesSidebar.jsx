import React from "react";

export default function PlacesSidebar() {
  return (
    <div className="space-y-6">
      {/* ૧. ક્વિક લોકલ ટિપ્સ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">💡 Local Travel Tips</h3>
        <div className="space-y-3 text-xs font-semibold text-slate-600 leading-relaxed">
          <div className="flex gap-2">
            <span>💧</span>
            <p>Tap water in Zurich is exceptionally clean and perfectly safe to drink anywhere.</p>
          </div>
          <div className="flex gap-2 border-t border-slate-50 pt-2.5">
            <span>🕰️</span>
            <p>Most shops and supermarkets remain closed on Sundays, plan shopping accordingly.</p>
          </div>
        </div>
      </div>

      {/* ૨. ટ્રાન્સપોર્ટ ગાઇડ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🚊 City Transport</h3>
        <div className="space-y-2.5">
          {[
            { mode: "ZVV Tram & Buses", efficiency: "Best Option", color: "text-indigo-600 bg-indigo-50" },
            { mode: "Lake Cruises / Boats", efficiency: "Scenic Route", color: "text-cyan-600 bg-cyan-50" },
            { mode: "Local Taxis / Uber", efficiency: "Expensive", color: "text-amber-600 bg-amber-50" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs font-semibold p-2 bg-slate-50 rounded-xl border border-slate-100/50">
              <span className="text-slate-700">{item.mode}</span>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${item.color}`}>
                {item.efficiency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
