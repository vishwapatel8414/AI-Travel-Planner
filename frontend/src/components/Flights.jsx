import React, { useState, useEffect } from "react";

export default function Flights({ sharedData, liveData, isLoading, onSearchSubmit }) {
  const [fromCity, setFromCity] = useState("AMD, Ahmedabad");
  const [toCity, setToCity] = useState("Mumbai");
  const [depDate, setDepDate] = useState("24/06/2026");

  useEffect(() => {
    if (sharedData?.destination) setToCity(sharedData.destination);
    if (sharedData?.date) setDepDate(sharedData.date);
  }, [sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit && toCity) {
      onSearchSubmit({ 
        destination: toCity, 
        date: depDate,
        budget: "Budget Friendly",
        days: 3
      });
    }
  };

  // 🎯 એકદમ સેફ એરે ચેકિંગ - પેજ ક્યારેય ક્રેશ નહીં થાય
  const displayFlights = liveData && Array.isArray(liveData.flights) && liveData.flights.length > 0 
    ? liveData.flights 
    : [
        { airline: "IndiGo", depTime: "06:15 AM", depCode: "AMD", arrTime: "07:30 AM", arrCode: "DEST", duration: "1h 15m", price: "₹4,200" },
        { airline: "Air India", depTime: "11:30 AM", depCode: "AMD", arrTime: "12:45 PM", arrCode: "DEST", duration: "1h 15m", price: "₹6,500" },
        { airline: "Vistara", depTime: "04:40 PM", depCode: "AMD", arrTime: "05:55 PM", arrCode: "DEST", duration: "1h 15m", price: "₹5,800" }
      ];

  return (
    <div className="space-y-6">
      <div className="relative h-[220px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-center text-white shadow-xl" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/20 to-transparent" />
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white w-fit">Flight Search Layer</span>
          <h2 className="text-3xl font-black uppercase text-white drop-shadow-md">Live Flights to {toCity}</h2>
        </div>
      </div>

      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">From</span>
          <input type="text" value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-indigo-600 uppercase block">To (Destination)</span>
          <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Departure Date</span>
          <input type="text" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <button type="submit" disabled={isLoading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95">
          {isLoading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      <div className="space-y-3">
        {isLoading ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Fetching live flight routes...</p>
          </div>
        ) : (
          displayFlights.map((flight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3"><span className="text-xl">✈️</span><h4 className="text-sm font-bold text-slate-800">{flight.airline || "Airline"}</h4></div>
              <div className="flex items-center justify-between flex-1 text-xs font-bold px-4">
                <div><p>{flight.depTime || "06:15 AM"}</p><p className="text-slate-400 text-[10px]">{flight.depCode || "AMD"}</p></div>
                <div className="text-center text-[10px] text-slate-400">➔ {flight.duration || "1h 15m"}</div>
                <div><p>{flight.arrTime || "07:30 AM"}</p><p className="text-slate-400 text-[10px]">{flight.arrCode || "DEST"}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-black text-slate-800">{flight.estimated_price_in_inr || flight.price || "₹4,200"}</p>
                <button type="button" onClick={() => alert(`Selected ${flight.airline || 'Flight'}`)} className="bg-[#4f46e5] text-white font-bold text-[10px] px-4 py-2 rounded-xl">Select</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
