import React from 'react';

export default function Flights({ liveData, isLoading }) {
  if (isLoading) {
    return <div className="p-6 text-center font-bold text-slate-500 animate-pulse">⏳ Llama 3.1 ઇનપુટ સિટી માટે અસલી ફ્લાઇટ્સ શોધી રહ્યું છે...</div>;
  }
  if (!liveData || !liveData.flights) {
    return <div className="p-6 text-center font-bold text-slate-400">Search a destination to view live dynamic flight routes.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h2 className="text-xl font-black text-slate-800">✈️ Available Flights for {liveData.destination}</h2>
      <div className="grid grid-cols-1 gap-4">
        {liveData.flights.map((flight, index) => (
          <div key={index} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="block text-xs font-black text-indigo-600 uppercase">Airline</span>
              <span className="text-base font-black text-slate-800">{flight.airline}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Duration</span>
              <span className="text-xs font-bold text-slate-600">{flight.duration || "N/A"}</span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-extrabold text-slate-400 uppercase">Est. Price</span>
              <span className="text-lg font-black text-emerald-600">₹{flight.estimated_price_in_inr}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
