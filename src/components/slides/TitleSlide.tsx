import React from 'react';
import { motion } from 'framer-motion';

export const TitleSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden text-gray-800">
      
      {/* Decorative Slide Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-bl-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-tr-full opacity-5 blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10"
      >
        <h2 className="text-xl md:text-2xl font-light text-[#c0392b] mb-2 tracking-wider uppercase">Welcome to the Portfolio of</h2>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Akash K
        </h1>
        <div className="h-1 w-32 bg-[#c0392b] mx-auto mb-8 rounded-full" />
        
        <p className="text-2xl md:text-3xl font-light text-gray-600">Full Stack Developer</p>
        <p className="text-lg text-gray-500 mt-4 flex items-center justify-center gap-2">
          📍 Nagpur, India
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 text-sm text-gray-400 flex flex-col items-center animate-pulse"
      >
        <span>Press Space or Arrow keys to navigate</span>
      </motion.div>
    </div>
  );
};
