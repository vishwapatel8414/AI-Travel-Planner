import React from "react";

export default function TravelStats() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-5">
      {/* સેક્શન હેડિંગ */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Advanced Travel Stats & Insights
        </h3>
      </div>

      {/* ૨x૨ ની પ્રીમિયમ ગ્રીડ */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Trips Planned */}
        <div className="border border-slate-50 rounded-2xl p-3.5 space-y-2 bg-gradient-to-b from-slate-50/30 to-white">
          <div className="flex items-center gap-2">
            <span className="text-base bg-blue-50 p-1.5 rounded-lg">🧭</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trips Planned</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">128</span>
          </div>
          <div className="pt-1">
            <svg className="w-full h-6 text-blue-500" viewBox="0 0 100 20" fill="none">
              <path d="M0 15 Q15 5 30 12 T60 5 T90 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">Average Trip: <span className="text-slate-700 font-bold">5 Days</span></p>
          </div>
        </div>

        {/* Countries Explored */}
        <div className="border border-slate-50 rounded-2xl p-3.5 space-y-2 bg-gradient-to-b from-slate-50/30 to-white">
          <div className="flex items-center gap-2">
            <span className="text-base bg-emerald-50 p-1.5 rounded-lg">🌍</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Countries</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">24</span>
          </div>
          <div className="pt-2 space-y-1">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-emerald-500 rounded-full" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">Top Continent: <span className="text-slate-700 font-bold">Europe</span></p>
          </div>
        </div>

        {/* Budget Saved */}
        <div className="border border-slate-50 rounded-2xl p-3.5 space-y-2 bg-gradient-to-b from-slate-50/30 to-white">
          <div className="flex items-center gap-2">
            <span className="text-base bg-amber-50 p-1.5 rounded-lg">🐷</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Budget Saved</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">₹2.5L</span>
          </div>
          <div className="pt-1">
            <svg className="w-full h-6 text-amber-500" viewBox="0 0 100 20" fill="none">
              <path d="M0 18 C20 18 40 2 60 10 T100 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">Top Expense: <span className="text-slate-700 font-bold">Hotels</span></p>
          </div>
        </div>

        {/* Miles Traveled */}
        <div className="border border-slate-50 rounded-2xl p-3.5 space-y-2 bg-gradient-to-b from-slate-50/30 to-white">
          <div className="flex items-center gap-2">
            <span className="text-base bg-purple-50 p-1.5 rounded-lg">✈️</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Miles Traveled</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-800">75,000 km</span>
          </div>
          <div className="pt-2 space-y-1">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-purple-500 rounded-full" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">Favorite: <span className="text-slate-700 font-bold">Emirates</span></p>
          </div>
        </div>

      </div>

      {/* બોટમ ઇનસાઇટ લાઇન */}
      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50 text-center">
        <p className="text-[10px] font-bold text-slate-500">
          💡 Insights: Trip frequency increased by 15% this year.
        </p>
      </div>
    </div>
  );
}
