import React, { useState } from "react";

export default function PlannerSidebar() {
  // પેકિંગ લિસ્ટનો ડેટા કેટેગરી સાથે
  const [items, setItems] = useState([
    { id: 1, text: "Passport & Visa Copies", category: "Essentials", checked: true },
    { id: 2, text: "Flight & Hotel Tickets", category: "Essentials", checked: true },
    { id: 3, text: "Universal Power Adapter", category: "Electronics", checked: false },
    { id: 4, text: "Power Bank & Chargers", category: "Electronics", checked: false },
    { id: 5, text: "Comfortable Walking Shoes", category: "Clothing", checked: false },
    { id: 6, text: "Light Jacket / Sweater", category: "Clothing", checked: false },
  ]);

  // ચેકબોક્સ ટોગલ કરવાનું લોજિક
  const handleToggle = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // પ્રોગ્રેસ પર્સન્ટેજ ગણવા માટેનું લોજિક
  const checkedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;
  const progressPercentage = Math.round((checkedCount / totalCount) * 100);

  // કેટેગરીઝ
  const categories = ["Essentials", "Electronics", "Clothing"];

  return (
    <div className="space-y-6">
      
      {/* ૧. બજેટ એસ્ટીમેશન વિજેટ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">💰 Estimated Cost</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Estimated Total</span>
            <span className="text-base font-black text-slate-800">₹45,000</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-[#4f46e5] rounded-full" />
          </div>
          <p className="text-[10px] text-slate-400 font-semibold text-center">
            💡 Tip: Booking flights 2 weeks early saves up to 15%.
          </p>
        </div>
      </div>

      {/* ૨. અલ્ટ્રા-પ્રોફેશનલ ડાયનેમિક પેકિંગ ચેકલિસ્ટ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        
        {/* હેડિંગ અને લાઈવ પ્રોગ્રેસ કાઉન્ટ */}
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">🧳 AI Packing Checklist</h3>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
            {progressPercentage}% Done
          </span>
        </div>

        {/* લાઈવ પ્રોગ્રેસ બાર */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* કેટેગરી વાઇઝ લિસ્ટ રેન્ડરિંગ */}
        <div className="space-y-4 pt-2">
          {categories.map((cat) => (
            <div key={cat} className="space-y-2">
              {/* કેટેગરી ટાઇટલ */}
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                {cat === "Essentials" ? "🪪 Essentials" : cat === "Electronics" ? "🔌 Electronics" : "👕 Clothing"}
              </span>

              {/* કેટેગરીની અંદરની આઇટમ્સ */}
              <div className="space-y-2">
                {items
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => handleToggle(item.id)}
                      className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer select-none p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={item.checked}
                        onChange={() => {}} // onClick થી હેન્ડલ થાય છે
                        className="rounded border-slate-300 text-[#4f46e5] focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer" 
                      />
                      <span className={item.checked ? "line-through text-slate-300 font-medium" : "text-slate-700"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
