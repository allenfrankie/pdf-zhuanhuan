
import React from 'react';
import { motion } from 'framer-motion';
import { ToolMetadata } from '../types.ts';
import { getIcon } from '../constants.tsx';

interface ToolCardProps {
  tool: ToolMetadata;
  onClick: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(tool.id)}
      className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] p-10 transition-all duration-700"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* 水银流动背景效果 */}
      <motion.div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br ${tool.color}`}
        initial={false}
        animate={{
          background: [
            `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1))`,
            `linear-gradient(225deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))`
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 边框动态高光 */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-blue-400/30 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="mb-8 p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <div className="text-blue-400 group-hover:text-white transition-colors">
            {getIcon(tool.icon, 36)}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors tracking-tight">
          {tool.title}
        </h3>
        
        <p className="text-base text-white/40 group-hover:text-white/70 leading-relaxed mb-8 font-light">
          {tool.description}
        </p>
        
        <div className="mt-auto flex items-center text-sm font-semibold tracking-widest text-blue-400 group-hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          立即开启专业转换 
          <motion.span 
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
      
      {/* 卡片内阴影深度感 */}
      <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
    </motion.div>
  );
};

export default ToolCard;
