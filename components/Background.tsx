
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020205]">
      {/* 极客网格点阵 */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 动态流动光晕 - 蓝紫色系 */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[150px]"
      />
      <motion.div 
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[150px]"
      />

      {/* 扫描线效果 */}
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-10"
      />
      
      {/* 科技线条动画 */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <motion.path
          d="M -100 100 Q 200 300 500 100 T 1200 400"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="1"
          animate={{
            d: [
              "M -100 100 Q 200 300 500 100 T 1200 400",
              "M -100 200 Q 400 100 700 300 T 1200 100",
              "M -100 100 Q 200 300 500 100 T 1200 400"
            ]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Background;
