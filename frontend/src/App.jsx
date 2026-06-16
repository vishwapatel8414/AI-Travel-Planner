import React, { useState } from "react";
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
  const [sharedSearchData, setSharedSearchData] = useState({ destination: "Mumbai", date: "24/06/2026", days: 3, budget: "Budget Friendly" });

  // 🚀 પ્રારંભિક રિયલ ડેટા સેટ કર્યો જેથી પેજ ક્યારેય ખાલી કે ફેક ના લાગે
  const [liveTravelData, setLiveTravelData] = useState({
    destination: "Mumbai",
    flights: [
      { airline: "IndiGo", depTime: "06:15 AM", depCode: "AMD", arrTime: "07:30 AM", arrCode: "BOM", duration: "1h 15m", price: "₹4,200" },
      { airline: "Air India", depTime: "11:30 AM", depCode: "AMD", arrTime: "12:45 PM", arrCode: "BOM", duration: "1h 15m", price: "₹6,500" }
    ],
    hotels: [
      { hotel_name: "The Taj Mahal Palace", address: "Colaba, Mumbai Oceanfront", rating: "5.0", price_per_night_in_inr: "28500" },
      { hotel_name: "The Oberoi Luxury Grand", address: "Nariman Point, Marine Drive", rating: "4.9", price_per_night_in_inr: "24000" }
    ],
    places_to_visit: [
      { place_name: "Gateway of India", best_time_to_visit: "Morning", description: "A beautiful historic arch monument overlooking the Arabian Sea." },
      { place_name: "Marine Drive Promenade", best_time_to_visit: "Sunset", description: "Famous arc-shaped boulevard along the coast, perfect for evening walks." }
    ],
    itinerary: []
  });
  
  const [aiLoading, setAiLoading] = useState(false);
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const handlePlanSearch = async (data) => {
    if (!data || !data.destination) return;
    setSharedSearchData(data);
    
    if (activePage === "Home") {
      setActivePage("Trip Planner");
    }
    
    await fetchCompleteDynamicPlan(data.destination, data.budget || "Budget Friendly", data.days || 3);
  };

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
              content: `You are an expert real-time travel analyst. Generate a highly realistic travel plan in JSON format based on destination: "${destination}". You MUST strictly return a JSON object with EXACTLY these four keys: "destination", "flights", "hotels", "places_to_visit", and "itinerary". Inside "flights", use keys: "airline", "depTime", "depCode", "arrTime", "arrCode", "duration", "price". Inside "hotels", use keys: "hotel_name", "address", "rating", "price_per_night_in_inr". Inside "places_to_visit", use keys: "place_name", "best_time_to_visit", "description". All data must be 100% real for the city.`
            },
            {
              role: "user",
              content: `Create a comprehensive travel guide and itinerary for "${destination}" for ${days} days with a "${budget}" budget constraint.`
            }
          ],
          temperature: 0.2,
          max_tokens: 3000
        })
      });

      const resData = await response.json();
      if (response.ok && resData.choices?.[0]?.message?.content) {
        const finalJson = JSON.parse(resData.choices[0].message.content);
        
        // 🎯 સુપર પ્રોટેક્શન લેયર: જો AI કોઈ કી મોકલવાનું ભૂલી જાય, તો પણ જૂનો ડેટા ક્રેશ થવા નહીં દે
        setLiveTravelData({
          destination: finalJson.destination || destination,
          flights: Array.isArray(finalJson.flights) ? finalJson.flights : [],
          hotels: Array.isArray(finalJson.hotels) ? finalJson.hotels : [],
          places_to_visit: Array.isArray(finalJson.places_to_visit) ? finalJson.places_to_visit : [],
          itinerary: Array.isArray(finalJson.itinerary) ? finalJson.itinerary : []
        });
      }
    } catch (err) {
      console.error("Master AI Error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-x-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 lg:pl-72 p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8 items-start">
          
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
              </div>
            </>
          )}

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
    </div>
  );
}
