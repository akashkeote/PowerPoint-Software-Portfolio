import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileDown, Phone } from 'lucide-react';

export const ContactSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-12 bg-[#c0392b] text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 w-full max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Thank You.</h1>
        <p className="text-xl md:text-2xl font-light text-red-100 mb-12">
          Let's build something amazing together.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <Mail size={24} />, label: "Email", action: "hello@akashk.dev" },
            { icon: <Linkedin size={24} />, label: "LinkedIn", action: "/in/akashk" },
            { icon: <Github size={24} />, label: "GitHub", action: "@akashk" },
            { icon: <Phone size={24} />, label: "Phone", action: "+91 xxxx-xxxxx" }
          ].map((contact, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + (idx * 0.1) }}
               className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm border border-white/5"
             >
                <div className="p-3 bg-white/10 rounded-full">
                  {contact.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-red-200 uppercase tracking-widest">{contact.label}</span>
                  <span className="font-medium text-sm">{contact.action}</span>
                </div>
             </motion.div>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3 mx-auto bg-white text-[#c0392b] px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
        >
          <FileDown size={20} />
          Download Complete Resume
        </motion.button>
        
        <p className="mt-8 text-sm text-red-200/60 font-medium">Press Esc to exit presentation mode</p>
      </motion.div>
    </div>
  );
};