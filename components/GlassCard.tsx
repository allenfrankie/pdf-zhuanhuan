
import React from 'react';
import { motion } from 'framer-motion';
import { ToolMetadata } from '../types.ts';
import { getIcon } from '../constants.tsx';

interface GlassCardProps {
  tool: ToolMetadata;
  onClick: (id: string) => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ tool, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(tool.id)}
      className="relative group cursor-pointer overflow-hidden rounded-[2rem] p-10 transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* 动态渐变背景 - 水银流动感 */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${tool.color}`} />
      
      {/* 边缘发光 */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-blue-400/30 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500">
          <div className="text-blue-400 group-hover:text-white transition-colors">
            {getIcon(tool.icon, 36)}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors tracking-tight">
          {tool.title}
        </h3>
        
        <p className="text-sm text-white/40 group-hover:text-white/60 leading-relaxed mb-10 font-light">
          {tool.description}
        </p>
        
        <motion.div 
          className="mt-auto flex items-center text-xs font-bold tracking-widest text-blue-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
        >
          立即开启 
          <span className="ml-2">→</span>
        </motion.div>
      </div>
      
      {/* 内部微光 */}
      <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none" />
    </motion.div>
  );
};

export default GlassCard;
