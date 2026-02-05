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
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(tool.id)}
      className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] p-10 transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* 苹果风液态背景流转 */}
      <motion.div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-br ${tool.color}`}
        animate={{
          background: [
            `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0))`,
            `linear-gradient(225deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))`,
            `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0))`
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 动态高光边缘 */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 group-hover:border-blue-400/40 transition-colors duration-700" />
      
      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="mb-10 p-6 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <div className="text-blue-400 group-hover:text-white transition-colors duration-500">
            {getIcon(tool.icon, 40)}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors tracking-tight">
          {tool.title}
        </h3>
        
        <p className="text-base text-white/40 group-hover:text-white/70 leading-relaxed mb-10 font-light">
          {tool.description}
        </p>
        
        <div className="mt-auto flex items-center text-sm font-bold tracking-[0.2em] text-blue-400 group-hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          立即开始专业处理 
          <motion.span 
            className="ml-2"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
      
      {/* 内发光 */}
      <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] pointer-events-none" />
    </motion.div>
  );
};

export default ToolCard;