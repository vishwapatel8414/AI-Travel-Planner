import React, { useState, useEffect } from "react";

export default function Hero({ onSearchSubmit, sharedData }) {
  // 🚀 સ્ક્રીનશોટ મુજબના ૧૦૦% અસલી સ્ટેટ્સ (એમ જ રાખ્યા છે)
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travelers, setTravelers] = useState("1 Traveler");

  // 🔄 જો એપમાં ગ્લોબલ સર્ચ ડેટા ઓલરેડી સ્ટોર હોય તો ઇનપુટ બોક્સમાં આપોઆપ નામ આવી જશે!
  useEffect(() => {
    if (sharedData?.destination) {
      setDestination(sharedData.destination);
    }
  }, [sharedData]);

  // ફોર્મ સબમિટ થાય ત્યારે દિવસો ગણીને અને અસલી તારીખ બનાવીને App.jsx ને મોકલવા
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    let calculatedDays = 3; // ડિફોલ્ટ ૩ દિવસ
    let formattedDate = "11/07/2026"; // સેફ્ટી ડિફોલ્ટ ડેટ

    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) calculatedDays = diffDays;

      // 🎯 માસ્ટર સ્ટ્રોક: ચેક-ઇન ડેટને અસલી ફોર્મેટમાં કન્વર્ટ કરો (DD/MM/YYYY)
      const day = String(start.getDate()).padStart(2, '0');
      const month = String(start.getMonth() + 1).padStart(2, '0');
      const year = start.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    } else if (checkIn) {
      // જો ખાલી ચેક-ઇન ડેટ જ નાખી હોય તો એને કન્વર્ટ કરો
      const start = new Date(checkIn);
      const day = String(start.getDate()).padStart(2, '0');
      const month = String(start.getMonth() + 1).padStart(2, '0');
      const year = start.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    }

    if (onSearchSubmit) {
      // 🔥 અહીં આપણે 'date' પ્રોપર્ટી એડ કરી દીધી, જેથી બધી જગ્યાએ ડેટા લાઈવ બદલાય!
      onSearchSubmit({
        destination: destination.trim(),
        days: calculatedDays,
        date: formattedDate, 
        budget: "Luxury Stay"
      });
    }
  };

  return (
    <div className="w-full">
      {/* 👑 તારું અસલી, અલ્ટ્રા-પ્રીમિયમ સોનેરી પહાડો વાળું ઓરિજિનલ બેનર */}
      <div 
        className="w-full rounded-[32px] overflow-hidden bg-cover bg-center p-6 md:p-12 relative min-h-[360px] md:min-h-[400px] flex flex-col justify-between text-white shadow-2xl mb-8"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        {/* હળવો, સોફ્ટ ઓવરલે લેયર જેથી ટેક્સ્ટ પ્રીમિયમ દેખાય */}
        <div className="absolute inset-0 bg-slate-950/20 z-0" />

        {/* બેનર લખાણ (સ્ક્રીનશોટ મુજબ કલર અને સ્ટાઇલ કમ્પ્લીટ) */}
        <div className="relative z-10 space-y-2 mb-6 mt-6 md:mt-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-indigo-600/90 text-white shadow-md">
            ⚡ AI POWERED
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white drop-shadow-md">
            Plan Smarter. <span className="text-cyan-200">Travel Better.</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-100 font-semibold max-w-lg leading-relaxed">
            Your all-in-one AI travel companion to plan memorable journeys with Groq Llama 3.1 precision.
          </p>
        </div>

        {/* 🛠️ સ્ક્રીનશોટ મુજબનું વ્હાઇટ કેપ્સ્યુલ સર્ચ બાર */}
        <form 
          onSubmit={handleSubmit} 
          className="relative z-10 w-full bg-white p-3 rounded-2xl md:rounded-full shadow-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-center border border-slate-100/50"
        >
          {/* ૧. WHERE TO? */}
          <div className="flex flex-col px-4 md:border-r border-slate-100">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">
              📍 WHERE TO?
            </span>
            <input 
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="E.g., Bali, Switzerland, Manali"
              className="text-xs font-bold text-slate-800 focus:outline-none bg-transparent placeholder-slate-400 w-full"
            />
          </div>

          {/* ૨. CHECK-IN */}
          <div className="flex flex-col px-4 md:border-r border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
              📅 CHECK-IN
            </span>
            <input 
              type="date"
              required // તારીખ બદલવા માટે આને રીક્વાયર્ડ કર્યું છે
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-xs font-bold text-slate-700 focus:outline-none bg-transparent cursor-pointer w-full"
            />
          </div>

          {/* ૩. CHECK-OUT */}
          <div className="flex flex-col px-4 md:border-r border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
              📅 CHECK-OUT
            </span>
            <input 
              type="date"
              required // તારીખ બદલવા માટે આને પણ રીક્વાયર્ડ કર્યું
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-xs font-bold text-slate-700 focus:outline-none bg-transparent cursor-pointer w-full"
            />
          </div>

          {/* ૪. TRAVELERS */}
          <div className="flex flex-col px-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
              👤 TRAVELERS
            </span>
            <select 
              value={travelers} 
              onChange={(e) => setTravelers(e.target.value)}
              className="text-xs font-bold text-slate-800 focus:outline-none bg-transparent cursor-pointer appearance-none w-full"
            >
              <option value="1 Traveler">1 Traveler</option>
              <option value="2 Travelers">2 Travelers</option>
              <option value="3 Travelers">3 Travelers</option>
              <option value="4+ Travelers">4+ Guests</option>
            </select>
          </div>

          {/* ૫. EXPLORE BUTTON */}
          <button 
            type="submit" 
            className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-xs py-3.5 px-6 rounded-xl md:rounded-full transition-all shadow-md active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" /> Explore
          </button>

        </form>
      </div>
    </div>
  );
}
