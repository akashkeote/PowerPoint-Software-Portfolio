import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { category: "Frontend", items: ["React", "HTML5/CSS3", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Flask", "REST APIs"] },
  { category: "Database & Tools", items: ["MongoDB", "SQL", "Git", "Docker", "AWS"] },
  { category: "AI & ML", items: ["OpenCV", "YOLOv8", "Computer Vision", "LLMs"] }
];

export const SkillsSlide: React.FC = () => {
  return (
    <div className="w-full h-full p-12 md:p-24 flex flex-col bg-white overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-2">Technical Skills</h1>
        <div className="h-1 w-48 bg-[#c0392b]" />
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-8 lg:gap-12">
        {skills.map((skillGroup, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-[#c0392b] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              {skillGroup.category}
            </h3>
            <ul className="space-y-3">
              {skillGroup.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-gray-700 font-medium flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};