import React, { useState, useEffect } from "react";

export default function Flights({ sharedData, liveData, isLoading }) {
  const [fromCity, setFromCity] = useState("AMD, Ahmedabad");
  const [toCity, setToCity] = useState("Mumbai");
  const [depDate, setDepDate] = useState("");
  const [airportCode, setAirportCode] = useState("BOM");
  const [displayPrice, setDisplayPrice] = useState("₹4,200");

  const [flightTabs, setFlightTabs] = useState([
    { label: "Best", price: "₹6,500", time: "1h 30m", active: true },
    { label: "Cheapest", price: "₹4,200", time: "2h 15m", active: false },
    { label: "Fastest", price: "₹8,800", time: "1h 15m", active: false },
    { label: "Lowest Emissions", price: "₹5,900", time: "1h 30m", active: false },
  ]);

  const [flightList, setFlightList] = useState([]);

  // 🛠️ શબ્દનો પહેલો અક્ષર કેપિટલ કરવાનું ફંક્શન
  const capitalize = (str) => {
    if (!str) return "";
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  useEffect(() => {
    const rawDest = sharedData?.destination || "Mumbai";
    // 🎯 પોઇન્ટ ૧ ફિક્સ: સિટીના નામનો પહેલો અક્ષર કેપિટલ કરો
    const formattedDest = capitalize(rawDest);
    setToCity(formattedDest);

    // 🎯 પોઇન્ટ ૨ ફિક્સ: ડાયનેમિક એરપોર્ટ કોડ જનરેશન
    const code = formattedDest.toLowerCase().includes("mumbai") ? "BOM" : formattedDest.substring(0, 3).toUpperCase();
    setAirportCode(code);
    
    const incomingDate = sharedData?.date || sharedData?.depDate || sharedData?.departureDate || sharedData?.stayDates;
    if (incomingDate) {
      setDepDate(incomingDate);
    } else {
      setDepDate("Select Departure Date");
    }

    const actualFlights = liveData?.flights || liveData?.flight_details || liveData?.available_flights;

    if (liveData && actualFlights && Array.isArray(actualFlights)) {
      setFlightList(actualFlights);
      const topPrice = actualFlights[0]?.price || "₹4,200";
      setDisplayPrice(topPrice);
      
      const basePrice = parseInt(actualFlights[0]?.estimated_price_in_inr?.toString().replace(/[^0-9]/g, "")) || 6500;
      setFlightTabs([
        { label: "Best", price: `₹${basePrice}`, time: actualFlights[0]?.duration || "1h 30m", active: true },
        { label: "Cheapest", price: `₹${Math.round(basePrice * 0.82)}`, time: "2h 10m", active: false },
        { label: "Fastest", price: `₹${Math.round(basePrice * 1.15)}`, time: actualFlights[0]?.duration || "1h 15m", active: false },
        { label: "Lowest Emissions", price: `₹${basePrice}`, time: actualFlights[0]?.duration || "1h 30m", active: false },
      ]);
    } else {
      setFlightList([
        { logo: "✈️", airline: "IndiGo", depTime: "06:15 AM", depCode: "AMD", arrTime: "07:30 AM", arrCode: code, duration: "1h 15m", type: "Non-stop", price: "₹4,200", tag: "Cheapest" },
        { logo: "🇮🇳", airline: "Air India", depTime: "11:30 AM", depCode: "AMD", arrTime: "12:45 PM", arrCode: code, duration: "1h 15m", type: "Non-stop", price: "₹6,500", tag: "Best" }
      ]);
      setDisplayPrice("₹4,200");
    }
  }, [liveData, sharedData]);

  return (
    <div className="space-y-6">
      {/* ૧. બેનર */}
      <div 
        className="relative h-[150px] w-full rounded-2xl overflow-hidden bg-cover bg-center p-6 flex flex-col justify-center text-white shadow-md"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/10 to-transparent" />
        <div className="relative z-10 space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white">🛫 Flight Search Layer</span>
          <h2 className="text-3xl font-black text-white drop-shadow-md">Live Flights to {toCity}</h2>
          <p className="text-xs font-bold text-white/90">Real-time airfares optimized by Groq Systems</p>
        </div>
      </div>

      {/* ૨. મેઈન લેઆઉટ (ડાબી બાજુ ફ્લાઇટ્સ + જમણી બાજુ સાઇડબાર) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* ડાબી બાજુનો ભાગ (૨ કોલમ) */}
        <div className="lg:col-span-2 space-y-6">
          {/* સર્ચ બોક્સ */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
            <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">From</span><p className="text-sm font-bold text-slate-800 pt-0.5">{fromCity}</p></div>
            <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">To</span><p className="text-sm font-bold text-slate-800 pt-0.5">{toCity}</p></div>
            <div className="px-2 border-r border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase block">Departure</span><p className="text-sm font-bold text-indigo-600 pt-0.5">{depDate}</p></div>
            <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">Search Flights</button>
          </div>

          {/* ફિલ્ટર ટેબ્સ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {flightTabs.map((tab, idx) => (
              <div key={idx} className={`p-3 rounded-xl border text-center ${tab.active ? "bg-indigo-50/50 border-indigo-200 text-indigo-600 font-bold" : "bg-white border-slate-100 text-slate-700"}`}>
                <p className="text-[10px] font-bold uppercase text-slate-400">{tab.label}</p>
                <p className="text-sm font-black mt-0.5">{tab.price}</p>
              </div>
            ))}
          </div>

          {/* ફ્લાઇટ લિસ્ટ */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="bg-white p-12 rounded-2xl text-center space-y-3"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-xs font-bold text-slate-500 animate-pulse">Fetching live flights...</p></div>
            ) : (
              flightList.map((flight, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3"><span className="text-xl">{flight.logo || "✈️"}</span><h4 className="text-sm font-bold text-slate-800">{flight.airline}</h4></div>
                  <div className="flex items-center justify-between gap-6 flex-1 text-xs font-bold">
                    <div><p>{flight.depTime || "06:15 AM"}</p><p className="text-slate-400 text-[10px]">{flight.depCode || "AMD"}</p></div>
                    <div className="text-center text-[10px] text-slate-400">⚡ {flight.duration || "1h 15m"}<br/><span className="text-emerald-600">{flight.type || "Non-stop"}</span></div>
                    <div><p>{flight.arrTime || "07:30 AM"}</p><p className="text-slate-400 text-[10px]">{flight.arrCode}</p></div>
                  </div>
                  <div className="flex items-center gap-4"><p className="text-sm font-black text-slate-800">{flight.price}</p><button className="bg-[#4f46e5] text-white font-bold text-[10px] px-4 py-2 rounded-xl">Select</button></div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 🎯 જમણી બાજુનો સાઇડબાર (૧ કોલમ) - જે Zurich ફિક્સ બતાવતું હતું એ અહીં ૧૦０% ડાયનેમિક થઈ ગયું! */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🗺️ Trip Summary</h3>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100/50">
              <div><p className="text-xs font-black text-slate-800">AMD</p><p className="text-[9px] font-bold text-slate-400">Ahmedabad</p></div>
              <div className="text-slate-300 font-medium">➔</div>
              <div className="text-right"><p className="text-xs font-black text-indigo-600">{airportCode}</p><p className="text-[9px] font-bold text-slate-400">{toCity}</p></div>
            </div>
            <div className="text-[11px] font-bold text-slate-500 bg-indigo-50/30 p-2.5 rounded-xl border border-indigo-50/50 flex items-center gap-2">
              <span>📅</span> <span>Departure: {depDate}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">📊 Price Insights</h3>
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-500">Current Price</span><span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">LOW</span></div>
            <p className="text-2xl font-black text-slate-800">{displayPrice}</p>
            <p className="text-[10px] text-slate-400 font-semibold">Prices are currently optimal for your journey to {toCity}.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
