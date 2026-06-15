import React, { useState, useEffect } from "react";

export default function Hotels({ sharedData, liveData, isLoading }) {
  const [toCity, setToCity] = useState("Mumbai");
  const [stayDates, setStayDates] = useState("11/07/2026 - 5 Nights");
  const [selectedCategory, setSelectedCategory] = useState("All Hotels");
  const [hotelList, setHotelList] = useState([]);

  const imageUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    const currentDest = sharedData?.destination || toCity;
    if (sharedData?.destination) {
      setToCity(sharedData.destination);
    }

    // 🔥 FORCE DYNAMIC DATE LOGIC FOR HOTELS
    if (sharedData && (sharedData.date || sharedData.stayDates || sharedData.depDate || sharedData.departureDate)) {
      const userDate = sharedData.date || sharedData.stayDates || sharedData.depDate || sharedData.departureDate;
      if (!userDate.includes("-") && !userDate.includes("Nights")) {
        setStayDates(`${userDate} - 5 Nights`);
      } else {
        setStayDates(userDate);
      }
    }

    const imagesPool = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80"
    ];

    if (liveData && liveData.hotels && Array.isArray(liveData.hotels)) {
      const aiHotels = liveData.hotels.map((h, index) => {
        const perNightPrice = h.price_per_night_in_inr || h.price || "4500";
        return {
          name: h.hotel_name || h.name || "Premium AI Hotel",
          type: "Luxury",
          location: h.address || h.location || `Near Center, ${currentDest}`,
          rating: h.rating || "4.5",
          reviews: "500 reviews",
          price: `₹${perNightPrice}`,
          totalPrice: `₹${parseInt(perNightPrice)*5} (5 nights)`,
          features: ["Free Wi-Fi", "Room Service"],
          image: imagesPool[index % imagesPool.length]
        };
      });
      setHotelList(aiHotels.slice(0, 5));
    } else {
      setHotelList([
        { name: `The Taj Lands End ${currentDest}`, type: "Luxury", location: `Main Sea Face Road, ${currentDest}`, rating: "4.8", reviews: "1.5k reviews", price: "₹12,500", totalPrice: "₹62,500 (5 nights)", features: ["Free Wi-Fi", "Sea View"], image: imagesPool[0] },
        { name: `${currentDest} Ginger Premium Stay`, type: "Budget", location: `Near Airport Station, ${currentDest}`, rating: "4.3", reviews: "852 reviews", price: "₹3,400", totalPrice: "₹17,000 (5 nights)", features: ["Free Wi-Fi", "Breakfast"], image: imagesPool[1] },
        { name: `The Oberoi Center ${currentDest}`, type: "Luxury", location: `Business District, ${currentDest}`, rating: "4.7", reviews: "1.1k reviews", price: "₹14,200", totalPrice: "₹71,000 (5 nights)", features: ["Gym"], image: imagesPool[2] },
        { name: `The Radisson Blu Plaza ${currentDest}`, type: "Luxury", location: `VIP Hub, ${currentDest}`, rating: "4.6", reviews: "940 reviews", price: "₹7,800", totalPrice: "₹39,000 (5 nights)", features: ["Pool"], image: imagesPool[3] },
        { name: `${currentDest} Elite Boutique Lodge`, type: "Boutique", location: `Fashion Street Area, ${currentDest}`, rating: "4.5", reviews: "412 reviews", price: "₹5,100", totalPrice: "₹25,500 (5 nights)", features: ["Rooftop Cafe"], image: imagesPool[4] }
      ]);
    }
  }, [liveData, sharedData]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Where to?</span><p className="text-sm font-bold text-slate-800 pt-0.5">{toCity}</p></div>
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Dates</span><p className="text-sm font-bold text-indigo-600 pt-0.5">{stayDates}</p></div>
        <div className="border-r border-slate-100 px-2"><span className="text-[10px] font-bold text-slate-400 uppercase block">Guests</span><p className="text-sm font-bold text-slate-800 pt-0.5">1 Room, 2 Guests</p></div>
        <button className="bg-[#4f46e5] text-white font-bold text-xs py-3 rounded-xl opacity-50 cursor-not-allowed">Connected</button>
      </div>

      <div className="space-y-4">
        {hotelList.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col md:flex-row gap-5">
            <img src={hotel.image} alt={hotel.name} className="w-full md:w-64 h-48 object-cover rounded-xl" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">{hotel.name}</h3>
                <p className="text-[11px] text-slate-400">📍 {hotel.location}</p>
                <p className="text-xs font-bold text-slate-700">⭐ {hotel.rating} | {hotel.reviews}</p>
              </div>
              <div className="text-right md:text-left pt-4">
                <p className="text-xl font-black text-slate-800">{hotel.price}</p>
                <p className="text-[10px] text-slate-400 font-bold">{hotel.totalPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
