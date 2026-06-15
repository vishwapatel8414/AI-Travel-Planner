import React, { useState, useEffect } from "react";

// 🚀 App.jsx માંથી આવતા liveData અને isLoading ને પ્રોપ્સમાં એડ કર્યા
export default function Hotels({ sharedData, liveData, isLoading }) {
  
  // 🚀 તારા ઓરિજિનલ લાઈવ ડાયનેમિક સ્ટેટ્સ
  const [toCity, setToCity] = useState("Manali");
  const [stayDates, setStayDates] = useState("12 June - 17 June");
  const [selectedCategory, setSelectedCategory] = useState("All Hotels");

  // કેટેગરીઝ સ્ટેટ (તારી ઓરિજિનલ ડિઝાઇન)
  const [categories, setCategories] = useState([
    { label: "All Hotels", count: "Stays Found", icon: "🏨" },
    { label: "Luxury", count: "Premium", icon: "👑" },
    { label: "Budget", count: "Value Saver", icon: "💰" },
    { label: "Resorts", count: "Relaxing", icon: "🌴" },
    { label: "Boutique", count: "Trendy", icon: "🏢" },
  ]);

  // હોટેલ લિસ્ટ સ્ટેટ
  const [hotelList, setHotelList] = useState([]);

  const imageUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

  // 🔄 જ્યારે પણ App.jsx માંથી નવો લાઈવ ડેટા આવે ત્યારે તારી ડિઝાઇનમાં સિંક કરવાનો જાદુ
  useEffect(() => {
    if (sharedData && sharedData.destination) {
      setToCity(sharedData.destination);
    }

    if (liveData && liveData.hotels && Array.isArray(liveData.hotels)) {
      // અનસ્પ્લેશ ઈમેજીસનો પૂલ જે તેં બનાવ્યો હતો, તેને જાળવી રાખ્યો છે
      const imagesPool = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
      ];

      // AI ના ડેટાને તારા ઓરિજિનલ ઓબ્જેક્ટના કી-સ્ટ્રક્ચર (name, location, price) સાથે મેપ કર્યો
      const updatedHotels = liveData.hotels.map((h, index) => {
        const perNightPrice = h.price_per_night_in_inr || h.price || "5000";
        // જો અંદર સ્ટ્રિંગમાં ₹ ના હોય તો એડ કરવું
        const formattedPrice = perNightPrice.toString().startsWith("₹") ? perNightPrice : `₹${perNightPrice}`;
        const numericPrice = parseInt(perNightPrice.toString().replace(/[^0-9]/g, "")) || 5000;

        return {
          name: h.hotel_name || h.name || "Premium AI Hotel",
          type: h.rating > 4.5 ? "Luxury" : "Budget", // ઓટોમેટીક કેટેગરી ફિલ્ટર સેફ્ટી
          tag: h.rating > 4.5 ? "AI PREFERRED" : "GREAT VALUE",
          tagColor: h.rating > 4.5 ? "bg-purple-600" : "bg-emerald-600",
          location: h.address || h.location || `Near Center, ${liveData.destination}`,
          rating: h.rating || "4.5",
          reviews: `${Math.floor(Math.random() * 800) + 200} reviews`, // રિયલ લુક આપવા ડાયનેમિક રિવ્યુઝ
          price: formattedPrice,
          totalPrice: `₹${numericPrice * 5} (5 nights)`, // 5 નાઇટ્સનું ઓટોમેટિક કેલ્ક્યુલેશન
          features: ["Free Wi-Fi", "Mountain View", "Room Service", "Breakfast Included"],
          aiPick: h.rating > 4.5,
          image: imagesPool[index % imagesPool.length]
        };
      });

      setHotelList(updatedHotels);
      setSelectedCategory("All Hotels");
    } else {
      // જો યુઝરે હજી કંઈ સર્ચ ના કર્યું હોય તો બેકઅપ તરીકે મનાલીનો તારો ઓરિજિનલ ડેટા
      setHotelList([
        { name: "The Grand Himalayan Resort", type: "Luxury", tag: "AI PREFERRED", tagColor: "bg-purple-600", location: "Mall Road, Manali, Himachal Pradesh", rating: "4.8", reviews: "1.1k reviews", price: "₹8,500", totalPrice: "₹42,500 (5 nights)", features: ["Free Wi-Fi", "Mountain View", "Pool", "Spa", "Heater"], aiPick: true, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" },
        { name: "Adler Alpine Stay", type: "Budget", tag: "GREAT VALUE", tagColor: "bg-emerald-600", location: "Old Manali, Himachal Pradesh", rating: "4.5", reviews: "642 reviews", price: "₹3,200", totalPrice: "₹16,000 (5 nights)", features: ["Free Wi-Fi", "Breakfast Included", "Cafeteria"], aiPick: false, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" }
      ]);
    }
  }, [liveData, sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
  };

  const filteredHotels = hotelList.filter((hotel) => {
    if (selectedCategory === "All Hotels") return true;
    return hotel.type?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* ૧. લક્ઝુરિયસ બેનર (તારી ઓરિજિનલ સ્લાઈલ) */}
      <div 
        className="relative h-[220px] md:h-[260px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 md:p-12 flex flex-col justify-center text-white shadow-xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/20 to-transparent z-0" />
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white drop-shadow-lg leading-none">
            Your Perfect <br />
            <span className="text-cyan-200">Stay Is Waiting</span>
          </h2>
          <p className="text-xs md:text-sm font-bold text-slate-200 tracking-wide uppercase opacity-90 drop-shadow-md">
            Handpicked premium hotels & hospitality optimized by Groq Llama 3.1
          </p>
        </div>
      </div>

      {/* ૨. હોટેલ સર્ચ બોક્સ (તારી ઓરિજિનલ ડિઝાઇન) */}
      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        <div className="border-r border-slate-100 px-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Where to?</span>
          <input 
            type="text" 
            value={toCity} 
            onChange={(e) => setToCity(e.target.value)} 
            placeholder="Destination City"
            className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full border-b border-transparent focus:border-indigo-500 pt-0.5"
          />
        </div>
        <div className="border-r border-slate-100 px-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Dates</span>
          <input type="text" value={stayDates} onChange={(e) => setStayDates(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full pt-0.5" />
        </div>
        <div className="border-r border-slate-100 px-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Guests & Rooms</span>
          <p className="text-sm font-bold text-slate-800">1 Room, 2 Guests</p>
        </div>
        <button type="submit" disabled={isLoading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50">
          {isLoading ? "Searching Stays..." : "Search Hotels"}
        </button>
      </form>

      {/* ૩. કેટેગરીઝ ફિલ્ટર ટેબ્સ */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedCategory(cat.label)}
            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer min-w-[140px] transition-all ${
              selectedCategory === cat.label
                ? "bg-indigo-50/50 border-indigo-200 text-indigo-600 shadow-sm font-bold scale-[1.02]"
                : "bg-white border-slate-100 text-slate-700 hover:border-slate-200"
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <div>
              <p className="text-xs font-bold leading-tight">{cat.label}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                {selectedCategory === cat.label ? "Active Filter" : cat.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ૪. હોટેલ લિસ્ટિંગ આઉટપુટ */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500 animate-pulse">Aggregating live luxury stays for {toCity}...</p>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs font-bold text-slate-400 shadow-sm">
             No specific "{selectedCategory}" hotel found in Groq's response. Click "All Hotels" to see all options!
          </div>
        ) : (
          filteredHotels.map((hotel, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col md:flex-row gap-5 hover:shadow-md transition-all p-4"
            >
              <div className="relative w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                {hotel.tag && (
                  <span className={`absolute top-3 left-3 ${hotel.tagColor || "bg-indigo-600"} text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md tracking-wider shadow-sm uppercase`}>
                    {hotel.tag}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-800 tracking-tight">{hotel.name}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{hotel.type}</span>
                    </div>
                    
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + " " + hotel.location)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-600 font-extrabold hover:text-indigo-800 transition-colors flex items-center gap-1 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-xl shadow-sm hover:scale-105 active:scale-95"
                    >
                      🗺️ View on Map
                    </a>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 font-semibold">📍 {hotel.location}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <span className="text-amber-500">⭐</span>
                    <span>{hotel.rating || "4.5"}</span>
                    <span className="text-slate-300 font-normal">|</span>
                    <span className="text-slate-400 font-medium text-[11px]">{hotel.reviews || "200 reviews"}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.features && hotel.features.map((f, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-lg">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {hotel.aiPick && (
                  <div className="mt-3 bg-indigo-50/50 border border-indigo-100/30 p-2 rounded-xl flex items-center gap-2 max-w-fit">
                    <span className="text-sm">🤖</span>
                    <p className="text-[10px] text-indigo-600 font-bold">
                      AI Pick: This hotel matches your premium travel preference perfectly!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-slate-50 pt-3 md:pt-0 md:pl-5">
                <div className="text-right space-y-0.5">
                  <p className="text-xl font-black text-slate-800">{hotel.price}<span className="text-[10px] text-slate-400 font-bold"> / night</span></p>
                  <p className="text-[10px] text-slate-400 font-bold">{hotel.totalPrice || "Tax Included"}</p>
                </div>
                <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm">
                  View Details
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
