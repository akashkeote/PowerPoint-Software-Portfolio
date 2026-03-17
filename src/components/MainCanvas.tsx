import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
  id: string;
  title: string;
  component?: React.ReactNode;
}

interface MainCanvasProps {
  currentSlide: SlideData;
  isPresentationMode: boolean;
  onExitPresentation: () => void;
}

export const MainCanvas: React.FC<MainCanvasProps> = ({ currentSlide, isPresentationMode, onExitPresentation }) => {
  return (
    <div className={`flex-1 overflow-hidden relative ${isPresentationMode ? 'bg-black flex items-center justify-center fixed inset-0 z-50' : 'bg-gray-200 p-8 flex items-center justify-center'}`}>
      
      {isPresentationMode && (
         <div 
           onClick={onExitPresentation}
           className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded cursor-pointer z-50 transition-colors text-sm"
         >
           Exit (Esc)
         </div>
      )}

      {/* The Slide Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: isPresentationMode ? 0.95 : 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: isPresentationMode ? 1.05 : 1.02, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`bg-white shadow-2xl relative flex flex-col items-center justify-center ${
            isPresentationMode 
            ? 'w-full h-full max-w-[1920px] max-h-[1080px] aspect-video object-contain'
            : 'w-full max-w-5xl aspect-video rounded-sm border border-gray-300'
          }`}
        >
          {/* Temporary placeholder if no component is provided */}
          {currentSlide.component ? (
            currentSlide.component
          ) : (
             <div className="text-center">
               <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-4">{currentSlide.title}</h1>
               <p className="text-gray-500">Content coming soon...</p>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
