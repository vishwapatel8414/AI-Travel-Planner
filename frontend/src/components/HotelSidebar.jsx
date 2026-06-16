import React from "react";
export default function HotelSidebar({ liveData }) {
  const dest = liveData?.destination || "Mumbai";
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
      <div className="h-32 rounded-xl bg-slate-100 flex items-center justify-center relative mb-3 bg-cover bg-center" style={{ backgroundImage: `url('https://api.placeholder.com/400/200?text=Map+of+${dest}')` }}>
        <div className="bg-slate-800 text-white text-[10px] font-black px-3 py-1 rounded-full relative z-10">📍 {dest} Center</div>
      </div>
      <button className="w-full py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl">🗺️ View hotels on map</button>
    </div>
  );
}
