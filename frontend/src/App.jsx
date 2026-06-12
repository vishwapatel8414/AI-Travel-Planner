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

  // 🚀 હોમ પેજ સાઇડબાર લાઈવ ઇન્સાઇટ્સ માટેના સ્ટેટ્સ
  const [aiInsights, setAiInsights] = useState("Search a destination to get live premium travel insights and hidden gems automatically.");
  const [insightsLoading, setInsightsLoading] = useState(false);

  // 🔑 .env માંથી Groq API Key લોડ કરવી
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // 🛠️ હોમ પેજ પરથી સર્ચ થાય ત્યારે આ ફંક્શન રન થશે
  const handlePlanSearch = (data) => {
    setSharedSearchData(data);
    
    // પ્લાનર પેજ પર મોકલતા પહેલા હોમ પેજની ઇન્સાઇટ્સ બેકગ્રાઉન્ડમાં લોડ કરવી
    fetchLiveInsights(data.destination);
    
    // યુઝરને પ્લાનર પેજ પર મોકલવો
    setActivePage("Trip Planner");
  };

  // 🚀 Groq AI માંથી હોમ પેજ માટે લાઈવ ઇન્સાઇટ્સ લાવવાનું ફંક્શન
  const fetchLiveInsights = async (dest) => {
    if (!dest || !GROQ_API_KEY) return;
    setInsightsLoading(true);
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
              content: "You are a travel analyst. Give a 2-line direct premium travel advice, best season, or hidden gem for the city. No formatting, no asterisks."
            },
            {
              role: "user",
              content: `Give a quick travel insight and best time to visit for: ${dest}`
            }
          ],
          temperature: 0.4,
          max_tokens: 150
        })
      });

      const resData = await response.json();
      if (response.ok && resData.choices?.[0]?.message?.content) {
        setAiInsights(resData.choices[0].message.content.trim());
      }
    } catch (err) {
      console.error("Insights Error:", err);
    } finally {
      setInsightsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-x-hidden">
      
      {/* ૧. સાઇડબાર મેનુ */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 lg:pl-72 p-4 md:p-8">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8 items-start">
          
          {/* 🏠 HOME PAGE સેક્શન */}
          {activePage === "Home" && (
            <>
              <div className="xl:col-span-3 space-y-6 md:space-y-8">
                {/* 🚀 TARGET UPDATE 1: Hero ની અંદર sharedData સિંક કર્યો */}
                <Hero onSearchSubmit={handlePlanSearch} sharedData={sharedSearchData} />
                
                {/* 🚀 TARGET UPDATE 2: StatsCards ની અંદર પ્રોપ સેટ થઈ ગયો */}
                <StatsCards sharedData={sharedSearchData} />
                
                <DestinationCards />
              </div>
              
              {/* જમણી બાજુનું ઓરિજિનલ સાઇડબાર */}
              <div className="xl:col-span-1 space-y-6 sticky top-6 h-fit">
                <AIChat />
                <TravelStats />
                
                {/* 📊 Advanced Travel Stats & Insights */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    📊 Advanced Travel Stats & Insights
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-center pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-extrabold text-slate-400 uppercase">Trips</span>
                      <span className="text-sm font-black text-slate-800">{sharedSearchData ? "129" : "128"}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-extrabold text-slate-400 uppercase">Countries</span>
                      <span className="text-sm font-black text-slate-800">24</span>
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 border border-indigo-100/50 p-3 rounded-xl">
                    <span className="inline-block text-[9px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider mb-1.5">
                      💡 {sharedSearchData ? `${sharedSearchData.destination} Insight` : "Live Tip"}
                    </span>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      {insightsLoading ? "Fetching live trends from Groq..." : aiInsights}
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
                <TripPlanner sharedData={sharedSearchData} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <PlannerSidebar />
              </div>
            </>
          )}

          {/* ✈️ FLIGHTS PAGE સેક્શન */}
          {activePage === "Flights" && (
            <>
              <div className="xl:col-span-3">
                <Flights sharedData={sharedSearchData} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <FlightSummary />
              </div>
            </>
          )}

          {/* 🏨 HOTELS PAGE સેક્શન */}
          {activePage === "Hotels" && (
            <>
              <div className="xl:col-span-3">
                <Hotels sharedData={sharedSearchData} /> 
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <HotelSidebar />
              </div>
            </>
          )}

          {/* 📍 PLACES PAGE સેક્શન */}
          {activePage === "Places" && (
            <>
              <div className="xl:col-span-3">
                <Places sharedData={sharedSearchData} />
              </div>
              <div className="xl:col-span-1 sticky top-6 h-fit">
                <PlacesSidebar />
              </div>
            </>
          )}
          
        </div>
      </main>

    </div>
  );
}
