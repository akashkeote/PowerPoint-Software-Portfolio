import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ShieldCheck, Eye, Activity } from 'lucide-react';

export const ProjectsSlide: React.FC = () => {
  return (
    <div className="w-full h-full p-12 md:p-20 flex flex-col bg-slate-50 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#c0392b]/5 clip-path-polygon-[100%_0,100%_100%,0_100%]" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Featured Project</h1>
        <div className="h-1 w-32 bg-[#c0392b]" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 h-full">
        {/* Project Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Exam Monitoring Platform</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            An AI-powered proctoring system designed to ensure exam integrity. It utilizes real-time computer vision to detect suspicious activities during online assessments.
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {['Python', 'YOLOv8', 'OpenCV', 'Flask', 'React'].map(tech => (
              <span key={tech} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 shadow-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex items-center gap-2 bg-[#c0392b] text-white px-5 py-2.5 rounded hover:bg-red-800 transition-colors shadow-lg">
              <Github size={18} /> Source Code
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded hover:bg-gray-50 transition-colors shadow-sm">
              <ExternalLink size={18} /> Live Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Highlights Container */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-[0.8] flex flex-col gap-4 justify-center"
        >
          {[
            { icon: <Eye className="text-[#c0392b]" />, title: 'Eye Tracking', desc: 'Monitors gaze direction to detect off-screen looking' },
            { icon: <ShieldCheck className="text-orange-500" />, title: 'Suspicious Activity', desc: 'Detects multiple faces or absence of candidate' },
            { icon: <Activity className="text-red-500" />, title: 'Live Dashboard', desc: 'Real-time alert system for invigilators' }
          ].map((feature, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 + (idx * 0.1) }}
               className="bg-white p-5 rounded border-l-4 border-l-[#c0392b] shadow-sm flex items-start gap-4"
             >
                <div className="p-2 bg-gray-50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                </div>
             </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};