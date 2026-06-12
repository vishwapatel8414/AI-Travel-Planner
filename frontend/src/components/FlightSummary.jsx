import React from "react";

export default function FlightSummary() {
  return (
    <div className="space-y-6">
      {/* Trip Summary Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🗺️ Trip Summary</h3>
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100/50">
          <div>
            <p className="text-xs font-bold text-slate-800">New Delhi (DEL)</p>
            <p className="text-[10px] text-slate-400 font-semibold">10 May</p>
          </div>
          <span className="text-slate-300">➔</span>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-800">Zurich (ZRH)</p>
            <p className="text-[10px] text-slate-400 font-semibold">17 May</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 font-semibold text-center bg-indigo-50/50 text-indigo-600 py-1.5 rounded-lg">
          👤 1 Traveler, Economy
        </p>
      </div>

      {/* Price Insights Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">📊 Price Insights</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Current Price</span>
          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Low</span>
        </div>
        <p className="text-2xl font-black text-slate-800">₹45,230</p>
        <p className="text-[11px] text-slate-400 font-semibold">
          Prices are <span className="text-emerald-500 font-bold">₹4,250 lower</span> than usual.
        </p>
        {/* નાનું પ્રાઇસ પ્રોગ્રેસ બાર મીટર */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
          <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
        </div>
      </div>

      {/* Need Help Box with Assistant Graphic */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-2xl text-white shadow-xl flex items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <h4 className="text-xs font-bold tracking-tight">Need help choosing?</h4>
          <p className="text-[10px] text-slate-300 font-medium max-w-[140px] leading-relaxed">Our AI Assistant can help you find the perfect flight.</p>
          <button className="bg-white text-indigo-950 font-bold text-[10px] py-1.5 px-3 rounded-lg shadow-sm hover:bg-slate-50 transition-all active:scale-95">
            ✨ Ask AI Assistant
          </button>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl border border-white/10">
          👩‍💼
        </div>
      </div>
    </div>
  );
}
