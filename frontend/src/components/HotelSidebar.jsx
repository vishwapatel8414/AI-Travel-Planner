import React from "react";

export default function HotelSidebar() {
  return (
    <div className="space-y-6">
      {/* ૧. લોકેશન મેપ પ્રીવ્યુ કાર્ડ */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center space-y-3">
        <div className="h-28 w-full bg-sky-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-100">
          {/* મેપ જેવો લુક આપવા માટે ગ્રીડ બેકગ્રાઉન્ડ ઇફેક્ટ */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
          <span className="text-2xl z-10 animate-bounce">📍</span>
          <span className="absolute bottom-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">Zurich Center</span>
        </div>
        <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs py-2 rounded-xl transition-colors">
          🗺️ View hotels on map
        </button>
      </div>

      {/* ૨. અનલોક સેવિંગ્સ સાઇન ઇન બેનર */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-md space-y-3">
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-indigo-100">Unlock Extra Savings</h4>
          <p className="text-[11px] text-white/90 font-medium mt-0.5">Sign in to see exclusive member-only hotel prices.</p>
        </div>
        <button className="w-full bg-white text-indigo-600 font-bold text-xs py-2 rounded-xl shadow-sm transition-transform active:scale-95">
          Sign In / Register
        </button>
      </div>

      {/* ૩. એડવાન્સ ફિલ્ટર બોક્સ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Filter by</h3>
          <button className="text-[11px] font-bold text-indigo-600">Clear All</button>
        </div>

        {/* પ્રાઇસ રેન્જ સ્લાઇડર */}
        <div className="space-y-1.5 border-t border-slate-50 pt-3">
          <label className="text-xs font-bold text-slate-700">Price Range</label>
          <input type="range" className="w-full accent-indigo-600 cursor-pointer" min="0" max="50000" defaultValue="25000" />
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>₹0</span>
            <span>₹50,000+</span>
          </div>
        </div>

        {/* પ્રોપર્ટી ટાઇપ ચેકબોક્સ લિસ્ટ */}
        <div className="space-y-2 border-t border-slate-50 pt-3">
          <label className="text-xs font-bold text-slate-700 block">Property Type</label>
          {["Hotels", "Apartments", "Resorts", "Villas"].map((type, i) => (
            <div key={i} className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={i===0} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" />
                <span>{type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
