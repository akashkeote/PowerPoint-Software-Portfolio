import React from 'react';
import { MonitorPlay, Layout, Maximize, ZoomIn, ZoomOut } from 'lucide-react';

interface StatusBarProps {
  currentSlide: number;
  totalSlides: number;
  onStartPresentation: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ currentSlide, totalSlides, onStartPresentation }) => {
  return (
    <div className="h-6 bg-[#1f1f1f] border-t border-[#333] flex items-center justify-between px-3 text-[11px] text-[#ccc] select-none z-20">
      <div className="flex items-center gap-4">
        <span className="hover:bg-white/10 cursor-pointer px-1 rounded transition-colors">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
        <span className="hover:bg-white/10 cursor-pointer px-1 rounded transition-colors flex items-center gap-1">
           English (India)
        </span>
        <span className="text-[#c0392b] font-medium px-1">
          Accessibility: Good to go
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[#aaa]">
          <div className="p-0.5 hover:bg-white/10 cursor-pointer rounded transition-colors">
            <Layout size={14} />
          </div>
          <div 
             onClick={onStartPresentation}
             className="p-0.5 hover:bg-white/10 hover:text-[#c0392b] cursor-pointer rounded transition-colors"
          >
            <MonitorPlay size={14} />
          </div>
        </div>

        <div className="w-[1px] h-3 bg-[#444]" />

        <div className="flex items-center gap-2 text-[#aaa]">
          <div className="flex items-center justify-center w-4 h-4 hover:bg-white/10 cursor-pointer rounded">
             <ZoomOut size={12} />
          </div>
          <div className="w-16 h-1 bg-[#444] rounded-full relative cursor-pointer">
             <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-2 h-3.5 bg-[#888] rounded-sm"></div>
          </div>
          <div className="flex items-center justify-center w-4 h-4 hover:bg-white/10 cursor-pointer rounded">
             <ZoomIn size={12} />
          </div>
          <span className="w-8 text-right text-xs">72%</span>
          <div className="p-0.5 hover:bg-white/10 cursor-pointer rounded ml-1 transition-colors">
             <Maximize size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};
