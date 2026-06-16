import React, { useState, useEffect } from "react";

export default function Hotels({ sharedData, liveData, isLoading, onSearchSubmit }) {
  const [toCity, setToCity] = useState("Mumbai");
  const [stayDates, setStayDates] = useState("");
  const [hotelList, setHotelList] = useState([]);

  // 🖼️ તારું હોટેલનું ઓરિજિનલ બેનર ઈમેજ
  const imageUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

  const capitalize = (str) => {
    if (!str) return "";
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  useEffect(() => {
    const rawDest = sharedData?.destination || "Mumbai";
    const formattedDest = capitalize(rawDest);
    setToCity(formattedDest);

    const incomingDate = sharedData?.date || sharedData?.stayDates || sharedData?.depDate || sharedData?.departureDate;
    if (incomingDate) {
      setStayDates(incomingDate);
    }

    // 🏨 અલગ અલગ પ્રીમિયમ હોટેલ ઈમેજીસ
    const imagesPool = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80"
    ];

    let baseHotels = [];
    // 🎯 જો Groq AI માંથી હોટેલ્સ આવે, તો એ બધી જ બતાવો (૩ થી ૪ કે વધારે)
    if (liveData && liveData.hotels && Array.isArray(liveData.hotels) && liveData.hotels.length > 0) {
      baseHotels = liveData.hotels.map((h, index) => ({
        name: h.hotel_name || h.name || "Premium AI Hotel",
        location: h.address || h.location || `Near Center, ${formattedDest}`,
        rating: h.rating || "4.5",
        price: h.price_per_night_in_inr || h.price || "4,500",
        image: imagesPool[index % imagesPool.length]
      }));
    } else {
      // ડિફોલ્ટ લિસ્ટમાં પણ આપણે ૪ શાનદાર હોટેલ્સ મૂકી દઈએ
      baseHotels = [
        { name: `The Taj Lands End ${formattedDest}`, location: `Main Hub Road, ${formattedDest}`, rating: "4.8", price: "12,500", image: imagesPool[0] },
        { name: `${formattedDest} Grand Hyatt Residency`, location: `Premium Luxury Enclave, ${formattedDest}`, rating: "4.7", price: "9,800", image: imagesPool[1] },
        { name: `Radisson Blu Smart Stay ${formattedDest}`, location: `Business District, ${formattedDest}`, rating: "4.5", price: "6,200", image: imagesPool[2] },
        { name: `${formattedDest} Ginger Premium Comfort`, location: `Near Transit Hub, ${formattedDest}`, rating: "4.2", price: "3,400", image: imagesPool[3] }
      ];
    }
    // 🎯 અહીંયા આપણે સ્લાઈસ (slice) મોટી કરી દીધી જેથી ૩-૪ હોટેલ્સ આરામથી દેખાય
    setHotelList(baseHotels.slice(0, 4));
  }, [liveData, sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (!toCity.trim()) return;
    if (onSearchSubmit) {
      onSearchSubmit({
        destination: toCity.trim(),
        date: stayDates || "24/06/2026",
        days: 3,
        budget: "Luxury Stay"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 🖼️ તારું ઓરિજિનલ મસ્ત હોટેલ બેનર (એમ જ રાખ્યું છે) */}
      <div className="relative h-[220px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-center text-white shadow-xl" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/20 to-transparent" />
        <h2 className="text-3xl font-black uppercase text-white relative z-10">Live Stays in <span className="text-cyan-200">{toCity}</span></h2>
      </div>

      {/* 🔍 સર્ચ ઇનપુટ ફોર્મ */}
      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-indigo-600 uppercase block">Where to?</span>
          <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Dates</span>
          <input type="text" value={stayDates} onChange={(e) => setStayDates(e.target.value)} className="text-sm font-bold text-indigo-600 bg-transparent focus:outline-none w-full mt-0.5" placeholder="e.g. 24/06/2026" />
        </div>
        <button type="submit" disabled={isLoading} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95">
          {isLoading ? "Searching Stays..." : "Search Hotels"}
        </button>
      </form>

      {/* 🏨 હોટેલ્સનું કાર્ડ લિસ્ટ (૩ થી ૪ કાર્ડ્સ દેખાશે) */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Aggregating live options for {toCity}...</p>
          </div>
        ) : (
          hotelList.map((hotel, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition-shadow">
              <img src={hotel.image} alt={hotel.name} className="w-full sm:w-48 h-36 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-800">{hotel.name}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-1">📍 {hotel.location}</p>
                  <p className="text-xs font-bold text-slate-700 mt-2">⭐ {hotel.rating} / 5.0 Rating</p>
                </div>
                <div className="flex justify-between items-end border-t border-slate-50 pt-2 mt-2">
                  <p className="text-base font-black text-slate-800">₹{hotel.price} <span className="text-[10px] text-slate-400 font-bold">/ night</span></p>
                  <button className="bg-[#4f46e5] text-white font-bold text-xs py-1.5 px-4 rounded-xl shadow-sm">Book Room</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
