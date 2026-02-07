"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { Heart, Lock, Sparkles, Star, Flower, Delete } from "lucide-react";
import { usersData } from "@/data/users";

// Optimized Romantic particle system
const RomanticParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    duration: Math.random() * 10 + 10,
    startX: `${Math.random() * 100}%`,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", x: p.startX, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <Heart size={p.size} className="text-rose-200 fill-current" />
        </motion.div>
      ))}
    </div>
  );
};

export default function RomanticVaultEntry() {
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const controls = useAnimation();

 // This update allows both single vibrations and patterns
const triggerHaptic = (p: number | number[] = 15) => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(p);
  }
};

  const handleKeyPress = (num: string) => {
    if (pin.length >= 4) return;
    const newPin = [...pin, num];
    setPin(newPin);
    triggerHaptic(15);
    controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.2 } });
    if (newPin.length === 4) verifyPin(newPin.join(""));
  };

  const verifyPin = (enteredPin: string) => {
    const userSlug = Object.keys(usersData).find(s => usersData[s].pin === enteredPin);
    if (userSlug) {
      triggerHaptic([50, 30, 50]);
      controls.start({ scale: [1, 1.3, 1], transition: { duration: 0.4 } });
      setTimeout(() => router.push(`/${userSlug}`), 600);
    } else {
      setError(true);
      triggerHaptic([30, 20, 30]);
      controls.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      setTimeout(() => { setPin([]); setError(false); }, 800);
    }
  };

  return (
    <main className="relative h-[100dvh] w-full flex flex-col items-center justify-between bg-gradient-to-b from-rose-50 to-amber-50/20 p-4 overflow-hidden">
      <RomanticParticles />
      
      {/* Top Section */}
      <div className="flex flex-col items-center mt-6 z-10 w-full">
        <motion.div animate={controls} className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 border-4 border-white/20">
            <Heart className="text-white fill-white w-9 h-9" />
          </div>
        </motion.div>

        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-gray-800 font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
            Our Valentine Vault
          </h1>
          <p className="text-xs text-rose-400 font-medium italic flex items-center justify-center gap-1 mt-1">
            <Sparkles size={12} /> Where every moment blooms <Sparkles size={12} />
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex gap-4 mt-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: pin.length > i ? 1.2 : 1,
                backgroundColor: pin.length > i ? (error ? "#ef4444" : "#f43f5e") : "#fee2e2",
                boxShadow: pin.length > i ? `0 0 10px ${error ? "#ef4444" : "#f43f5e"}` : "none"
              }}
              className="w-3.5 h-3.5 rounded-full border border-rose-200"
            />
          ))}
        </div>
      </div>

      {/* Responsive Keypad Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] z-10 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "❤️", 0, "⌫"].map((key, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (key === "⌫") { setPin(pin.slice(0, -1)); triggerHaptic(10); }
              else if (key !== "❤️") handleKeyPress(key.toString());
            }}
            className={`aspect-square flex items-center justify-center rounded-2xl text-xl font-bold shadow-sm transition-colors
              ${key === "❤️" ? "bg-transparent text-rose-300 animate-pulse" : 
                key === "⌫" ? "bg-rose-100/50 text-rose-500" : "bg-white/90 text-gray-700 border border-white"}`}
          >
            {key === "❤️" ? <Heart size={24} fill="currentColor" /> : key === "⌫" ? <Delete size={20} /> : key}
          </motion.button>
        ))}
      </div>

      {/* Compact Footer */}
      <footer className="z-10 text-center pb-4 w-full">
        <div className="flex items-center justify-center gap-1 text-rose-400/80 text-[10px] font-bold uppercase tracking-widest">
          <Lock size={12} /> <span>Locked with love for {new Date().getFullYear()}</span>
        </div>
        <p className="text-[9px] text-rose-300 italic mt-1 font-serif">Designed By ANJAL with LOVE</p>
      </footer>
    </main>
  );
}