import React from "react";

export default function Sidebar({ activePage, setActivePage }) {
  // બજેટ અને AI આસિસ્ટન્ટ સાથેનું એકદમ પ્રોફેશનલ અને કમ્પ્લીટ મેનૂ
  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Trip Planner", icon: "📅" },
    { name: "Flights", icon: "✈️" },
    { name: "Hotels", icon: "🏨" },
    { name: "Places", icon: "📍" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden lg:flex lg:w-72 lg:flex-col bg-white border-r border-slate-100 p-6 justify-between shadow-sm">
      <div className="space-y-8 w-full">
        
        {/* ૧. પ્રોજેક્ટ લોગો સેક્શન */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-200">
            AI
          </div>
          <div>
            <h1 className="text-base font-black text-slate-800 tracking-tight leading-none">AI Travel</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">Dashboard v1.0</span>
          </div>
        </div>

        {/* ૨. પ્રોફેશનલ નેવિગેશન લિંક્સ */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <span className={`text-lg ${isActive ? "scale-110" : "opacity-80"} transition-transform`}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ૩. યુઝર પ્રોફાઇલ સેક્શન (બોટમ) */}
      <div className="border-t border-slate-50 pt-4 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
            alt="User Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-black text-slate-800 leading-none">Vishwa</p>
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5 block">Premium Explorer</span>
        </div>
      </div>

    </aside>
  );
}
