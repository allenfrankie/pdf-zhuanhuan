
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
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(tool.id)}
      className={`relative group cursor-pointer overflow-hidden rounded-3xl p-8 glass liquid-hover transition-all duration-500`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${tool.color}`} />
      
      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
          <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
            {getIcon(tool.icon, 32)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white/90 group-hover:text-white">
          {tool.title}
        </h3>
        
        <p className="text-sm text-white/50 group-hover:text-white/70 leading-relaxed mb-6">
          {tool.description}
        </p>
        
        <div className="mt-auto flex items-center text-xs font-semibold tracking-wider text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
          立即开始 
          <span className="ml-2">→</span>
        </div>
      </div>
      
      <div className="absolute inset-px rounded-3xl border border-white/5 pointer-events-none" />
    </motion.div>
  );
};

export default ToolCard;
