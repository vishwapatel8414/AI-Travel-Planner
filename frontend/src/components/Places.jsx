import React, { useState, useEffect } from "react";

export default function Places({ sharedData }) {
  const [loading, setLoading] = useState(false);
  const [toCity, setToCity] = useState("Manali");

  // 🚀 ૧૦૦% સેફ લાઈવ પ્લેસીસ ડેટા (કોઈ ઈમેજ લિંક નહિ, માત્ર શુદ્ધ ડેટા!)
  const [placesList, setPlacesList] = useState([
    {
      name: "Solang Valley",
      category: "Nature & Adventure",
      rating: "4.8",
      reviews: "2.1k reviews",
      timeNeeded: "3-4 Hours",
      entryFee: "Free Entry",
      description: "A beautiful valley known for its stunning glacier views and exciting adventure sports like paragliding, skiing, and zorbing.",
    },
    {
      name: "Hadimba Temple",
      category: "History & Culture",
      rating: "4.7",
      reviews: "1.9k reviews",
      timeNeeded: "1-2 Hours",
      entryFee: "Free Entry",
      description: "An ancient wooden temple built in 1553, dedicated to Hidimba Devi, surrounded by a gorgeous, thick cedar forest called Dhungri Van Vihar.",
    }
  ]);

  const bannerImg = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const fetchLivePlaces = async (targetDestination) => {
    if (!targetDestination || !GROQ_API_KEY) return;
    setLoading(true);

    const prompt = `Generate a highly realistic list of exactly 3 famous and actual tourist attractions/places to visit in "${targetDestination}".
    Provide real landmark names, accurate categories, high ratings, and correct details like estimated time needed and entry fees in INR (₹).
    
    CRITICAL: Output ONLY a JSON object with a key named "places" containing an array of exactly 3 place objects. Do NOT include any image keys.
    Strict JSON Structure required:
    {
      "places": [
        {
          "name": "Exact Landmark Name",
          "category": "Nature & Views or History & Culture or Shopping & Luxury",
          "rating": "4.8",
          "reviews": "1.5k reviews",
          "timeNeeded": "2-3 Hours",
          "entryFee": "Free Entry",
          "description": "Give a short attractive summary of the place."
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
            { role: "system", content: "You are a professional travel guide API. Output strictly formatted JSON." },
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

        if (aiData && aiData.places && Array.isArray(aiData.places)) {
          setPlacesList(aiData.places);
        }
      }
    } catch (err) {
      console.error("Places AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const activeDest = sharedData?.destination || toCity;
    if (sharedData?.destination) {
      setToCity(sharedData.destination);
    }
    fetchLivePlaces(activeDest);
  }, [sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    fetchLivePlaces(toCity);
  };

  return (
    <div className="space-y-6">
      
      {/* ૧. પ્રોફેશનલ સિનેમેટિક બેનર */}
      <div 
        className="relative h-[200px] md:h-[240px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 md:p-12 flex flex-col justify-center text-white shadow-xl"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/35 to-transparent z-0" />
        <div className="relative z-10 max-w-xl space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm">
            📍 Destination Guide
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-none drop-shadow-md">
            Discover <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent">Top Attractions</span>
          </h2>
          <p className="text-xs md:text-sm font-bold text-slate-200 tracking-wide opacity-95">
            Explore the most iconic and handpicked landmarks optimized by Groq AI
          </p>
        </div>
      </div>

      {/* ૨. સર્ચ ફિલ્ટર બોક્સ */}
      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full px-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Explore Places In</span>
          <input 
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="Enter City Name..."
            className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full border-b border-transparent focus:border-indigo-500 pt-0.5"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full md:w-auto bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50">
          {loading ? "Finding..." : "🔍 Find Attractions"}
        </button>
      </form>

      {/* ૩. આકર્ષક કનેક્ટેડ હબ લેઆઉટ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ડાબી બાજુ: નવો પ્રોફેશનલ ડેશબોર્ડ લુક (ઇમેજ વગર વટ પડે એવો) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-5 rounded-2xl text-white shadow-md border border-slate-800 space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Location Hub</h3>
              <p className="text-lg font-bold text-white mt-0.5">{toCity} Explorer</p>
            </div>
            
            <div className="space-y-2 pt-1">
              <button className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-left text-xs font-bold p-3 rounded-xl flex items-center gap-3 transition-all">
                <span>🗺️</span> Explore Surroundings
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-bold p-3 rounded-xl flex items-center gap-3 transition-all text-slate-300">
                <span>📍</span> Local Groq Guide
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-bold p-3 rounded-xl flex items-center gap-3 transition-all text-slate-300">
                <span>🏢</span> Stays Nearby
              </button>
            </div>

            {/* કસ્ટમ મિની મેપ પ્રોફેશનલ ઇન્ટરફેસ */}
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="block text-[9px] font-extrabold text-slate-400 uppercase">Live Map Layer</span>
                <span className="text-xs font-bold text-slate-200">Interactive Navigation</span>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toCity + " tourist places")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-lg transition-all active:scale-95 shadow-sm uppercase tracking-wide"
              >
                View Map
              </a>
            </div>
          </div>
        </div>

        {/* જમણી બાજુ: લાઈવ જોવાલાયક સ્થળોનું લિસ્ટિંગ (૨ કોલમ જગ્યા રોકશે) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            ⭐ Top Recommended Places
          </h3>
          
          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500 animate-pulse">Mapping the best attractions in {toCity}...</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {placesList.map((place, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex gap-5 p-5 hover:shadow-md transition-all items-start"
                >
                  {/* ઇમેજના બદલે પ્રીમિયમ ગ્લોઇંગ નંબર બેજ જે સ્માર્ટ લુક આપશે */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-lg text-indigo-600 shadow-inner flex-shrink-0">
                    {idx + 1}
                  </div>

                  {/* ડેટા વિગતો */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-black text-slate-800 tracking-tight">{place.name}</h4>
                        <span className="text-[9px] font-extrabold bg-indigo-100 text-indigo-700 border border-indigo-200/30 px-2 py-0.5 rounded uppercase tracking-wider">
                          {place.category}
                        </span>
                      </div>
                      
                      {/* રેટિંગ ડબ્બો */}
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg max-w-fit">
                        <span className="text-amber-500">⭐</span>
                        <span>{place.rating || "4.6"}</span>
                        <span className="text-slate-300 font-normal">|</span>
                        <span className="text-[10px] text-slate-400 font-medium">{place.reviews || "800 reviews"}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {place.description}
                    </p>

                    {/* બોટમ ટેગ્સ */}
                    <div className="pt-2.5 border-t border-slate-50 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] font-bold text-slate-400">
                      <span>⏱️ Time Needed: <span className="text-slate-700 font-extrabold">{place.timeNeeded || "2 Hours"}</span></span>
                      <span>🎟️ Ticket Fee: <span className="text-emerald-600 font-extrabold">{place.entryFee || "Free Entry"}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
