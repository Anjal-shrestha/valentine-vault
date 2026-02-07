"use client";
import React, { useState, useEffect } from "react";
import { usersData } from "@/data/users";
import Timeline from "@/components/Timeline";
import RoseDay from "@/components/RoseDay";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function UserVault({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params promise using React.use()
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const user = usersData[slug];

  // Trigger confetti only once when the user successfully enters the vault
  useEffect(() => {
    if (user) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb703']
      });
    }
  }, [slug, user]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-rose-500 font-bold bg-rose-50">
        Vault Not Found 💔
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-rose-50/50 p-6">
      {/* Personalized Header Section */}
      <header className="text-center pt-12 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-2 px-4 bg-white rounded-full shadow-sm border border-rose-100 text-rose-500 font-bold text-xs mb-4"
        >
          VALENTINE VAULT 2026
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-serif text-gray-800 font-bold"
        >
          For {user.name} ❤️
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mt-2 italic"
        >
          Your Complete Valentine Journey — From {user.partnerName}
        </motion.p>
      </header>

      <AnimatePresence mode="wait">
        {!selectedDay ? (
          /* Timeline View */
          <motion.div 
            key="timeline" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Timeline days={user.days} onSelect={(day) => setSelectedDay(day)} />
          </motion.div>
        ) : (
          /* Surprise/Surprise View */
          <motion.div 
            key="surprise" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={() => setSelectedDay(null)}
              className="mb-6 text-rose-500 font-bold flex items-center gap-2 hover:translate-x-[-5px] transition-transform"
            >
              ← Back to Timeline
            </button>
            
            {selectedDay.id === 1 ? (
              /* Pass the WHOLE user object here to fix the "Growing Rose" issue */
              <RoseDay user={user} />
            ) : (
              /* Fallback for other days until specialized components are built */
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-10 rounded-[2rem] text-center shadow-xl border border-rose-100"
              >
                <span className="text-7xl block mb-4">{selectedDay.emoji}</span>
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">{selectedDay.title}</h2>
                <p className="text-gray-600 italic leading-relaxed text-lg">
                  "{selectedDay.message}"
                </p>
                
                <div className="mt-8 pt-6 border-t border-rose-50 text-rose-400 text-sm font-medium">
                  Come back tomorrow for the next surprise ✨
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}