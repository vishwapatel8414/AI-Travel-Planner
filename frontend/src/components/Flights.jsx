import React, { useState, useEffect } from "react";

export default function Flights({ sharedData, liveData, isLoading }) {
  const [fromCity, setFromCity] = useState("AMD, Ahmedabad");
  const [toCity, setToCity] = useState("Mumbai");
  const [depDate, setDepDate] = useState("11/07/2026"); // Default b 11/7 j kri didhi

  const [flightTabs, setFlightTabs] = useState([
    { label: "Best", price: "₹4,500", time: "1h 15m", active: true },
    { label: "Cheapest", price: "₹3,900", time: "1h 20m", active: false },
    { label: "Fastest", price: "₹5,800", time: "1h 10m", active: false },
    { label: "Lowest Emissions", price: "₹4,500", time: "1h 15m", active: false },
  ]);

  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    const currentDest = sharedData?.destination || toCity;
    if (sharedData?.destination) {
      setToCity(sharedData.destination);
    }
    
    // 🔥 FORCE DYNAMIC DATE LOGIC: Game te thai user ni select kreli date j aavse!
    if (sharedData && (sharedData.date || sharedData.depDate || sharedData.departureDate || sharedData.stayDates)) {
      const userDate = sharedData.date || sharedData.depDate || sharedData.departureDate || sharedData.stayDates;
      setDepDate(userDate);
    }

    const actualFlights = liveData?.flights || liveData?.flight_details || liveData?.available_flights;

    if (liveData && actualFlights && Array.isArray(actualFlights)) {
      setFlightList(actualFlights);
    } else {
      const isMumbai = currentDest.toLowerCase().includes("mumbai") || currentDest.toLowerCase().includes("bom");
      const airportCode = isMumbai ? "BOM" : currentDest.substring(0, 3).toUpperCase();
      
      setFlightList([
        { logo: "✈️", airline: "IndiGo", depTime: "06:15 AM", depCode: "AMD", arrTime: "07:30 AM", arrCode: airportCode, duration: "1h 15m", type: "Non-stop", price: isMumbai ? "₹4,120" : "₹6,200", tag: "Cheapest" },
        { logo: "🇮🇳", airline: "Air India", depTime: "11:30 AM", depCode: "AMD", arrTime: "12:45 PM", arrCode: airportCode, duration: "1h 15m", type: "Non-stop", price: isMumbai ? "₹4,850" : "₹7,500", tag: "Best" },
        { logo: "✈️", airline: "Vistara", depTime: "05:45 PM", depCode: "AMD", arrTime: "07:00 PM", arrCode: airportCode, duration: "1h 15m", type: "Non-stop", price: isMumbai ? "₹5,600" : "₹8,900", tag: "Fastest" }
      ]);
    }
  }, [liveData, sharedData]);

  return (
    <div className="space-y-6">
      <div className="relative h-[150px] w-full rounded-2xl overflow-hidden bg-cover bg-center p-6 flex flex-col justify-center text-white shadow-md" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/10 to-transparent" />
        <div className="relative z-10 space-y-1">
          <h2 className="text-3xl font-black text-white drop-shadow-md">Live Flights to {toCity}</h2>
          <p className="text-xs font-bold text-white/90">Real-time airfares optimized by Groq Systems</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">From</span><p className="text-sm font-bold text-slate-800 pt-0.5">{fromCity}</p></div>
        <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">To</span><p className="text-sm font-bold text-slate-800 pt-0.5">{toCity}</p></div>
        <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">Departure</span><p className="text-sm font-bold text-indigo-600 pt-0.5">{depDate}</p></div>
        <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">Class</span><p className="text-sm font-bold text-slate-800 pt-0.5">Economy Pack</p></div>
        <button className="bg-[#4f46e5] text-white font-bold text-xs py-3 rounded-xl opacity-50 cursor-not-allowed">Connected</button>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-3"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-xs font-bold text-slate-500">Fetching live flights...</p></div>
        ) : (
          flightList.map((flight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-[140px]"><div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg">{flight.logo || "✈️"}</div><h4 className="text-sm font-bold text-slate-800">{flight.airline}</h4></div>
              <div className="flex items-center justify-between gap-8 flex-1">
                <div><p className="text-sm font-black text-slate-800">{flight.depTime}</p><p className="text-[10px] font-bold text-slate-400">{flight.depCode}</p></div>
                <div className="flex flex-col items-center flex-1 max-w-[120px]"><p className="text-[10px] font-bold text-slate-400">{flight.duration}</p><div className="w-full h-[2px] bg-slate-200 relative my-1" /><p className="text-[10px] font-bold text-emerald-600">{flight.type}</p></div>
                <div><p className="text-sm font-black text-slate-800">{flight.arrTime}</p><p className="text-[10px] font-bold text-slate-400">{flight.arrCode}</p></div>
              </div>
              <div className="flex items-center gap-6"><p className="text-base font-black text-slate-800">{flight.price}</p><button className="bg-[#4f46e5] text-white font-bold text-xs px-6 py-2.5 rounded-xl">Select</button></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
