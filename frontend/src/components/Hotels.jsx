import React, { useState, useEffect } from "react";

export default function Hotels({ sharedData, liveData, isLoading, onSearchSubmit }) {
  const [toCity, setToCity] = useState("Mumbai");
  const [stayDates, setStayDates] = useState("24/06/2026");

  useEffect(() => {
    if (sharedData?.destination) setToCity(sharedData.destination);
    if (sharedData?.date) setStayDates(sharedData.date);
  }, [sharedData]);

  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ destination: toCity, date: stayDates });
    }
  };

  const imagesPool = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
  ];

  // 🎯 સેફ પ્રોટેક્શન: હોટેલ એરે પ્રોપર ચેક થશે
  const displayHotels = liveData && Array.isArray(liveData.hotels) ? liveData.hotels : [
    { hotel_name: `The Oberoi ${toCity}`, address: "Worli, Sea Face Enclave", rating: "5.0", price_per_night_in_inr: "25000" },
    { hotel_name: `Grand Hyatt Luxury Stay`, address: "BKC Business Hub", rating: "4.8", price_per_night_in_inr: "14500" },
    { hotel_name: `Taj Lands End Resort`, address: "Bandora Bandstand", rating: "4.9", price_per_night_in_inr: "21000" }
  ];

  return (
    <div className="space-y-6">
      <div className="relative h-[220px] w-full rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-center text-white shadow-xl" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/20 to-transparent" />
        <h2 className="text-3xl font-black uppercase text-white relative z-10">Live Stays in <span className="text-cyan-200">{toCity}</span></h2>
      </div>

      <form onSubmit={handleLocalSearch} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-indigo-600 uppercase block">Where to?</span>
          <input type="text" value={toCity} onChange={(e) => setToCity(e.target.value)} className="text-sm font-bold text-slate-800 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <div className="px-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Dates</span>
          <input type="text" value={stayDates} onChange={(e) => setStayDates(e.target.value)} className="text-sm font-bold text-indigo-600 bg-transparent focus:outline-none w-full mt-0.5" />
        </div>
        <button type="submit" className="bg-[#4f46e5] text-white font-bold text-xs py-3 rounded-xl shadow-md">Search Hotels</button>
      </form>

      <div className="space-y-4">
        {displayHotels.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-5 shadow-sm">
            <img src={imagesPool[idx % imagesPool.length]} alt="hotel" className="w-full sm:w-48 h-36 object-cover rounded-xl" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-black text-slate-800">{hotel.hotel_name || "Hotel Name"}</h3>
                <p className="text-[11px] text-slate-400 font-semibold">📍 {hotel.address || "Address"}</p>
                <p className="text-xs font-bold text-slate-700 mt-1">⭐ {hotel.rating || "4.5"} / 5.0 Rating</p>
              </div>
              <div className="flex justify-between items-end border-t border-slate-50 pt-2 mt-2">
                <p className="text-base font-black text-slate-800">₹{hotel.price_per_night_in_inr || hotel.price || "5000"} <span className="text-[10px] text-slate-400 font-bold">/ night</span></p>
                {/* 🎯 સેફ ક્લિક બટન */}
                <button type="button" onClick={() => alert(`Booking ${hotel.hotel_name || 'Hotel'}`)} className="bg-[#4f46e5] text-white font-bold text-xs py-1.5 px-4 rounded-xl shadow-sm">Book Room</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
