import React, { useState, useEffect } from "react";

export default function Places({ sharedData, liveData, isLoading, onSearchSubmit }) {
  const [toCity, setToCity] = useState("Mumbai");
  const [localPlaceList, setLocalPlaceList] = useState([]);

  const capitalize = (str) => {
    if (!str) return "";
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  useEffect(() => {
    const rawDest = sharedData?.destination || "Mumbai";
    const formattedDest = capitalize(rawDest);
    setToCity(formattedDest);

    const actualPlaces = liveData?.places_to_visit || liveData?.suggested_places;
    if (liveData && actualPlaces && Array.isArray(actualPlaces)) {
      setLocalPlaceList(actualPlaces);
    } else {
      setLocalPlaceList([
        { place_name: "Hadimba Temple", best_time_to_visit: "Morning", description: "Beautiful wooden temple surrounded by cedar forests." },
        { place_name: "Solang Valley", best_time_to_visit: "Afternoon", description: "Famous for adventure sports and stunning glacier views." }
      ]);
    }
  }, [liveData, sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (!toCity.trim()) return;
    if (onSearchSubmit) {
      onSearchSubmit({
        destination: toCity.trim(),
        date: sharedData?.date || "24/06/2026",
        days: 3,
        budget: "Luxury Stay"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-800 p-8 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-black uppercase">DISCOVER TOP ATTRACTIONS IN {toCity}</h2>
      </div>

      {/* 🎯 અસલી વર્કિંગ ઇનપુટ બોક્સ ફોર્મ */}
      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3 items-center">
        <div className="flex-1 px-2">
          <span className="text-[10px] font-bold text-indigo-600 uppercase block">Explore Places In</span>
          <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <button type="submit" disabled={isLoading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all">
          {isLoading ? "Loading..." : "Find Attractions"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 bg-white p-12 rounded-2xl text-center font-bold text-slate-400">Loading Attractions...</div>
        ) : (
          localPlaceList.map((place, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-black text-slate-800">{place.place_name}</h3>
                <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{place.best_time_to_visit || "Anytime"}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">{place.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}