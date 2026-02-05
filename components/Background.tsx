
import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020205]">
      {/* 极客网格点阵 */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 动态 Mesh Gradient 光晕 */}
      <motion.div 
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/15 blur-[120px]"
      />
      <motion.div 
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -80, 0],
          scale: [1.2, 0.8, 1.1, 1.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/15 blur-[120px]"
      />
      <motion.div 
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"
      />

      {/* 底部微弱光泽 */}
      <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default Background;
