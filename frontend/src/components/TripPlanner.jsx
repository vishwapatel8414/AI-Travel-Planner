import React, { useState, useEffect } from "react";

export default function TripPlanner({ sharedData }) {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState(sharedData?.destination || "Manali");
  const [days, setDays] = useState(sharedData?.days || 5);
  const [budget, setBudget] = useState(sharedData?.budget || "Luxury Stay");

  // ૧. ડિફોલ્ટ ઇટીનરરી
  const [itinerary, setItinerary] = useState([
    {
      day: "Day 1: Arrival & Exploration",
      time: "11:00 AM",
      activity: "Welcome Sightseeing",
      details: "Welcome! Enter any destination and custom days, then click generate to get a real-time response from Groq Llama 3.1 AI.",
      icon: "✈️",
    }
  ]);

  // ૨. ડિફોલ્ટ પેકિંગ લિસ્ટ
  const [packingList, setPackingList] = useState([
    "Valid ID Proofs & Tickets",
    "Comfortable Shoes",
    "Universal Charger & Power Bank",
    "Basic Medical Kit"
  ]);

  const bannerImg = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80";

  // 🔑 .env માંથી સિક્યોર API Key લોડ થશે
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // હોમ પેજ પરથી નવો સર્ચ ડેટા આવે ત્યારે બધું અપડેટ કરવું
  useEffect(() => {
    if (sharedData) {
      setDestination(sharedData.destination || "Manali");
      setDays(parseInt(sharedData.days) || 5);
      setBudget(sharedData.budget || "Luxury Stay");
    }
  }, [sharedData]);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!destination.trim() || loading) return;

    setLoading(true);

    const prompt = `You must create a highly detailed travel itinerary and a custom packing checklist for "${destination}" for exactly ${days} days with a ${budget} budget.
    The packing checklist must contain 5-6 realistic items specific to the weather and activities of ${destination}.
    
    CRITICAL: Return the response ONLY as a JSON object with two main keys: "itinerary" and "packingList".
    Strict JSON Structure required:
    {
      "itinerary": [
        {
          "day": "Day 1",
          "time": "09:00 AM",
          "activity": "Exact Real Spot Name in ${destination}",
          "details": "Give historical or real description.",
          "icon": "📍"
        }
      ],
      "packingList": ["Specific Item 1", "Specific Item 2", "Specific Item 3"]
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
            {
              role: "system",
              content: "You are an expert travel assistant that outputs strictly formatted JSON containing both itinerary and packingList arrays."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          response_format: { type: "json_object" }, 
          temperature: 0.3, 
          max_tokens: 2500 
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Groq Server Error");

      let responseText = data.choices[0].message.content.trim();
      let aiData = JSON.parse(responseText);
      
      let cleanItinerary = [];
      if (aiData && aiData.itinerary && Array.isArray(aiData.itinerary)) {
        cleanItinerary = aiData.itinerary;
      } else if (Array.isArray(aiData)) {
        cleanItinerary = aiData;
      }

      if (cleanItinerary.length > 0) {
        const updatedItinerary = cleanItinerary.map((item, idx) => ({
          day: item.day || `Day ${idx + 1}`,
          time: item.time || "09:00 AM",
          activity: item.activity || "Explore Spot",
          details: item.details || "Visit the popular local landmark.",
          icon: item.icon || "📍",
        }));
        setItinerary(updatedItinerary);
      }

      if (aiData && aiData.packingList && Array.isArray(aiData.packingList)) {
        setPackingList(aiData.packingList);
      }

    } catch (error) {
      console.error("GROQ_PLANNER_ERROR:", error);
      alert(`Groq AI Message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ૧. બેનર ಸೆクション */}
      <div 
        className="relative h-[240px] md:h-[280px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 md:p-12 flex flex-col justify-center text-white shadow-xl"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent z-0" />
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm">
            ⚡ Live Groq Llama 3.1 System
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-none drop-shadow-md">
            Explore <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">The Unexplored</span>
          </h2>
        </div>
      </div>

      {/* ૨. ૧૦૦% ડાયનેમિક ફોર્મ સેક્શન */}
      <form onSubmit={handleGenerate} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex flex-col px-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Where to?</label>
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search anything..."
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col px-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Duration (Days)</label>
          <input 
            type="number" 
            min="1" 
            max="12" 
            value={days} 
            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col px-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Budget</label>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 focus:outline-none cursor-pointer">
            <option value="Budget Stay">Budget Stay</option>
            <option value="Luxury Stay">Luxury Ultra</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 uppercase tracking-wider">
          {loading ? "Groq AI is Thinking..." : "Generate AI Plan"}
        </button>
      </form>

      {/* ૩. મુખ્ય આઆઉટપુટ લેઆઉટ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* ડાબી બાજુ: ઇટીનરરી */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            ✨ Live Real-time Itinerary for {destination} ({days} Days)
          </h3>
          
          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500 animate-pulse">Groq AI is building a genuine plan...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itinerary.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex gap-4 p-5 hover:shadow-md transition-all items-start">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase tracking-wider max-w-fit">
                        {item.day}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{item.time}</span>
                    </div>
                    <h4 className="text-base font-black text-slate-800 tracking-tight">{item.activity}</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* જમણી બાજુ: માત્ર પેકિંગ લિસ્ટ (બજેટ બોક્સ સાફ!) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              🎒 AI Packing Checklist ({destination})
            </h3>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Recommended Items:</p>
              
              {loading ? (
                <div className="space-y-2 py-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {packingList.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50/80 border border-slate-100/50 p-2.5 rounded-xl">
                      <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 border-slate-300 cursor-pointer" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
