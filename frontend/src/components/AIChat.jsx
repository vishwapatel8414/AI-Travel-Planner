import React, { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { text: "Hello Vishwa! I am your Groq AI Travel Assistant. Where are we heading next?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 સિક્યોરિટી ફિક્સ: હવે કી સીધી .env ફાઇલમાંથી લોડ થશે, કોડ સેફ છે!
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setLoading(true);

    // 🚀 ૧૦૦% રિયલ ટ્રાવેલ ગાઇડ પ્રોમ્પ્ટ
    const prompt = `You are an expert AI Travel Assistant. Vishwa is planning a trip and asking: "${userMessage}".
    Give a highly practical, realistic, and direct travel answer. Recommend exact local food, best transportation options, and smart hidden gems.
    Keep the answer sweet, engaging, and under 3-4 professional lines. Do not use any markdown formatting or asterisks.`;

    try {
      // Groq API કનેક્શન લેટેસ્ટ Llama 3.1 મોડેલ સાથે
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a professional travel planner bot named Groq Assistant. You give direct, real text advice without formatting, summaries, or pleasantries."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 300
        })
      });

      const data = await response.json();
      
      if (response.ok && data.choices?.[0]?.message?.content) {
        const botReply = data.choices[0].message.content.trim();
        setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
      } else {
        throw new Error(data.error?.message || "Groq Server Refused");
      }
    } catch (error) {
      console.error("GROQ_CHAT_ERROR:", error);
      // જો અકસ્માતે પણ નેટવર્ક કે કી નો ઇશ્યુ થાય તો યુઝરને એરર નહિ, સ્માર્ટ રિયલ મેસેજ દેખાશે
      setMessages((prev) => [
        ...prev, 
        { text: "I'm having a bit of trouble reaching the grid, Vishwa. Could you try asking again? I'm ready to find the best spots for you!", isBot: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">🤖 Groq AI Assistant</h3>
      
      {/* મેસેજ વિન્ડો */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-none text-xs">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[85%] p-3 rounded-xl font-semibold leading-relaxed ${
              msg.isBot 
                ? "bg-slate-50 text-slate-700 border border-slate-100" 
                : "bg-indigo-600 text-white shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 text-slate-400 p-3 rounded-xl font-bold animate-pulse">
              Groq AI is typing...
            </div>
          </div>
        )}
      </div>

      {/* મેસેજ ઇનપુટ ફોર્મ */}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about tours..."
          className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
