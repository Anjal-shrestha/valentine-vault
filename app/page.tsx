"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { Heart, Sparkles, Delete, Moon } from "lucide-react";
import { usersData } from "@/data/users";

const FloatingMemories = () => {
  const [elements, setElements] = useState<any[]>([]);
  useEffect(() => {
    setElements(Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 5,
      duration: Math.random() * 12 + 10,
      startX: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", x: el.startX, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
          className="absolute text-rose-300"
        >
          <Heart size={el.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default function ValentineJourneyEntry() {
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const controls = useAnimation();



  const triggerHaptic = (p: number | number[] = 15) => {
    if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(p);
  };

  const handleKeyPress = (num: string) => {
    if (pin.length >= 4) return;
    const newPin = [...pin, num];
    setPin(newPin);
    triggerHaptic(15);
    if (newPin.length === 4) verifyPin(newPin.join(""));
  };

  const verifyPin = (enteredPin: string) => {
    const userSlug = Object.keys(usersData).find(s => usersData[s].pin === enteredPin);
    if (userSlug) {
      triggerHaptic([50, 30, 50]);
      setTimeout(() => router.push(`/${userSlug}`), 500);
    } else {
      setError(true);
      triggerHaptic([40, 20, 40, 20, 60]);
      controls.start({ x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } });
      setTimeout(() => { setPin([]); setError(false); }, 1000);
    }
  };

  return (
    <main className="relative h-dvh w-full flex flex-col items-center justify-between bg-linear-to-b from-[#fff5f6] to-[#fee2e2] p-6 overflow-hidden">
      <FloatingMemories />
      
      {/* Narrative Header */}
      <div className="flex flex-col items-center mt-10 z-10 w-full text-center">
        <motion.div 
          animate={controls}
          className="w-24 h-24 bg-linear-to-tr from-rose-500 to-pink-400 rounded-full flex items-center justify-center shadow-2xl shadow-rose-200 border-4 border-white/50 mb-8"
        >
          <Heart className="text-white fill-white w-10 h-10 animate-pulse" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-serif text-gray-800 tracking-tight">
            A Journey of <span className="text-rose-600">Us</span>
          </h1>
        
        </motion.div>

        {/* The Key Indicators */}
        <div className="flex gap-5 mt-10 p-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 shadow-inner">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: pin.length > i ? 1.3 : 1,
                backgroundColor: pin.length > i ? (error ? "#f87171" : "#e11d48") : "#fce7f3",
                boxShadow: pin.length > i ? `0 0 15px ${error ? "#f87171" : "#fb7185"}` : "none"
              }}
              className="w-4 h-4 rounded-full border border-rose-100/50"
            />
          ))}
        </div>
      </div>

      {/* Love-Shape Circular Keypad */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-70 z-10 mb-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "✨", 0, "⌫"].map((key, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              if (key === "⌫") { setPin(pin.slice(0, -1)); triggerHaptic(10); }
              else if (key !== "✨") handleKeyPress(key.toString());
            }}
            className={`aspect-square flex items-center justify-center rounded-full text-2xl font-bold transition-all shadow-sm
              ${key === "✨" ? "bg-transparent text-amber-300" : 
                key === "⌫" ? "bg-rose-100/50 text-rose-500" : "bg-white/80 text-gray-700 border border-white hover:bg-rose-50"}`}
          >
            {key === "✨" ? <Sparkles size={24} className="animate-spin-slow" /> : key === "⌫" ? <Delete size={24} /> : key}
          </motion.button>
        ))}
      </div>

      <footer className="z-10 text-center pb-8 opacity-70">
        <p className="text-[10px] tracking-[0.3em] font-bold text-rose-400 uppercase">
          Handcrafted by Anjal
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] text-gray-500 font-medium">
          <Moon size={10} /> <span>Where Forever Begins</span> <Moon size={10} />
        </div>
      </footer>
    </main>
  );
}