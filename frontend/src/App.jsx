import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import StatsCards from "./components/StatsCards";
import DestinationCards from "./components/DestinationCards";
import AIChat from "./components/AIChat";
import TravelStats from "./components/TravelStats";
import Flights from "./components/Flights";
import FlightSummary from "./components/FlightSummary";
import Hotels from "./components/Hotels";
import HotelSidebar from "./components/HotelSidebar";
import TripPlanner from "./components/TripPlanner";
import PlannerSidebar from "./components/PlannerSidebar";
import Places from "./components/Places";
import PlacesSidebar from "./components/PlacesSidebar";

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [sharedSearchData, setSharedSearchData] = useState(null);

  // 🚀 લાઈવ AI ડેટા સ્ટોર કરવા માટેના મેઈન સ્ટેટ્સ
  const [liveTravelData, setLiveTravelData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // 🔑 .env માંથી Groq API Key લોડ કરવી
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // 🛠️ હોમ પેજ કે અન્ય કોઈ પણ પેજ પરથી સર્ચ થાય ત્યારે આ મેઈન ફંક્શન રન થશે
  const handlePlanSearch = async (data) => {
    // યુઝરે ટાઈપ કરેલું નવું નામ તરત જ સ્ટેટમાં સેટ કરો
    setSharedSearchData(data);
    
    // જો હોમ પેજ પર હોય તો જ પ્લાનર પેજ પર મોકલો, બાકી જે તે પેજ પર જ રાખો
    if (activePage === "Home") {
      setActivePage("Trip Planner");
    }
    
    // લાઈવ ડેટા લોડ કરવાનું માસ્ટર ફંક્શન
    await fetchCompleteDynamicPlan(data.destination, data.budget || "Budget Friendly", data.days || 3);
  };

  // 🚀 Llama 3.1 માંથી રિયલ ડેટા લાવવાનું ફંક્શન
  const fetchCompleteDynamicPlan = async (destination, budget, days) => {
    if (!destination || !GROQ_API_KEY) return;
    setAiLoading(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are an expert real-time travel analyst. Generate a highly realistic travel plan in JSON format based on destination: "${destination}". Strictly return a JSON object with keys: "destination", "flights", "hotels", "places_to_visit", and "itinerary". All names must be real and match the city.`
            },
            {
              role: "user",
              content: `Create a comprehensive travel guide and itinerary for "${destination}" for ${days} days with a "${budget}" budget constraint.`
            }
          ],
          temperature: 0.3,
          max_tokens: 3000
        })
      });

      const resData = await response.json();
      if (response.ok && resData.choices?.[0]?.message?.content) {
        const finalJson = JSON.parse(resData.choices[0].message.content);
        // 🎯 અસલી લાઈવ ડેટા સેટ થયો
        setLiveTravelData(finalJson);
      }
    } catch (err) {
      console.error("Master AI Error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-x-hidden">
      
      {/* ૧. સાઇડબાર મેનુ */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 lg:pl-72 p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8 items-start">
          
          {/* 🏠 HOME PAGE સેક્શન */}
          {activePage === "Home" && (
            <>
              <div className="xl:col-span-3 space-y-6 md:space-y-8">
                <Hero onSearchSubmit={handlePlanSearch} sharedData={sharedSearchData} />
                <StatsCards sharedData={sharedSearchData} />
                <DestinationCards />
              </div>
              
              <div className="xl:col-span-1 space-y-6 sticky top-6 h-fit">
                <AIChat />
                <TravelStats />
                
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">📊 Live AI System Insights</h3>
                  <div className="bg-indigo-50/50 border border-indigo-100/50 p-3 rounded-xl">
                    <span className="inline-block text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider mb-1.5">💡 Status</span>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      {aiLoading ? "Llama 3.1 is fetching live global data..." : liveTravelData ? `Successfully loaded dynamic data for ${liveTravelData.destination}!` : "Enter a destination to activate real-time AI mapping."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 🗺️ TRIP PLANNER PAGE સેક્શન */}
          {activePage === "Trip Planner" && (
            <>
              <div className="xl:col-span-3">
                <TripPlanner sharedData={sharedSearchData} liveData={liveTravelData} isLoading={aiLoading} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <PlannerSidebar liveData={liveTravelData} />
              </div>
            </>
          )}

          {/* ✈️ FLIGHTS PAGE સેક્શન - (🎯 અહીં લાઈવ ડેટા અને સર્ચ ટ્રિગર પરફેક્ટ સિંક કરી દીધા) */}
          {activePage === "Flights" && (
            <>
              <div className="xl:col-span-3">
                <Flights sharedData={sharedSearchData} liveData={liveTravelData} isLoading={aiLoading} onSearchSubmit={handlePlanSearch} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <FlightSummary liveData={liveTravelData} sharedData={sharedSearchData} />
              </div>
            </>
          )}

          {/* 🏨 HOTELS PAGE સેક્શન - (🎯 લાઈવ ડેટા અને સાઈડબાર લિંક કનેક્ટેડ) */}
          {activePage === "Hotels" && (
            <>
              <div className="xl:col-span-3">
                <Hotels sharedData={sharedSearchData} liveData={liveTravelData} isLoading={aiLoading} onSearchSubmit={handlePlanSearch} /> 
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <HotelSidebar liveData={liveTravelData} />
              </div>
            </>
          )}

          {/* 📍 PLACES PAGE SEKTION - (🎯 પ્લેસીસ સાઈડબાર લિંક કનેક્ટેડ) */}
          {activePage === "Places" && (
            <>
              <div className="xl:col-span-3">
                <Places sharedData={sharedSearchData} liveData={liveTravelData} isLoading={aiLoading} onSearchSubmit={handlePlanSearch} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <PlacesSidebar liveData={liveTravelData} />
              </div>
            </>
          )}
          
        </div>
      </main>

      {/* 📱 ફોન માટે સ્પેશિયલ બોટમ મેનુ ਪਟ੍ਟੀ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActivePage("Home")} className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wider transition-all ${activePage === "Home" ? "text-[#4f46e5] scale-105" : "text-slate-400"}`}>
          <span className="text-lg">🏠</span>HOME
        </button>
        <button onClick={() => setActivePage("Flights")} className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wider transition-all ${activePage === "Flights" ? "text-[#4f46e5] scale-105" : "text-slate-400"}`}>
          <span className="text-lg">✈️</span>FLIGHTS
        </button>
        <button onClick={() => setActivePage("Hotels")} className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wider transition-all ${activePage === "Hotels" ? "text-[#4f46e5] scale-105" : "text-slate-400"}`}>
          <span className="text-lg">🏨</span>HOTELS
        </button>
        <button onClick={() => setActivePage("Places")} className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wider transition-all ${activePage === "Places" ? "text-[#4f46e5] scale-105" : "text-slate-400"}`}>
          <span className="text-lg">📍</span>PLACES
        </button>
      </div>

    </div>
  );
}
