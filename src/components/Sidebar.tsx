import React from 'react';
import { motion } from 'framer-motion';

interface SlideData {
  id: string;
  title: string;
}

interface SidebarProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ slides, currentSlideIndex, onSlideSelect }) => {
  return (
    <div className="w-56 bg-[#2d2d2d] border-r border-[#444] flex flex-col overflow-y-auto z-10 select-none">
      <div className="p-3 flex flex-col gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => onSlideSelect(index)}
            className="flex gap-2 items-start cursor-pointer group"
          >
            <span className={`text-xs font-medium w-4 text-right pt-2 transition-colors ${
                currentSlideIndex === index ? 'text-[#c0392b]' : 'text-[#888] group-hover:text-[#bbb]'
            }`}>
              {index + 1}
            </span>
            <div 
              className={`relative flex-1 aspect-video rounded border transition-all duration-200 flex items-center justify-center p-2 text-center text-[10px] font-semibold
              ${currentSlideIndex === index 
                ? 'border-[#c0392b] bg-[#3a3a3a] text-white shadow-sm' 
                : 'border-[#555] bg-[#333] text-[#aaa] group-hover:border-[#777] group-hover:bg-[#3a3a3a]'}`}
            >
              {slide.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};