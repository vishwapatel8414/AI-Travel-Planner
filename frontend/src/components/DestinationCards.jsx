import React from "react";

export default function DestinationCards() {
  // તમારી નવી ડિઝાઇન મુજબ ૪ પ્રીમિયમ લોકેશન્સનો ડેટા
  const destinations = [
    {
      name: "Bali, Indonesia",
      tagline: "Paradise of Beaches",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Switzerland",
      tagline: "Heaven on Earth",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dubai, UAE",
      tagline: "Luxury Redefined",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Goa, India",
      tagline: "Sun, Sand & Serenity",
      rating: "4.6",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="mt-8">
      {/* ટોપ હેડિંગ અને View All બટન */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Explore trending places loved by travelers
          </p>
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
          View All ➔
        </button>
      </div>

      {/* ગ્રીડ લેઆઉટ: ૧ લાઈનમાં પર્ફેક્ટ ૪ કાર્ડ્સ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group cursor-pointer"
          >
            {/* ઈમેજ સેક્શન રેટિંગ ઓવરલે સાથે */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* બ્લેક ગ્રેડિયન્ટ ઓવરલે જેથી નીચેનું લખાણ સરસ વંચાય */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* રેટિંગ બેજ (સ્ટાર રેટિંગ) */}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                <span className="text-amber-500 text-xs">⭐</span>
                <span className="text-[11px] font-bold text-slate-800">{dest.rating}</span>
              </div>

              {/* ઈમેજની અંદર દેખાતું લોકેશનનું નામ */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h4 className="font-bold text-base tracking-tight drop-shadow-sm">
                  {dest.name}
                </h4>
                <p className="text-[11px] text-slate-200 font-medium opacity-90 truncate">
                  {dest.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
