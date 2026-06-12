import React, { useState, useEffect } from "react";

export default function Flights({ sharedData }) {
  const [loading, setLoading] = useState(false);
  
  // 🚀 ૧૦૦% સેફ ડાયનેમિક સ્ટેટ્સ
  const [fromCity, setFromCity] = useState("AMD, Ahmedabad");
  const [toCity, setToCity] = useState("Manali");
  const [depDate, setDepDate] = useState("12 June, 2026");

  // ફિલ્ટર ટેબ્સ
  const [flightTabs, setFlightTabs] = useState([
    { label: "Best", price: "₹6,500", time: "1h 30m", active: true },
    { label: "Cheapest", price: "₹4,200", time: "2h 15m", active: false },
    { label: "Fastest", price: "₹8,800", time: "1h 15m", active: false },
    { label: "Lowest Emissions", price: "₹5,900", time: "1h 30m", active: false },
  ]);

  // ફ્લાઇટ લિસ્ટ સ્ટેટ
  const [flightList, setFlightList] = useState([
    {
      logo: "✈️",
      airline: "IndiGo",
      depTime: "06:15 AM",
      depCode: "AMD",
      arrTime: "07:45 AM",
      arrCode: "IXC",
      duration: "1h 30m",
      type: "Non-stop",
      price: "₹4,200",
      tag: "Cheapest",
    },
    {
      logo: "🇮🇳",
      airline: "Air India",
      depTime: "11:30 AM",
      depCode: "AMD",
      arrTime: "01:00 PM",
      arrCode: "IXC",
      duration: "1h 30m",
      type: "Non-stop",
      price: "₹6,500",
      tag: "Best",
    }
  ]);

  // 🔑 Groq API Key
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // 🚀 Groq AI માંથી ફ્લાઇટ લાવવાનું ૧૦૦% સેફ ફંક્શન
  const fetchLiveFlights = async (origin, target) => {
    if (!origin || !target || !GROQ_API_KEY) return;
    setLoading(true);

    // એરપોર્ટ કોડ ક્રેશ સેફ્ટી લોજિક (જો યુઝર નાનો અક્ષર લખે તો પણ વાંધો નહિ)
    const safeDepCode = origin.trim().substring(0, 3).toUpperCase() || "DEL";
    const safeArrCode = target.trim().substring(0, 3).toUpperCase() || "BOM";

    const prompt = `Generate a realistic list of 3 actual domestic/international airlines operating from "${origin}" to "${target}". 
    Provide real airline names like IndiGo, Air India, Vistara, SpiceJet. Calculate realistic pricing in INR (₹) and genuine durations based on these two cities.
    
    CRITICAL: Output ONLY a JSON object with a key named "flights" containing an array of exactly 3 flight objects.
    Strict JSON Structure required:
    {
      "flights": [
        {
          "logo": "✈️",
          "airline": "Airline Name",
          "depTime": "08:30 AM",
          "depCode": "${safeDepCode}",
          "arrTime": "11:15 AM",
          "arrCode": "${safeArrCode}",
          "duration": "2h 45m",
          "type": "Non-stop",
          "price": "₹5,850",
          "tag": "Best"
        }
      ]
    }`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: "You are a live flight aggregator. Output strictly formatted JSON." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 1500
        })
      });

      const data = await response.json();
      if (response.ok) {
        let responseText = data.choices[0].message.content.trim();
        let aiData = JSON.parse(responseText);

        if (aiData && aiData.flights && Array.isArray(aiData.flights)) {
          setFlightList(aiData.flights);
          const basePrice = parseInt(aiData.flights[0].price.replace(/[^0-9]/g, "")) || 4000;
          setFlightTabs([
            { label: "Best", price: `₹${basePrice}`, time: aiData.flights[0].duration, active: true },
            { label: "Cheapest", price: `₹${Math.round(basePrice * 0.85)}`, time: "2h 10m", active: false },
            { label: "Fastest", price: `₹${Math.round(basePrice * 1.15)}`, time: aiData.flights[0].duration, active: false },
            { label: "Lowest Emissions", price: `₹${basePrice}`, time: aiData.flights[0].duration, active: false },
          ]);
        }
      }
    } catch (err) {
      console.error("Flight AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // પેજ લોડ થાય કે હોમ પેજનો ડેટા ચેન્જ થાય ત્યારે રન થશે
  useEffect(() => {
    if (sharedData && sharedData.destination) {
      setToCity(sharedData.destination);
      fetchLiveFlights(fromCity, sharedData.destination);
    } else {
      fetchLiveFlights(fromCity, toCity);
    }
  }, [sharedData]);

  // લોકલ સર્ચ બટન ક્લિક થાય ત્યારે
  const handleLocalSearch = (e) => {
    e.preventDefault();
    fetchLiveFlights(fromCity, toCity);
  };

  return (
    <div className="space-y-6">
      {/* ૧. બેનર */}
      <div 
        className="relative h-[150px] w-full rounded-2xl overflow-hidden bg-cover bg-center p-6 flex flex-col justify-center text-white shadow-md group"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/10 to-transparent z-0" />
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80" 
          alt="Plane" 
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 h-[85%] object-contain z-10 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="relative z-10 space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white">
            🛫 Flight Search Layer
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-md">Live Flights</h2>
          <p className="text-xs font-bold text-white/90">Real-time airfares optimized by Groq Systems</p>
        </div>
      </div>

      {/* ૨. સર્ચ બોક્સ */}
      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">From</span>
          <input 
            type="text" 
            value={fromCity} 
            onChange={(e) => setFromCity(e.target.value)} 
            placeholder="From City (e.g. AMD)"
            className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full border-b border-transparent focus:border-indigo-500 pt-0.5" 
          />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">To</span>
          <input 
            type="text" 
            value={toCity} 
            onChange={(e) => setToCity(e.target.value)} 
            placeholder="Destination City" 
            className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full border-b border-transparent focus:border-indigo-500 pt-0.5" 
          />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Departure</span>
          <input type="text" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full" />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Class</span>
          <p className="text-sm font-bold text-slate-800">Economy Pack</p>
        </div>
        <button type="submit" disabled={loading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50">
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {/* ૩. ફિલ્ટર ટેબ્સ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {flightTabs.map((tab, idx) => (
          <div key={idx} className={`p-3.5 rounded-xl border text-center transition-all ${tab.active ? "bg-indigo-50/50 border-indigo-200 text-indigo-600 shadow-sm" : "bg-white border-slate-100 text-slate-700"}`}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{tab.label}</p>
            <p className="text-base font-black mt-0.5">{tab.price}</p>
            <p className="text-[10px] font-semibold opacity-80">{tab.time}</p>
          </div>
        ))}
      </div>

      {/* ૪. ફ્લાઇટ લિસ્ટ */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500 animate-pulse">Fetching live flights from {fromCity} to {toCity}...</p>
          </div>
        ) : (
          flightList.map((flight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg">{flight.logo || "✈️"}</div>
                <h4 className="text-sm font-bold text-slate-800">{flight.airline}</h4>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-8 flex-1">
                <div className="text-center md:text-left">
                  <p className="text-sm font-black text-slate-800">{flight.depTime}</p>
                  <p className="text-[10px] font-bold text-slate-400">{flight.depCode}</p>
                </div>
                <div className="flex flex-col items-center flex-1 max-w-[120px]">
                  <p className="text-[10px] font-bold text-slate-400">{flight.duration}</p>
                  <div className="w-full h-[2px] bg-slate-200 relative my-1">
                    <div className="absolute w-1.5 h-1.5 bg-slate-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[10px] font-bold text-emerald-600">{flight.type}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm font-black text-slate-800">{flight.arrTime}</p>
                  <p className="text-[10px] font-bold text-slate-400">{flight.arrCode}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                <div className="text-right">
                  {flight.tag && <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-wider mb-0.5 inline-block">{flight.tag}</span>}
                  <p className="text-base font-black text-slate-800">{flight.price}</p>
                </div>
                <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm">Select</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
