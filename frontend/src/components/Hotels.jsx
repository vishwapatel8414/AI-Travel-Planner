import React from 'react';

export default function Hotels({ liveData, isLoading }) {
  if (isLoading) {
    return <div className="p-6 text-center font-bold text-slate-500 animate-pulse">⏳ Llama 3.1 બજેટ પ્રમાણે અસલી હોટેલ્સ શોધી રહ્યું છે...</div>;
  }
  if (!liveData || !liveData.hotels) {
    return <div className="p-6 text-center font-bold text-slate-400">Search a destination to view live real-world hotels.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h2 className="text-xl font-black text-slate-800">🏨 Premium Recommended Hotels in {liveData.destination}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveData.hotels.map((hotel, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-base font-black text-slate-800">{hotel.hotel_name}</h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">⭐ {hotel.rating}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">📍 {hotel.address}</p>
            <div className="pt-2 border-top border-slate-200/60 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Price Per Night</span>
              <span className="text-base font-black text-emerald-600">₹{hotel.price_per_night_in_inr}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
