
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Github, FileText, Presentation } from 'lucide-react';
import { ToolType } from './types.ts';
import { TOOLS } from './constants.tsx';
import Background from './components/Background.tsx';
import ToolCard from './components/ToolCard.tsx';
import FileUploader from './components/FileUploader.tsx';
import { processDocument } from './services/pdfEngine.ts';

const App: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<ToolType | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed'>('idle');
  const [progressText, setProgressText] = useState('');

  const selectedTool = TOOLS.find(t => t.id === selectedToolId);

  const handleToolClick = (id: string) => {
    setSelectedToolId(id as ToolType);
  };

  const handleBack = () => {
    setSelectedToolId(null);
    setStatus('idle');
  };

  const handleFileProcess = async (file: File) => {
    if (!selectedToolId) return;
    
    setStatus('processing');
    try {
      const resultBlob = await processDocument(file, selectedToolId, (msg) => {
        setProgressText(msg);
      });
      
      const url = URL.createObjectURL(resultBlob);
      const a = document.createElement('a');
      a.href = url;
      
      let ext = '.pdf';
      if (selectedToolId === ToolType.PDF_TO_WORD) ext = '.docx';
      if (selectedToolId === ToolType.PDF_TO_PPT) ext = '.pptx';
      
      a.download = file.name.split('.')[0] + '_已转换' + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatus('completed');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('处理过程中发生错误，请确保文件格式正确且未加密。');
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-blue-500/40 font-sans">
      <Background />
      
      {/* 磨砂玻璃导航栏 */}
      <nav className="fixed top-0 inset-x-0 z-50 h-24 px-10 flex items-center justify-between border-b border-white/10" style={{ backdropFilter: 'blur(25px)', background: 'rgba(5, 5, 10, 0.4)' }}>
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedToolId(null)}>
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20"
          >
            W
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-xl leading-none">William.Zhan</span>
            <span className="text-white/30 text-[10px] tracking-[0.2em] font-medium uppercase mt-1">Professional Doc Suite</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          {['功能特性', '技术支持', '隐私承诺'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-white/40 hover:text-blue-400 transition-all tracking-wide">{item}</a>
          ))}
          <a href="https://github.com" target="_blank" className="px-6 py-2 rounded-full border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all flex items-center space-x-2 text-sm">
            <Github size={16} />
            <span>开源代码</span>
          </a>
        </div>
      </nav>

      <main className="pt-44 pb-24 px-6 container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!selectedToolId ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-24 max-w-4xl mx-auto">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest mb-8 uppercase"
                >
                  本地处理 · WebAssembly 驱动
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 tracking-tighter leading-[1.1]">
                  重塑您的<br />文档工作流
                </h1>
                <p className="text-xl text-white/40 leading-relaxed font-light max-w-2xl mx-auto">
                  极致的 Apple 液态玻璃美学，配合顶级 WASM 文件引擎。所有转换均在浏览器本地安全完成，告别隐私泄露。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {TOOLS.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                  >
                    <ToolCard tool={tool} onClick={handleToolClick} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool-detail"
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-5xl mx-auto"
            >
              <button 
                onClick={handleBack}
                className="flex items-center text-white/30 hover:text-white mb-12 group transition-all font-medium"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mr-4 group-hover:border-white/30 group-hover:-translate-x-1 transition-all">
                  <ChevronLeft size={20} />
                </div>
                返回工具中心
              </button>
              
              <div className="mb-16 text-center">
                <motion.div 
                  layoutId={`icon-${selectedTool?.id}`}
                  className={`inline-flex p-6 rounded-[2rem] bg-gradient-to-br ${selectedTool?.color} mb-8 shadow-2xl shadow-blue-500/10`}
                  style={{ backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                   {selectedTool && (
                     <div className="text-blue-400">
                        {selectedTool.title.includes('PPT') ? <Presentation size={48} /> : <FileText size={48} />}
                     </div>
                   )}
                </motion.div>
                <h2 className="text-5xl font-black mb-6 tracking-tight">{selectedTool?.title}</h2>
                <p className="text-white/40 text-lg font-light max-w-xl mx-auto">{selectedTool?.description}</p>
              </div>

              <FileUploader 
                onFileSelect={handleFileProcess} 
                status={status} 
                progressText={progressText}
                onReset={() => setStatus('idle')}
              />
              
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto border-t border-white/5 pt-16">
                {[
                  { title: '本地隐私', desc: '文件不出浏览器，100% 隐私保护。' },
                  { title: '毫秒响应', desc: 'WebAssembly 带来的极致处理速度。' },
                  { title: '智能还原', desc: '深度解析文档层级，高精度还原排版。' }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-14 h-14 rounded-3xl glass flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform font-bold border border-white/10">0{i+1}</div>
                    <h4 className="font-bold text-lg mb-3 text-white/80 group-hover:text-white">{feature.title}</h4>
                    <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-16 text-center border-t border-white/5 bg-[#020205]/40" style={{ backdropFilter: 'blur(20px)' }}>
        <p className="text-white/10 text-xs font-bold tracking-[0.3em] uppercase mb-4">William.Zhan Digital Laboratory</p>
        <p className="text-white/30 text-sm">© 2025 全能文档处理工具箱 · 极客精神驱动</p>
      </footer>
    </div>
  );
};

export default App;
