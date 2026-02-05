
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
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]"
      />

      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * dimensions.width, 
              y: Math.random() * dimensions.height,
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
