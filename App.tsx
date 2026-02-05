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
    setProgressText('');
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
      
      a.download = `${file.name.split('.')[0]}_WilliamZhan_${Date.now()}${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatus('completed');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('处理过程中发生错误，请重试。建议检查文件大小及是否包含密码。');
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-blue-500/30 font-sans">
      <Background />
      
      {/* 极简流体导航栏 */}
      <nav className="fixed top-0 inset-x-0 z-50 h-24 px-10 flex items-center justify-between border-b border-white/5" style={{ backdropFilter: 'blur(40px)', background: 'rgba(2, 2, 5, 0.4)' }}>
        <div className="flex items-center space-x-5 cursor-pointer group" onClick={() => setSelectedToolId(null)}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 180 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center font-black text-2xl shadow-2xl shadow-blue-500/20"
          >
            W
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-2xl leading-none">William.Zhan</span>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mt-1.5">效率实验室 · 文档处理</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-12">
          {['隐私协议', '关于实验室', '开发文档'].map((item) => (
            <a key={item} href="#" className="text-sm font-semibold text-white/40 hover:text-blue-400 transition-all tracking-widest">{item}</a>
          ))}
          <a href="https://github.com" target="_blank" className="p-3 rounded-full border border-white/10 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all">
            <Github size={20} className="text-white/60" />
          </a>
        </div>
      </nav>

      <main className="pt-48 pb-24 px-6 container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!selectedToolId ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-32 max-w-5xl mx-auto">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="inline-block px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[11px] font-black tracking-[0.4em] mb-12 uppercase"
                >
                  本地加密转换 · 100% 隐私安全
                </motion.div>
                <h1 className="text-6xl md:text-9xl font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 tracking-tighter leading-[1.05]">
                  重新定义<br />文档处理。
                </h1>
                <p className="text-xl text-white/40 leading-relaxed font-light max-w-2xl mx-auto">
                  基于先进的 WebAssembly 技术。所有转换均在浏览器沙盒中完成，文件永远不会上传至服务器，极致保护您的数据资产。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {TOOLS.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.1, duration: 0.8 }}
                  >
                    <ToolCard tool={tool} onClick={handleToolClick} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={handleBack}
                className="flex items-center text-white/40 hover:text-white mb-16 group transition-all font-semibold tracking-widest uppercase text-xs"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-5 group-hover:border-white/30 group-hover:-translate-x-1 transition-all">
                  <ChevronLeft size={20} />
                </div>
                返回工具中心
              </button>
              
              <div className="mb-20 text-center">
                <motion.div 
                  layoutId={`icon-${selectedTool?.id}`}
                  className={`inline-flex p-8 rounded-[2.5rem] bg-gradient-to-br ${selectedTool?.color} mb-10 shadow-3xl shadow-blue-500/20 border border-white/10`}
                  style={{ backdropFilter: 'blur(40px)' }}
                >
                   {selectedTool && (
                     <div className="text-blue-400">
                        {selectedTool.title.includes('PPT') ? <Presentation size={64} /> : <FileText size={64} />}
                     </div>
                   )}
                </motion.div>
                <h2 className="text-6xl font-black mb-6 tracking-tight leading-tight">{selectedTool?.title}</h2>
                <p className="text-white/40 text-xl font-light max-w-2xl mx-auto leading-relaxed">{selectedTool?.description}</p>
              </div>

              <FileUploader 
                onFileSelect={handleFileProcess} 
                status={status} 
                progressText={progressText}
                onReset={() => setStatus('idle')}
              />
              
              <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
                {[
                  { title: '私有环境', desc: '文件不出浏览器沙盒' },
                  { title: '无缝导出', desc: '完美还原排版细节' },
                  { title: '离线可用', desc: '一次加载，随时使用' }
                ].map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-[11px] font-black text-blue-500/50 uppercase tracking-[0.4em] mb-3 group-hover:text-blue-400 transition-colors">{item.title}</div>
                    <div className="text-base text-white/30 group-hover:text-white/60 transition-colors font-light">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-20 text-center border-t border-white/5 bg-[#020205]/60" style={{ backdropFilter: 'blur(40px)' }}>
        <p className="text-white/10 text-[10px] font-black tracking-[0.6em] uppercase mb-5">William.Zhan Digital Innovation Laboratory</p>
        <p className="text-white/40 text-sm font-light">© 2025 全能文档处理套件 · 隐私驱动型工具 · 极客精神</p>
      </footer>
    </div>
  );
};

export default App;