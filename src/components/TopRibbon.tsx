import React, { useState } from 'react';
import { 
  Menu, // Using Menu as a quick sub for the File/App icon if needed, though MS uses 'File'
  Home, 
  Layout, 
  MousePointer2, 
  Type as TypeIcon, 
  MonitorPlay, 
  FileDown,
  Save,
  Undo,
  Redo,
  ChevronDown,
  Search
} from 'lucide-react';

interface TopRibbonProps {
  onStartPresentation: () => void;
}

const TABS = ['File', 'Home', 'Insert', 'Draw', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Record', 'Review', 'View', 'Help'];

export const TopRibbon: React.FC<TopRibbonProps> = ({ onStartPresentation }) => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="bg-[#1f1f1f] border-b border-[#333333] shadow-sm flex flex-col z-20 text-[#e1e1e1] select-none">
      {/* Top Title Bar (Very Dark) */}
      <div className="h-10 text-xs flex flex-row items-center pr-4 pl-2 justify-between w-full">
        
        {/* Left Side: Autosave, Save, Undo, Redo */}
        <div className="flex flex-row items-center gap-3">
          {/* PPT App Icon (Orange dot) */}
          <div className="w-5 h-5 bg-[#c0392b] text-white flex items-center justify-center font-bold text-[10px] rounded-sm ml-1 mr-2">
            P
          </div>
          <div className="flex flex-row items-center gap-2 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors">
             <span className="font-medium whitespace-nowrap">AutoSave</span>
             <div className="w-6 h-3.5 bg-[#444] rounded-full relative shrink-0">
                <div className="w-2.5 h-2.5 bg-[#888] rounded-full absolute left-0.5 top-0.5"></div>
             </div>
          </div>
          <span className="text-[#888] mx-1">|</span>
          <div className="flex flex-row gap-1 text-[#ccc]">
             <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Save size={14} /></div>
             <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Undo size={14} /></div>
             <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Redo size={14} /></div>
             <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><ChevronDown size={12} /></div>
          </div>
        </div>

        {/* Center: Search & Title */}
        <div className="flex flex-row items-center gap-4 flex-1 justify-center min-w-0">
            {/* Search Bar */}
            <div className="bg-[#333] hover:bg-[#444] text-[#ccc] flex flex-row items-center gap-2 px-3 py-1.5 rounded-md w-96 cursor-text transition-colors border border-[#444]">
               <Search size={14} className="text-[#888] shrink-0" />
               <span className="text-xs">Search</span>
            </div>
            {/* Title */}
            <span className="text-[#e1e1e1] font-semibold tracking-wide ml-4 truncate hidden lg:block">Akash_Developer_Portfolio.pptx - PowerPoint</span>
        </div>

        {/* Right Side: User Profile & Window Controls */}
        <div className="flex flex-row items-center gap-2 shrink-0">
           <div className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center font-medium mr-4 cursor-pointer">
             AK
           </div>
           
           {/* Classic Windows Controls */}
           <div className="flex space-x-0 h-full self-start -mt-2 -mr-4">
              <div className="px-4 py-2 hover:bg-white/10 cursor-pointer text-lg leading-none">─</div>
              <div className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm">◻</div>
              <div className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer text-sm">✕</div>
           </div>
        </div>
      </div>

      {/* Ribbon Tabs Row */}
      <div className="flex flex-row items-end px-2 pt-0 gap-1 text-xs font-medium w-full flex-wrap lg:flex-nowrap overflow-x-auto">
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 cursor-pointer transition-colors duration-150 relative whitespace-nowrap ${
              tab === activeTab
                ? 'text-white border-b-2 border-[#c0392b]'
                : tab === 'File' 
                   ? 'text-[#e1e1e1] hover:bg-white/10 px-4' 
                   : 'text-[#bbb] hover:bg-white/10 rounded-sm'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Ribbon Tools Area (Dark Gray) */}
      <div className="bg-[#2d2d2d] h-[92px] flex flex-row items-center px-4 gap-6 relative z-0 border-t border-[#444] w-full overflow-hidden">
        
        {/* Pseudo Toolbar Actions based on Tab */}
        <div className="flex flex-row items-center gap-1 border-r border-[#444] pr-4 h-5/6">
            <div className="flex flex-col items-center justify-start gap-1 cursor-pointer hover:bg-white/10 p-1.5 rounded w-14 transition-colors">
              <MousePointer2 size={24} className="text-[#c0392b]" />
              <span className="text-[10px] text-[#ccc]">Select</span>
            </div>
            <div className="flex flex-col items-center justify-start gap-1 cursor-pointer hover:bg-white/10 p-1.5 rounded w-14 transition-colors">
              <Layout size={24} className="text-[#ffb900] opacity-80" />
              <span className="text-[10px] text-[#ccc]">Layout</span>
            </div>
            <div className="flex flex-col items-center justify-start gap-1 cursor-pointer hover:bg-white/10 p-1.5 rounded w-14 transition-colors">
              <TypeIcon size={24} className="text-[#0078d4] opacity-80" />
              <span className="text-[10px] text-[#ccc]">Text Box</span>
            </div>
        </div>

        {/* Action Buttons (Mapped to Portfolio Needs) */}
        <div className="flex flex-row items-center gap-4 border-r border-[#444] pr-4 h-5/6">
          <div 
             onClick={onStartPresentation}
             className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors group"
          >
            <MonitorPlay size={28} className="text-[#c0392b] group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-semibold text-[#c0392b] whitespace-nowrap">Start Presentation</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 border-r border-[#444] pr-4 h-5/6">
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded w-20 transition-colors">
            <FileDown size={24} className="text-[#217346]" />
            <span className="text-[10px] text-[#ccc] text-center leading-tight whitespace-nowrap">Download<br/>Resume</span>
          </div>
        </div>

      </div>
    </div>
  );
};
