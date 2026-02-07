"use client";
import { motion } from "framer-motion";
import { Lock, Heart } from "lucide-react";

export default function Timeline({ days, onSelect }: { days: any[], onSelect: (day: any) => void }) {
  const today = new Date();
  // Set time to midnight for accurate day comparison
  today.setHours(0, 0, 0, 0);

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      {days.map((day, index) => {
        const unlockDate = new Date(day.unlockDate);
        unlockDate.setHours(0, 0, 0, 0);
        const isLocked = today < unlockDate;

        return (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isLocked && onSelect(day)}
            className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${
              isLocked 
                ? "bg-gray-100 border-gray-200 grayscale opacity-70" 
                : "bg-white border-rose-200 shadow-md hover:shadow-rose-100 hover:scale-[1.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{isLocked ? "🔒" : day.emoji}</span>
                <div>
                  <h3 className={`font-bold ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
                    {day.title}
                  </h3>
                  <p className="text-xs text-rose-400 font-medium">
                    {day.unlockDate}
                  </p>
                </div>
              </div>
              {!isLocked && <Heart className="text-rose-500 fill-rose-500 w-5 h-5" />}
            </div>

            {isLocked && (
              <div className="mt-3 text-xs italic text-gray-400">
                Unlocks in {Math.ceil((unlockDate.getTime() - today.getTime()) / (1000 * 3600 * 24))} day(s)
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}