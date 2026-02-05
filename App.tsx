
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
      
      a.download = file.name.split('.')[0] + '_processed' + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatus('completed');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('处理过程中发生错误，请重试。');
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-blue-500/30">
      <Background />
      
      <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 flex items-center justify-between glass">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedToolId(null)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xl">W</div>
          <span className="font-bold tracking-tight text-lg">William.Zhan <span className="text-white/40 font-normal">的文档工具</span></span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">使用说明</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">关于作者</a>
          <a href="https://github.com" target="_blank" className="p-2 rounded-full hover:bg-white/10 transition-all">
            <Github size={20} />
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 container mx-auto">
        <AnimatePresence mode="wait">
          {!selectedToolId ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                >
                  极简·高效·安全
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/50 leading-relaxed"
                >
                  专为专业人士打造的文档处理实验室。无需上传服务器，所有操作均在浏览器内通过 WebAssembly 技术本地完成，确保您的数据绝对安全。
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {TOOLS.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <ToolCard tool={tool} onClick={handleToolClick} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={handleBack}
                className="flex items-center text-white/40 hover:text-white mb-8 group transition-colors"
              >
                <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" />
                返回首页
              </button>
              
              <div className="mb-12 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedTool?.color} mb-6`}>
                   {selectedTool && (
                     <div className="text-blue-400">
                        {selectedTool.title.includes('PDF') ? <FileText size={40} /> : <Presentation size={40} />}
                     </div>
                   )}
                </div>
                <h2 className="text-4xl font-bold mb-4">{selectedTool?.title}</h2>
                <p className="text-white/50">{selectedTool?.description}</p>
              </div>

              <FileUploader 
                onFileSelect={handleFileProcess} 
                status={status} 
                progressText={progressText}
                onReset={() => setStatus('idle')}
              />
              
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4 text-blue-400">01</div>
                  <h4 className="font-semibold mb-2">隐私至上</h4>
                  <p className="text-sm text-white/40">文件在本地处理，不经过任何服务器。</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4 text-blue-400">02</div>
                  <h4 className="font-semibold mb-2">极致极速</h4>
                  <p className="text-sm text-white/40">基于 WebAssembly，毫秒级解析响应。</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4 text-blue-400">03</div>
                  <h4 className="font-semibold mb-2">高保真度</h4>
                  <p className="text-sm text-white/40">智能识别层级，最大程度还原排版。</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-10 text-center text-white/20 text-sm border-t border-white/5">
        <p>© 2024 William.Zhan Document Tools. All Rights Reserved.</p>
        <p className="mt-2">Made with ♥ using Next.js & WebAssembly</p>
      </footer>
    </div>
  );
};

export default App;
