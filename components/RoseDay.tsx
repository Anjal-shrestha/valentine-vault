"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Flower, ChevronRight, ChevronLeft, Fingerprint, Star } from "lucide-react";

export default function RoseDay({ user }: { user: any }) {
  const [step, setStep] = useState(1);
  const [daysCount, setDaysCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.startDate) {
        const start = new Date(user.startDate);
        const diff = Math.floor((new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setDaysCount(diff);
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [user]);

  const triggerHaptic = (pattern: number | number[] = 20) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      Array.isArray(pattern) ? navigator.vibrate(pattern) : navigator.vibrate(pattern);
    }
  };

  const startHold = (e: any) => {
    e.preventDefault();
    setIsHolding(true);
    triggerHaptic(30);
    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) clearInterval(progressInterval.current!);
    }, 28);
    holdTimer.current = setTimeout(() => {
      triggerHaptic([50, 30, 50]);
      setStep(6);
    }, 2800);
  };

  const stopHold = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const RoseSVG = ({ size = "w-40 h-40" }: { size?: string }) => (
    <svg className={`${size} mx-auto my-2 drop-shadow-[0_12px_24px_rgba(193,18,31,0.4)]`} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="outerPetalGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff1b6b" />
          <stop offset="50%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#c1121f" />
        </radialGradient>
        <radialGradient id="middlePetalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="70%" stopColor="#ff1b6b" />
          <stop offset="100%" stopColor="#800f2f" />
        </radialGradient>
        <radialGradient id="innerPetalGrad" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#ff758f" />
          <stop offset="100%" stopColor="#ff4d6d" />
        </radialGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1b4332" />
          <stop offset="100%" stopColor="#2d6a4f" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1b4332" />
          <stop offset="100%" stopColor="#0d3b2a" />
        </linearGradient>
        <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
          <feOffset dx="0" dy="0.8" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#outerPetalGrad)" opacity="0.08" />
      <path d="M50 95 C53 70 47 55 50 35 C53 25 55 20 55 15" fill="none" stroke="url(#stemGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      <path d="M48 70 Q35 65 38 52 Q45 58 48 70" fill="url(#leafGrad)" opacity="0.85" filter="url(#petalShadow)" />
      <path d="M52 65 Q65 60 62 48 Q55 54 52 65" fill="url(#leafGrad)" opacity="0.85" filter="url(#petalShadow)" />
      {!shouldReduceMotion && (
        <motion.g animate={{ scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M50 50 C25 50 20 15 50 10 C80 15 75 50 50 50" fill="url(#outerPetalGrad)" opacity="0.92" filter="url(#petalShadow)" />
          <path d="M50 45 C20 45 15 25 30 15 C40 10 45 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" filter="url(#petalShadow)" />
          <path d="M50 45 C80 45 85 25 70 15 C60 10 55 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" filter="url(#petalShadow)" />
          <path d="M50 40 C30 40 25 25 35 20 C42 18 45 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" filter="url(#petalShadow)" />
          <path d="M50 40 C70 40 75 25 65 20 C58 18 55 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" filter="url(#petalShadow)" />
          <path d="M50 35 C40 35 35 22 50 18 C65 22 60 35 50 35" fill="url(#innerPetalGrad)" opacity="0.96" filter="url(#petalShadow)" />
          <path d="M50 32 C45 32 42 24 50 20 C58 24 55 32 50 32" fill="#ff9eaa" opacity="0.98" filter="url(#petalShadow)" />
          <circle cx="50" cy="25" r="3" fill="#fff5f6" opacity="0.75" /><circle cx="50" cy="25" r="1.5" fill="#ff4d6d" opacity="0.85" />
        </motion.g>
      )}
    </svg>
  );

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-dvh w-full max-w-sm mx-auto p-4">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-20 h-20 bg-linear-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"><Heart className="text-white fill-white w-10 h-10" /></motion.div>
      <p className="mt-6 text-rose-300 font-bold tracking-widest animate-pulse uppercase text-xs">Growing your rose...</p>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center h-dvh w-full bg-linear-to-br from-[#fff5f6] via-[#fed7e2] to-[#fef3c7]/20 p-4 overflow-hidden select-none">
      
      {/* 1. FLOATING NAVIGATION */}
      {step < 6 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.reload()}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-rose-100 text-rose-500 font-black text-[10px] uppercase tracking-widest shadow-sm transition-all"
        >
          <ChevronLeft size={12} strokeWidth={3} /> Journey
        </motion.button>
      )}

      {/* 2. BACKGROUND DECORATIONS - Fixed positions */}
      <div className="absolute top-10 right-4 text-rose-200/40 rotate-12 pointer-events-none"><Flower size={32} /></div>
      <div className="absolute bottom-10 left-4 text-amber-200/30 -rotate-12 pointer-events-none"><Star size={24} fill="currentColor" /></div>

      <AnimatePresence mode="wait">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={() => { triggerHaptic(15); setStep(2); }} className="relative bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-rose-100/50 w-full max-w-sm text-center cursor-pointer">
            <div className="inline-block px-4 py-1.5 rounded-full bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-600 font-black text-[10px] mb-6 uppercase tracking-[0.2em]">🌹 February 7, 2026</div>
            <h1 className="font-serif text-3xl font-bold text-rose-950 mb-4 leading-tight">My Dearest <br/><span className="text-rose-600">{user.name}</span></h1>
            <p className="text-gray-600 leading-relaxed mb-8 font-medium text-base italic">"Today the world gives roses, but I'm giving you my heart—"</p>
            <div className="flex items-center justify-center gap-2 text-rose-400 font-black uppercase text-[10px] tracking-widest">
              <span>Accept my gift</span> <ChevronRight size={14} strokeWidth={3} />
            </div>
          </motion.div>
        )}

        {/* Step 2: The First Rose SVG */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} onClick={() => { triggerHaptic(15); setStep(3); }} className="relative bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border border-rose-100/50 w-full max-w-sm text-center cursor-pointer">
            <RoseSVG size="w-36 h-36" />
            <h2 className="text-xl font-serif text-rose-900 mb-4 font-bold tracking-tight">For You, My Love</h2>
            <p className="text-gray-700 italic leading-relaxed font-medium text-base px-2">"This rose isn't just for Rose Day. It's for every morning I woke up grateful it's you."</p>
            <div className="mt-8 animate-bounce text-rose-300"><ChevronRight size={24} className="mx-auto" /></div>
          </motion.div>
        )}

        {/* Step 3: Days and Image */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={() => { triggerHaptic(15); setStep(4); }} className="relative bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border border-rose-100/50 w-full max-w-sm text-center cursor-pointer">
            {user?.image ? (
              <div className="relative w-28 h-28 mx-auto mb-4 p-1 rounded-full bg-linear-to-tr from-rose-400 to-pink-300 shadow-xl">
                <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full border-2 border-white" />
                <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md"><Heart size={14} className="text-rose-500 fill-rose-500" /></div>
              </div>
            ) : (
              <RoseSVG size="w-28 h-28" />
            )}
            <p className="text-gray-600 mb-6 font-serif text-lg italic leading-relaxed">"You turned ordinary days into pure magic..."</p>
            <div className="relative inline-block mb-4">
               <div className="relative bg-linear-to-br from-white to-rose-50 border-2 border-rose-200 px-8 py-3 rounded-full font-black text-rose-700 shadow-lg text-2xl tracking-tighter">
                 {daysCount} <span className="text-xs font-bold ml-1 opacity-50 uppercase tracking-widest text-rose-400">Days</span>
               </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Promise */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} onClick={() => { triggerHaptic(15); setStep(5); }} className="relative bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-rose-100/50 w-full max-w-sm text-center cursor-pointer">
            <Sparkles className="text-amber-400 mx-auto mb-4" size={28} />
            <h1 className="font-serif text-3xl text-rose-950 mb-4 font-bold tracking-tight">Our Promise</h1>
            <p className="text-gray-700 font-medium italic text-lg leading-relaxed mb-6">"Not just roses on Rose Day, but my love on every single day."</p>
            <p className="text-rose-900 font-bold text-base">Through storms and sunshine — <br/><span className="text-rose-600 text-xl">I choose you.</span></p>
            <div className="mt-8 flex items-center justify-center gap-2 text-rose-400 font-black uppercase text-[10px] tracking-widest">
              <span>Next</span> <ChevronRight size={14} strokeWidth={3} />
            </div>
          </motion.div>
        )}

        {/* Step 5: The Interactive Hold */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full max-w-sm flex flex-col items-center justify-center h-full max-h-[500px]">
            <div className="relative group touch-none mb-12" onMouseDown={startHold} onMouseUp={stopHold} onTouchStart={startHold} onTouchEnd={stopHold}>
              <div className={`transition-all duration-1000 ${isHolding ? 'scale-105' : 'scale-100'} filter ${isHolding ? 'drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]' : ''}`}>
                <RoseSVG size="w-48 h-48 sm:w-56 sm:h-56" />
              </div>
              
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-110">
                <circle cx="50%" cy="50%" r="46%" stroke="rgba(244,63,94,0.05)" strokeWidth="3" fill="none" />
                {isHolding && (
                  <motion.circle cx="50%" cy="50%" r="46%" stroke="#f43f5e" strokeWidth="3" fill="none" 
                    strokeDasharray="290" strokeDashoffset={290 - (progress * 2.9)} strokeLinecap="round" />
                )}
              </svg>

              <AnimatePresence>
                {!isHolding && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
                    <div className="bg-white p-3 rounded-full shadow-lg border border-rose-100 animate-pulse">
                      <Fingerprint className="text-rose-500 w-8 h-8" />
                    </div>
                    <span className="mt-3 text-[9px] font-black text-rose-900 uppercase tracking-[0.3em]">Hold the Rose</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {isHolding && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-4 text-rose-600 font-black text-xs uppercase tracking-widest">{progress}% Connection</motion.p>}
          </motion.div>
        )}

        {/* Step 6: Final Message */}
        {step === 6 && (
          <motion.div key="s6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[3rem] shadow-2xl border border-rose-100 w-full max-w-sm text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-xl border border-rose-100">
               <Heart size={32} className="text-rose-500 fill-rose-500" />
            </div>
            <h2 className="text-rose-950 font-serif text-2xl font-bold mt-4 mb-6 tracking-tight tracking-tight">The Secret Truth</h2>
            <p className="text-rose-800 font-serif text-lg italic mb-8 leading-relaxed font-bold px-2">
              "You are the first thought in my morning and the last whisper in my night. Always."
            </p>
            <div className="font-serif text-3xl text-rose-950 font-black tracking-tighter uppercase leading-none">Forever Yours</div>
            <div className="font-serif text-xl text-rose-600 font-semibold mt-2">— {user.partnerName} ❤️</div>
            <div className="mt-6 p-4 bg-linear-to-br from-rose-50 to-amber-50 rounded-[1.5rem] border-l-4 border-rose-400 text-left text-[10px] italic text-rose-900">
               Every petal represents a memory. The journey has just begun... <br/><br/>
               <span className="text-rose-600 font-black uppercase tracking-widest">See you tomorrow, love.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}