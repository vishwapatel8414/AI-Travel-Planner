import React from 'react';

export default function Places({ liveData, isLoading }) {
  if (isLoading) {
    return <div className="p-6 text-center font-bold text-slate-500 animate-pulse">⏳ Llama 3.1 પ્રખ્યાત ફરવાની જગ્યાઓ લોડ કરી રહ્યું છે...</div>;
  }
  if (!liveData || !liveData.places_to_visit) {
    return <div className="p-6 text-center font-bold text-slate-400">Search a destination to view popular tourist landmarks.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h2 className="text-xl font-black text-slate-800">📍 Top Landmarks to Visit in {liveData.destination}</h2>
      <div className="grid grid-cols-1 gap-4">
        {liveData.places_to_visit.map((place, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-800">{index + 1}. {place.place_name}</h3>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">🕒 {place.best_time_to_visit}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
