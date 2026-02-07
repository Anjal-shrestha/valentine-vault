"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Flower, ChevronRight } from "lucide-react";

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
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      if (user?.startDate) {
        const start = new Date(user.startDate);
        const diff = Math.floor((new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setDaysCount(diff);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  // Haptic feedback helper
  const triggerHaptic = (pattern: number | number[] = 20) => {
    if (navigator.vibrate) {
      Array.isArray(pattern) ? navigator.vibrate(pattern) : navigator.vibrate(pattern);
    }
  };

  const startHold = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHolding(true);
    triggerHaptic(30);
    
    // Start progress animation
    let currentProgress = 0;
    const increment = 100 / 28;
    
    progressInterval.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval.current!);
      }
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

  // Optimized Realistic Rose for Mobile
  const RoseSVG = ({ size = "w-40 h-40" }: { size?: string }) => (
    <svg className={`${size} mx-auto my-4 drop-shadow-[0_8px_16px_rgba(193,18,31,0.35)]`} viewBox="0 0 100 100">
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
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="50" cy="50" r="48" fill="url(#outerPetalGrad)" opacity="0.08" />
      <path d="M50 95 C53 70 47 55 50 35 C53 25 55 20 55 15" fill="none" stroke="url(#stemGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      <path d="M48 70 Q35 65 38 52 Q45 58 48 70" fill="url(#leafGrad)" opacity="0.85" filter="url(#petalShadow)" />
      <path d="M52 65 Q65 60 62 48 Q55 54 52 65" fill="url(#leafGrad)" opacity="0.85" filter="url(#petalShadow)" />

      {!shouldReduceMotion && (
        <motion.g
          animate={{ scale: [1, 1.03, 1], rotate: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M50 50 C25 50 20 15 50 10 C80 15 75 50 50 50" fill="url(#outerPetalGrad)" opacity="0.92" filter="url(#petalShadow)" />
          <path d="M50 45 C20 45 15 25 30 15 C40 10 45 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" filter="url(#petalShadow)" />
          <path d="M50 45 C80 45 85 25 70 15 C60 10 55 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" filter="url(#petalShadow)" />
          <path d="M50 40 C30 40 25 25 35 20 C42 18 45 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" filter="url(#petalShadow)" />
          <path d="M50 40 C70 40 75 25 65 20 C58 18 55 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" filter="url(#petalShadow)" />
          <path d="M50 35 C40 35 35 22 50 18 C65 22 60 35 50 35" fill="url(#innerPetalGrad)" opacity="0.96" filter="url(#petalShadow)" />
          <path d="M50 32 C45 32 42 24 50 20 C58 24 55 32 50 32" fill="#ff9eaa" opacity="0.98" filter="url(#petalShadow)" />
          <circle cx="50" cy="25" r="3" fill="#fff5f6" opacity="0.75" />
          <circle cx="50" cy="25" r="1.5" fill="#ff4d6d" opacity="0.85" />
        </motion.g>
      )}
      
      {shouldReduceMotion && (
        <>
          <path d="M50 50 C25 50 20 15 50 10 C80 15 75 50 50 50" fill="url(#outerPetalGrad)" opacity="0.92" />
          <path d="M50 45 C20 45 15 25 30 15 C40 10 45 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" />
          <path d="M50 45 C80 45 85 25 70 15 C60 10 55 15 50 25" fill="url(#outerPetalGrad)" opacity="0.88" />
          <path d="M50 40 C30 40 25 25 35 20 C42 18 45 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" />
          <path d="M50 40 C70 40 75 25 65 20 C58 18 55 22 50 30" fill="url(#middlePetalGrad)" opacity="0.93" />
          <path d="M50 35 C40 35 35 22 50 18 C65 22 60 35 50 35" fill="url(#innerPetalGrad)" opacity="0.96" />
          <path d="M50 32 C45 32 42 24 50 20 C58 24 55 32 50 32" fill="#ff9eaa" opacity="0.98" />
          <circle cx="50" cy="25" r="3" fill="#fff5f6" opacity="0.75" />
          <circle cx="50" cy="25" r="1.5" fill="#ff4d6d" opacity="0.85" />
        </>
      )}
    </svg>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-sm mx-auto p-4">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <Heart className="text-white fill-white w-12 h-12" />
          </div>
          <div className="absolute inset-0 animate-ping rounded-full bg-rose-300 opacity-30" />
        </div>
        <p className="mt-6 text-gray-500 text-sm">Preparing your rose...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/20 p-4 pt-6 pb-8 overflow-x-hidden">
      {/* Floating decorative elements - optimized for mobile */}
      <div className="absolute top-6 left-4 animate-float-slow">
        <Sparkles className="text-amber-300" size={20} />
      </div>
      <div className="absolute bottom-12 right-4 animate-float animation-delay-1000">
        <Flower className="text-rose-200" size={24} />
      </div>
      <div className="absolute top-1/3 right-4 animate-float animation-delay-2000">
        <Heart className="text-pink-200 fill-current" size={16} />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="s1" 
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => {
              triggerHaptic(15);
              setStep(2);
            }} 
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full cursor-pointer touch-pan-y"
          >
            <div className="absolute top-3 right-3 text-rose-200">
              <Flower size={14} />
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 text-rose-700 font-bold text-xs mb-4 uppercase tracking-wider shadow-sm">
                🌹 Rose Day • Feb 7, 2026
              </div>
              <h1 className="font-serif text-3xl font-bold text-rose-900 mb-4 tracking-tight leading-tight">
                My Dearest {user.name}
              </h1>
              <p className="text-gray-700 leading-relaxed mb-3 text-base">
                Today the world gives roses, but I'm giving you my heart—
              </p>
              <p className="text-gray-700 text-base">
                just like I have for <span className="font-bold text-rose-600">{daysCount} beautiful days</span> with you.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-rose-400 font-medium">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  <Heart size={12} className="text-rose-400" />
                </motion.div>
                <span>Tap to receive my rose</span>
                <ChevronRight size={16} className="text-rose-300" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="s2" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => {
              triggerHaptic(15);
              setStep(3);
            }} 
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full cursor-pointer touch-pan-y"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 to-pink-50/10 rounded-2xl" />
            
            <div className="relative z-10">
              <RoseSVG size="w-36 h-36" />
              <h2 className="text-2xl font-serif text-rose-800 mb-3 font-bold">
                {user.name},
              </h2>
              <p className="text-gray-700 italic text-base leading-relaxed">
                This rose isn't just for Rose Day. It's for every morning I woke up grateful it's you.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-rose-400 font-medium">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>
                  <Heart size={12} className="text-rose-400" />
                </motion.div>
                <span>Tap gently</span>
                <ChevronRight size={16} className="text-rose-300" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="s3" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => {
              triggerHaptic(15);
              setStep(4);
            }} 
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full cursor-pointer touch-pan-y"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/20 to-amber-50/10 rounded-2xl" />
            
            <div className="relative z-10">
              <RoseSVG size="w-36 h-36" />
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Time flies when I'm with you... you turned ordinary days into pure magic.
              </p>
              
              <div className="relative inline-block my-4">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-pink-300 blur-md opacity-30 rounded-full animate-pulse-slow" />
                <div className="relative bg-gradient-to-br from-white/90 to-rose-50/50 border-2 border-rose-200 px-6 py-2.5 rounded-full font-bold text-rose-700 shadow-md text-xl">
                  {daysCount} <span className="text-sm font-medium ml-1.5">Days of Us</span>
                </div>
              </div>
              
              <p className="text-rose-600 font-semibold text-base mt-3">
                I celebrate every single moment with you.
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-rose-400 font-medium">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>
                  <Heart size={12} className="text-rose-400" />
                </motion.div>
                <span>Tap to see my promise</span>
                <ChevronRight size={16} className="text-rose-300" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="s4" 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => {
              triggerHaptic(15);
              setStep(5);
            }} 
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full cursor-pointer touch-pan-y"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-rose-50/10 rounded-2xl" />
            
            <div className="relative z-10">
              <h1 className="font-serif text-3xl text-rose-900 mb-4 font-bold tracking-tight">
                My Promise to You
              </h1>
              <p className="text-gray-700 mb-4 font-medium italic text-base leading-relaxed">
                Not just roses on Rose Day, but my love on every single day.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Through every storm and every sunshine — <span className="text-rose-600 font-bold">I choose you, always.</span>
              </p>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-rose-50/80 px-4 py-2.5 rounded-full border border-rose-200/50">
                  <Heart size={14} className="text-rose-500 animate-pulse" />
                  <span className="text-sm font-medium text-rose-700">Hold the rose for 3 seconds</span>
                </div>
                <p className="mt-2 text-xs text-rose-400 italic">❤️ My heart is in your hands ❤️</p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div 
            key="s5" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full touch-pan-y"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-pink-50/20 rounded-2xl" />
            
            <div className="relative z-10">
              <div 
                onMouseDown={startHold} 
                onMouseUp={stopHold} 
                onTouchStart={startHold} 
                onTouchEnd={stopHold}
                onTouchMove={(e) => e.preventDefault()}
                className={`transition-all duration-300 ${
                  isHolding 
                    ? 'scale-105 shadow-[0_0_25px_rgba(244,63,94,0.35)]' 
                    : 'scale-100'
                }`}
              >
                <RoseSVG size="w-44 h-44" />
              </div>
              
              {/* Progress indicator */}
              {isHolding && (
                <div className="mt-5">
                  <div className="w-full bg-rose-100/40 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.028 }}
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-center text-sm font-medium text-rose-600">
                    {progress.toFixed(0)}% - Keep holding...
                  </div>
                </div>
              )}
              
              <p className="text-gray-700 font-medium mt-5 text-base leading-relaxed text-center">
                This rose holds my deepest truth... Tap and Hold  and you'll feel it too.
              </p>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-pink-50/80 px-4 py-2 rounded-full border border-pink-200/50">
                  <Heart size={14} className="text-pink-500 animate-pulse" />
                  <span className="text-sm font-medium text-pink-700">Hold close to your heart</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div 
            key="s6" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="relative bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-rose-100/50 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 to-pink-50/30 rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-200/40"
                  style={{ 
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: ['-100%', '100%'],
                    opacity: [0, 0.4, 0],
                    scale: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Heart size={16} fill="currentColor" />
                </motion.div>
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 text-rose-700 font-bold text-xs mb-5 uppercase tracking-wider shadow-md">
                🌹 Happy Rose Day, My Love 🌹
              </div>
              
              <p className="text-rose-800 font-serif text-lg italic mb-6 leading-relaxed text-center px-2">
                "You are the first thought in my morning and the last whisper in my night. Always."
              </p>
              
              <div className="mt-6 pt-6 border-t-2 border-rose-200/50">
                <div className="font-serif text-3xl text-rose-900 font-bold tracking-tight text-center">
                  Forever Yours
                </div>
                <div className="font-serif text-2xl text-rose-600 font-semibold text-center mt-2">
                  — {user.partnerName} ❤️
                </div>
                <div className="text-xs text-rose-400 mt-2 italic text-center">
                  A lifetime of love awaits...
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-rose-50/80 to-pink-50/60 rounded-xl border-l-4 border-rose-400 text-left text-xs italic text-rose-900 shadow-inner">
                <p className="font-medium">
                  This garden of our love grows more beautiful with each passing day...
                </p>
                <p className="mt-1.5 text-rose-700">
                  Come back tomorrow, my love. 🌹✨
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile navigation hint */}
      {step < 6 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-center text-xs text-rose-400/80 font-medium z-50 pointer-events-none"
        >
          <div className="flex items-center justify-center gap-1">
            <span>↑</span>
            <span>Swipe up or tap to continue</span>
            <span>↑</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}