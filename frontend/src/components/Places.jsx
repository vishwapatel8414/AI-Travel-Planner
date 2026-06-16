import React, { useState, useEffect } from "react";

export default function Places({ sharedData, liveData, isLoading, onSearchSubmit }) {
  const [toCity, setToCity] = useState("Mumbai");

  useEffect(() => {
    if (sharedData?.destination) setToCity(sharedData.destination);
  }, [sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (!toCity.trim()) return;
    if (onSearchSubmit) {
      onSearchSubmit({ 
        destination: toCity.trim(), 
        date: sharedData?.date || "24/06/2026",
        budget: "Budget Friendly",
        days: 3
      });
    }
  };

  // 🎯 કડક પ્રોટેક્શન: ડેટા અધૂરો હોય તો પણ લૂપ ક્રેશ નહીં થાય
  const displayPlaces = liveData && Array.isArray(liveData.places_to_visit) && liveData.places_to_visit.length > 0 
    ? liveData.places_to_visit 
    : [
        { place_name: `Top City Attraction`, best_time_to_visit: "Morning", description: `A beautiful landmark to explore in ${toCity}.` },
        { place_name: `Scenic Seaside Point`, best_time_to_visit: "Sunset", description: `Famous boulevard along the coast, perfect for evening walks.` },
        { place_name: `Local Heritage Market`, best_time_to_visit: "Afternoon", description: `Bustling market streets lined with fantastic local food stalls.` }
      ];

  return (
    <div className="space-y-6">
      <div className="relative h-[220px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-center text-white shadow-xl" 
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/20 to-transparent" />
        <h2 className="text-3xl font-black uppercase text-white relative z-10">
          Discover Top Attractions in <span className="text-cyan-200">{toCity}</span>
        </h2>
      </div>

      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3 items-center">
        <div className="flex-1 px-2">
          <span className="text-[10px] font-bold text-indigo-600 uppercase block">Explore Places In</span>
          <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <button type="submit" disabled={isLoading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all active:scale-95">
          {isLoading ? "Finding..." : "Find Attractions"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 bg-white p-12 rounded-2xl text-center space-y-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Discovering top tourist spots...</p>
          </div>
        ) : (
          displayPlaces.map((place, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-black text-slate-800">{place.place_name || "Tourist Spot"}</h3>
                <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{place.best_time_to_visit || "Anytime"}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">{place.description || "No description available."}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
