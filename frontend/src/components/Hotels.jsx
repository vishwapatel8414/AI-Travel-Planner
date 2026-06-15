import React, { useState, useEffect } from "react";

export default function Hotels({ sharedData, liveData, isLoading }) {
  const [toCity, setToCity] = useState("Mumbai");
  const [stayDates, setStayDates] = useState("11/07/2026");
  const [selectedCategory, setSelectedCategory] = useState("All Hotels");
  const [hotelList, setHotelList] = useState([]);

  const imageUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

  const [categories] = useState([
    { label: "All Hotels", count: "Stays Found", icon: "🏨" },
    { label: "Luxury", count: "Premium", icon: "👑" },
    { label: "Budget", count: "Value Saver", icon: "💰" },
    { label: "Resorts", count: "Relaxing", icon: "🌴" },
    { label: "Boutique", count: "Trendy", icon: "🏢" },
  ]);

  useEffect(() => {
    const currentDest = sharedData?.destination || toCity;
    if (sharedData?.destination) {
      setToCity(sharedData.destination);
    }

    const incomingDate = sharedData?.date || sharedData?.stayDates || sharedData?.depDate || sharedData?.departureDate;
    if (incomingDate) {
      setStayDates(incomingDate);
    }

    const imagesPool = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80"
    ];

    let baseHotels = [];
    
    if (liveData && liveData.hotels && Array.isArray(liveData.hotels) && liveData.hotels.length > 0) {
      baseHotels = liveData.hotels.map((h, index) => {
        const perNightPrice = h.price_per_night_in_inr || h.price || "4500";
        return {
          name: h.hotel_name || h.name || "Premium AI Hotel",
          type: index % 2 === 0 ? "Luxury" : "Budget",
          location: h.address || h.location || `Near Center, ${currentDest}`,
          rating: h.rating || "4.5",
          reviews: "540 reviews",
          price: perNightPrice.toString().startsWith("₹") ? perNightPrice : `₹${perNightPrice}`,
          totalPrice: `₹${parseInt(perNightPrice.toString().replace(/[^0-9]/g, "")) * 5} (5 Nights)`,
          features: ["Free Wi-Fi", "Room Service", "Breakfast Included"],
          image: imagesPool[index % imagesPool.length]
        };
      });
    }

    if (baseHotels.length < 5) {
      const backupData = [
        { name: `The Taj Lands End ${currentDest}`, type: "Luxury", location: `Main Hub Road, ${currentDest}`, rating: "4.8", reviews: "1.5k reviews", price: "₹12,500", totalPrice: "₹62,500 (5 Nights)", features: ["Free Wi-Fi", "Pool", "Spa"], image: imagesPool[0] },
        { name: `${currentDest} Ginger Premium Stay`, type: "Budget", location: `Near Airport Station, ${currentDest}`, rating: "4.3", reviews: "852 reviews", price: "₹3,400", totalPrice: "₹17,000 (5 Nights)", features: ["Free Wi-Fi", "Breakfast"], image: imagesPool[1] },
        { name: `The Oberoi Center ${currentDest}`, type: "Luxury", location: `Business District, ${currentDest}`, rating: "4.7", reviews: "1.1k reviews", price: "₹14,200", totalPrice: "₹71,000 (5 Nights)", features: ["Gym", "Fine Dining"], image: imagesPool[2] },
        { name: `The Radisson Blu Plaza ${currentDest}`, type: "Luxury", location: `VIP Hub, ${currentDest}`, rating: "4.6", reviews: "940 reviews", price: "₹7,800", totalPrice: "₹39,000 (5 Nights)", features: ["Pool", "Bar Lounge"], image: imagesPool[3] },
        { name: `${currentDest} Elite Boutique Lodge`, type: "Boutique", location: `Fashion Street Area, ${currentDest}`, rating: "4.5", reviews: "412 reviews", price: "₹5,100", totalPrice: "₹25,500 (5 Nights)", features: ["Rooftop Cafe", "Room Service"], image: imagesPool[4] }
      ];

      while (baseHotels.length < 5) {
        baseHotels.push(backupData[baseHotels.length]);
      }
    }

    setHotelList(baseHotels.slice(0, 5));
  }, [liveData, sharedData]);

  const filteredHotels = hotelList.filter((hotel) => {
    if (selectedCategory === "All Hotels") return true;
    return hotel.type?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="relative h-[220px] md:h-[260px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 md:p-12 flex flex-col justify-center text-white shadow-xl" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/20 to-transparent" />
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">Your Perfect <br /><span className="text-cyan-200">Stay Is Waiting</span></h2>
          <p className="text-xs md:text-sm font-bold text-slate-200 tracking-wide uppercase opacity-90">Handpicked premium hotels & hospitality optimized by Groq Llama 3.1</p>
        </div>
      </div>

      {/* 🚀 Active Search Button Fix */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Where to?</span><p className="text-sm font-bold text-slate-800 pt-0.5">{toCity}</p></div>
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Dates</span><p className="text-sm font-bold text-indigo-600 pt-0.5">{stayDates}</p></div>
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Guests</span><p className="text-sm font-bold text-slate-800 pt-0.5">1 Room, 2 Guests</p></div>
        <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
          Search Hotels
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, idx) => (
          <div key={idx} onClick={() => setSelectedCategory(cat.label)} className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer min-w-[140px] transition-all ${selectedCategory === cat.label ? "bg-indigo-50/50 border-indigo-200 text-indigo-600 font-bold scale-[1.02]" : "bg-white border-slate-100 text-slate-700"}`}>
            <span className="text-xl">{cat.icon}</span>
            <div><p className="text-xs font-bold leading-tight">{cat.label}</p></div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-xs font-bold text-slate-500 animate-pulse">Aggregating stays for {toCity}...</p></div>
        ) : (
          filteredHotels.map((hotel, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col md:flex-row gap-5 hover:shadow-md transition-all p-4">
              <img src={hotel.image} alt={hotel.name} className="w-full md:w-64 h-48 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-black text-slate-800">{hotel.name}</h3>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + " " + hotel.location)}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-600 font-extrabold flex items-center gap-1 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-xl shadow-sm">🗺️ View Map</a>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold">📍 {hotel.location}</p>
                  <p className="text-xs font-bold text-slate-700">⭐ {hotel.rating} | {hotel.reviews}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">{hotel.features.map((f, i) => <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-lg">{f}</span>)}</div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-slate-50 pt-3 md:pt-0 md:pl-5">
                <div className="text-right"><p className="text-xl font-black text-slate-800">{hotel.price}<span className="text-[10px] text-slate-400 font-bold"> / night</span></p><p className="text-[10px] text-slate-400 font-bold">{hotel.totalPrice}</p></div>
                <button className="w-full bg-[#4f46e5] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
