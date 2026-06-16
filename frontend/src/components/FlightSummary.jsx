import React from "react";
export default function FlightSummary({ liveData }) {
  const dest = liveData?.destination || "Mumbai";
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🗺️ Trip Summary</h3>
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
        <div><p className="text-xs font-black text-slate-800">AMD</p></div>
        <div className="text-slate-300">➔</div>
        <div className="text-right"><p className="text-xs font-black text-indigo-600">{dest.substring(0,3).toUpperCase()}</p><p className="text-[9px] font-bold text-slate-400">{dest}</p></div>
      </div>
      <div className="text-center text-[10px] font-bold text-slate-500">👤 1 Traveler, Economy</div>
    </div>
  );
}
