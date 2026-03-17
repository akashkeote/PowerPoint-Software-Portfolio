import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Phase 0 -> 1: Show fast intro
    const t1 = setTimeout(() => setPhase(1), 500);
    // Phase 1 -> 2: Loading phase
    const t2 = setTimeout(() => setPhase(2), 2500);
    // Exit completed
    const t3 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
           // A modern, flat darker orange background matching newer Office
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-transparent flex flex-col items-center justify-center z-50 overflow-hidden"
        >
           {/* Modal Card matching the modern Office splash screen shadow / dimensions */}
           <motion.div
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 1.05, opacity: 0 }}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className="relative z-10 w-[550px] h-[340px] bg-[#c0392b] rounded-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden p-6"
           >
              {/* Top Row: Microsoft Logo */}
              <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-white/90">
                      {/* Fake Windows/Microsoft Logo */}
                      <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                          <div className="bg-white rounded-sm"></div>
                          <div className="bg-white rounded-sm"></div>
                          <div className="bg-white rounded-sm"></div>
                          <div className="bg-white rounded-sm"></div>
                      </div>
                      <span className="text-sm font-semibold tracking-wide">Microsoft</span>
                  </div>
                  {/* Fake Close/Minimize buttons top right */}
                  <div className="flex gap-4 text-white/60">
                     <span className="text-xl leading-none mt-[-4px] cursor-default">-</span>
                     <span className="text-sm cursor-default">✕</span>
                  </div>
              </div>

              {/* Center: PowerPoint Title */}
              <div className="flex flex-col items-center justify-center flex-1 -mt-4">
                 <h1 className="text-white text-[3.5rem] font-medium tracking-tight">PowerPoint</h1>
                 <p className="text-white/70 text-lg mt-1 tracking-wide font-light">Office 2024</p>
              </div>

              {/* Bottom Row: Loading Status */}
              <div className="flex items-center justify-between text-white/80 text-xs">
                 <motion.span 
                    key={phase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                 >
                    {phase === 0 ? 'Starting...' : 'Loading Akash_Developer_Portfolio.pptx...'}
                 </motion.span>

                 {/* Optional: Add a subtle loading spinner or dots */}
                 <div className="flex gap-1 items-center">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }} 
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-1 h-1 bg-white rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }} 
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1 h-1 bg-white rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }} 
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1 h-1 bg-white rounded-full" 
                    />
                 </div>
              </div>

           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};