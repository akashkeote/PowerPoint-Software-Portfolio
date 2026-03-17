import React, { useState } from 'react';
import {
  Menu, Home, Layout, MousePointer2, MonitorPlay, FileDown, Save, Undo, Redo, ChevronDown, Search,
  ClipboardPaste, Scissors, Copy, Paintbrush2, PlusSquare, Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Wand2,
  FileText, FolderOpen, Info, Printer, Share2, Settings, ArrowLeft
} from 'lucide-react';

interface TopRibbonProps {
  onStartPresentation: () => void;
}

const TABS = ['File', 'Home', 'Insert', 'Draw', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Record', 'Review', 'View', 'Help'];

export const TopRibbon: React.FC<TopRibbonProps> = ({ onStartPresentation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#1f1f1f] border-b border-[#333333] shadow-sm flex flex-col z-20 text-[#e1e1e1] select-none w-full">
        {/* Top Title Bar (Very Dark) */}
        <div className="h-10 text-xs flex flex-row items-center pl-2 pr-0 justify-between w-full">

          {/* Left Side: Autosave, Save, Undo, Redo */}
          <div className="flex flex-row items-center gap-3">
            {/* PPT App Icon (Orange dot) */}
            <div className="w-5 h-5 bg-[#c0392b] text-white flex items-center justify-center font-bold text-[10px] rounded-sm ml-1 mr-2">
              P
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors text-white">
              <span className="font-medium whitespace-nowrap">AutoSave</span>
              <div className="w-6 h-3.5 bg-[#444] rounded-full relative shrink-0">
                <div className="w-2.5 h-2.5 bg-[#e1e1e1] rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
            <span className="text-[#ccc] mx-1">|</span>
            <div className="flex flex-row gap-1 text-white">
              <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Save size={14} /></div>
              <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Undo size={14} /></div>
              <div className="p-1.5 hover:bg-white/10 rounded cursor-pointer"><Redo size={14} /></div>
              <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><ChevronDown size={12} /></div>
            </div>
          </div>

          {/* Center: Search & Title */}
          <div className="flex flex-row items-center gap-4 flex-1 justify-center min-w-0">
            {/* Search Bar */}
            <div className="bg-[#333] hover:bg-[#444] text-white flex flex-row items-center gap-2 px-3 py-1.5 rounded-md w-96 cursor-text transition-colors border border-[#444]">
              <Search size={14} className="text-[#ccc] shrink-0" />
              <span className="text-xs">Search</span>
            </div>
            {/* Title */}
            <span className="text-white font-semibold tracking-wide ml-4 truncate hidden lg:block">Akash_Developer_Portfolio.pptx - PowerPoint</span>
          </div>

          {/* Right Side: User Profile & Window Controls */}
          <div className="flex flex-row items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center font-medium mr-4 cursor-pointer">
              AK
            </div>

            {/* Classic Windows Controls */}
            <div className="flex space-x-0 h-full self-start -mt-2">
              <div className="px-4 py-3 hover:bg-white/10 cursor-pointer text-lg leading-none flex items-center justify-center">─</div>
              <div className="px-4 py-3 hover:bg-white/10 cursor-pointer text-sm flex items-center justify-center">◻</div>
              <div className="px-4 py-3 hover:bg-red-600 hover:text-white cursor-pointer text-sm flex items-center justify-center">✕</div>
            </div>
          </div>
        </div>

        {/* Ribbon Tabs Row */}
        <div className="flex flex-row items-end px-2 pt-0 gap-1 text-xs font-medium w-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const isFile = tab === 'File';
            const isActive = tab === activeTab && !isFile;
            
            return (
              <div
                key={tab}
                onClick={() => {
                  if (isFile) {
                    setIsFileMenuOpen(true);
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`px-3 py-1.5 cursor-pointer transition-colors duration-150 relative whitespace-nowrap ${
                  isFile 
                    ? 'bg-[#c0392b] text-white px-4 rounded-t-sm hover:opacity-90'
                    : isActive
                      ? 'text-white border-b-2 border-[#c0392b]'
                      : 'text-[#e1e1e1] hover:bg-white/10 rounded-sm'
                }`}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* Ribbon Tools Area (Dark Gray) */}
        <div className="bg-[#2d2d2d] h-[92px] flex flex-row items-center px-2 gap-4 relative z-0 border-t border-[#444] w-full overflow-x-auto overflow-y-hidden no-scrollbar">
          
          {/* Group: Clipboard */}
          <div className="flex flex-row items-stretch gap-1 border-r border-[#444] pr-4 py-1 h-full shrink-0">
            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors group">
              <ClipboardPaste size={28} className="text-[#e1e1e1] opacity-90" />
              <span className="text-[10px] text-[#ccc]">Paste</span>
            </div>
            <div className="flex flex-col justify-center gap-1 px-1">
              <div className="flex items-center gap-1 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Scissors size={14} /> <span className="text-[10px]">Cut</span></div>
              <div className="flex items-center gap-1 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Copy size={14} /> <span className="text-[10px]">Copy</span></div>
              <div className="flex items-center gap-1 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Paintbrush2 size={14} /> <span className="text-[10px]">Format Painter</span></div>
            </div>
          </div>

          {/* Group: Slides */}
          <div className="flex flex-row items-stretch gap-2 border-r border-[#444] pr-4 py-1 h-full shrink-0">
            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors group">
              <div className="relative">
                <PlusSquare size={24} className="text-[#c0392b]" />
                <div className="absolute -bottom-1 -right-1 bg-[#c0392b] w-2.5 h-2.5 flex items-center justify-center text-[8px] font-bold text-white rounded-sm">+</div>
              </div>
              <span className="text-[10px] text-[#ccc] mt-1">New Slide</span>
            </div>
            <div className="flex flex-col justify-center gap-1 px-1">
              <div className="flex items-center gap-1 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Layout size={14} className="text-[#ffb900] opacity-80" /> <span className="text-[10px]">Layout</span></div>
              <div className="flex items-center gap-1 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Undo size={14} className="opacity-80" /> <span className="text-[10px]">Reset</span></div>
            </div>
          </div>

          {/* Group: Font */}
          <div className="flex flex-col border-r border-[#444] pr-4 py-1 h-full justify-center gap-1 shrink-0">
            <div className="flex gap-1 mb-1">
              <div className="bg-[#1f1f1f] border border-[#555] rounded px-2 py-0.5 text-xs flex justify-between items-center w-32 cursor-pointer">
                Space Grotesk <ChevronDown size={10} />
              </div>
              <div className="bg-[#1f1f1f] border border-[#555] rounded px-2 py-0.5 text-xs flex justify-between items-center w-12 cursor-pointer">
                24 <ChevronDown size={10} />
              </div>
            </div>
            <div className="flex gap-1 text-[#e1e1e1]">
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><Bold size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><Italic size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer line-through"><Underline size={14} className="no-underline" /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><Strikethrough size={14} /></div>
              <div className="w-[1px] h-4 bg-[#555] mx-1 self-center"></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer border-b-2 border-red-500 text-xs font-bold leading-none w-6 text-center">A</div>
            </div>
          </div>

          {/* Group: Paragraph */}
          <div className="flex flex-col border-r border-[#444] pr-4 py-1 h-full justify-center gap-1 shrink-0">
             <div className="flex gap-1 text-[#e1e1e1]">
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><List size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><ListOrdered size={14} /></div>
              <div className="w-[1px] h-4 bg-[#555] mx-1 self-center"></div>
              <div className="hover:bg-white/10 bg-white/20 p-1 rounded cursor-pointer"><AlignLeft size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><AlignCenter size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><AlignRight size={14} /></div>
              <div className="hover:bg-white/10 p-1 rounded cursor-pointer"><AlignJustify size={14} /></div>
            </div>
          </div>

          {/* Group: Presentation & Download (Custom for Portfolio) */}
          <div className="flex flex-row items-center gap-4 border-r border-[#444] pr-4 h-full shrink-0">
            <div
              onClick={onStartPresentation}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors group"
            >
              <MonitorPlay size={28} className="text-[#c0392b] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-semibold text-[#c0392b] whitespace-nowrap">Start Presentation</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors">
              <FileDown size={24} className="text-[#217346]" />
              <span className="text-[10px] text-[#ccc] whitespace-nowrap">Save Resume</span>
            </div>
          </div>

          {/* Group: Editing */}
          <div className="flex flex-col justify-center gap-1 px-1 h-full shrink-0">
             <div className="flex items-center gap-2 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Search size={14} /> <span className="text-[10px]">Find</span></div>
             <div className="flex items-center gap-2 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><Wand2 size={14} /> <span className="text-[10px]">Replace</span></div>
             <div className="flex items-center gap-2 hover:bg-white/10 p-1 rounded cursor-pointer text-[#ccc]"><MousePointer2 size={14} /> <span className="text-[10px]">Select</span></div>
          </div>

        </div>
      </div>

      {/* Full-Screen File Menu Overlay */}
      {isFileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1f1f1f] text-white flex flex-row">
          {/* Left Sidebar Menu */}
          <div className="w-64 bg-[#c0392b] flex flex-col pt-8 pb-4 h-full">
            <div 
              onClick={() => setIsFileMenuOpen(false)}
              className="px-6 py-2 hover:bg-black/20 cursor-pointer flex items-center gap-3 mb-6"
            >
              <ArrowLeft size={24} /> 
            </div>
            
            <div className="flex flex-col w-full text-[15px] font-medium">
              <div className="px-6 py-3 bg-black/20 border-l-4 border-white cursor-pointer flex items-center gap-4">
                <Home size={20} /> Home
              </div>
              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4">
                <FileText size={20} /> New
              </div>
              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4 mb-6">
                <FolderOpen size={20} /> Open
              </div>

              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4">
                <Info size={20} /> Info
              </div>
              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4">
                <Save size={20} /> Save
              </div>
              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4 mb-6">
                <Printer size={20} /> Print
              </div>

              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4">
                <Share2 size={20} /> Share
              </div>
            </div>

            <div className="mt-auto flex flex-col w-full text-[15px] font-medium">
              <div className="px-6 py-3 hover:bg-black/20 border-l-4 border-transparent cursor-pointer flex items-center gap-4">
                <Settings size={20} /> Options
              </div>
            </div>
          </div>

          {/* Right Main Area */}
          <div className="flex-1 bg-[#1f1f1f] p-12 overflow-y-auto">
            <h1 className="text-3xl font-light mb-8">Home</h1>
            
            <div className="flex gap-8 mb-12">
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-48 h-32 border border-[#444] bg-[#2d2d2d] group-hover:border-white transition-colors flex items-center justify-center relative overflow-hidden">
                   <div className="w-full h-full bg-white flex flex-col shadow-sm">
                      <div className="h-4 bg-[#c0392b] w-full"></div>
                      <div className="flex-1"></div>
                   </div>
                </div>
                <span className="text-sm font-medium">Blank Presentation</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-48 h-32 border border-[#444] bg-[#2d2d2d] group-hover:border-white transition-colors flex items-center justify-center relative overflow-hidden">
                   <div className="w-full h-full bg-[#111] flex flex-col shadow-sm border border-[#333]">
                      <div className="flex-1 p-2 flex flex-col gap-1 items-center justify-center">
                        <div className="w-16 h-2 bg-[#444] rounded"></div>
                        <div className="w-10 h-1 bg-[#444] rounded"></div>
                      </div>
                   </div>
                </div>
                <span className="text-sm font-medium">Portfolio Theme</span>
              </div>
            </div>

            <h2 className="text-xl font-medium border-b border-[#444] pb-2 mb-4">Recent</h2>
            
            <div className="flex flex-col w-full max-w-4xl">
               <div className="flex items-center gap-4 p-3 hover:bg-[#333] cursor-pointer rounded">
                  <FileText size={24} className="text-[#c0392b]" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px]">Akash_Developer_Portfolio.pptx</span>
                    <span className="text-xs text-[#888]">C:\Users\AkashK\Desktop\PowerPoint Software Portfolio</span>
                  </div>
                  <span className="ml-auto text-xs text-[#888]">Just now</span>
               </div>
               <div className="flex items-center gap-4 p-3 hover:bg-[#333] cursor-pointer rounded">
                  <FileText size={24} className="text-[#c0392b]" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px]">Resume_2024.pdf</span>
                    <span className="text-xs text-[#888]">C:\Users\AkashK\Documents</span>
                  </div>
                  <span className="ml-auto text-xs text-[#888]">Yesterday, 4:20 PM</span>
               </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};