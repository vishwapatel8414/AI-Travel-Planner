import React from "react";

// 🚀 sharedData પ્રોપ તરીકે પાસ કર્યો જેથી હોમ પેજના સર્ચ સાથે આંકડા બદલાય
function StatsCards({ sharedData }) {
  
  // જો યુઝરે સર્ચ કર્યું હોય તો આંકડા વધારી દેવા, નહીંતર ડિફોલ્ટ રાખવા
  const displayTrips = sharedData ? 6 : 5;
  const displayPlaces = sharedData ? 15 : 12;
  const displayMoney = sharedData ? "₹48K" : "₹45K";

  return (
    <div className="mt-8">
      {/* હેડિંગ - નવી લાઇટ થીમ મુજબ ડાર્ક સ્લેટ કલર */}
      <h2 className="text-xl font-bold text-slate-800 mb-5 tracking-tight flex items-center gap-2">
        📊 Your Travel Stats
      </h2>

      {/* ગ્રીડ લેઆઉટ: ૩ પ્રીમિયમ લાઇટ કાર્ડ્સ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Trips Planned Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trips Planned</h3>
            {/* 🚀 હવે આ આંકડો લાઈવ બદલાશે */}
            <p className="text-3xl font-black text-slate-800 mt-1 transition-all duration-500">
              {displayTrips}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 text-xl rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            🧳
          </div>
        </div>

        {/* Places Explored Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Places Explored</h3>
            {/* 🚀 હવે આ આંકડો લાઈવ બદલાશે */}
            <p className="text-3xl font-black text-slate-800 mt-1 transition-all duration-500">
              {displayPlaces}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 text-xl rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            📍
          </div>
        </div>

        {/* Money Saved Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Money Saved</h3>
            {/* 🚀 હવે આ આંકડો લાઈવ બદલાશે */}
            <p className="text-3xl font-black text-[#4f46e5] mt-1 transition-all duration-500">
              {displayMoney}
            </p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 text-xl rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            🐷
          </div>
        </div>

      </div>
    </div>
  );
}

export default StatsCards;
