import React from "react";

export default function FlightSummary({ liveData }) {
  // AI ના ડેટામાંથી સિટી અને એરપોર્ટ કોડ લો, નહિતર ડિફોલ્ટ Zurich બતાવો
  const destName = liveData?.destination || "Zurich";
  const destCode = destName.substring(0, 3).toUpperCase();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🗺️ Trip Summary</h3>
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100/50">
        <div>
          <p className="text-xs font-black text-slate-800">AMD</p>
          <p className="text-[9px] font-bold text-slate-400">Ahmedabad</p>
        </div>
        <div className="text-slate-300 font-medium">➔</div>
        <div className="text-right">
          <p className="text-xs font-black text-indigo-600">{destCode}</p>
          <p className="text-[9px] font-bold text-slate-400">{destName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center text-[10px] font-bold text-slate-500">
        <span>👤 1 Traveler, Economy</span>
      </div>
    </div>
  );
}
