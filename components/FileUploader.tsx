
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, Loader2, FileText } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  status: 'idle' | 'uploading' | 'processing' | 'completed';
  progressText?: string;
  onReset: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, status, progressText, onReset }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelect(files[0]);
    }
  };

  const triggerInput = () => {
    if (status !== 'idle') return;
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerInput}
            className={`relative border-2 border-dashed rounded-[2.5rem] p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden
              ${isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
            style={{ backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.02)' }}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.pptx"
            />
            <div className={`p-8 rounded-full bg-white/5 mb-8 transition-all duration-700 ${isDragging ? 'bg-blue-500/20 text-blue-400 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'text-white/20'}`}>
              <Upload size={56} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white/80">上传或拖拽文件</h3>
            <p className="text-sm text-white/30 tracking-widest font-medium">支持 PDF, Word (DOCX), PPT (PPTX) 格式</p>
          </motion.div>
        )}

        {status === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] p-16 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {/* 动态扫描线 */}
            <motion.div 
              className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-20"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <Loader2 size={64} className="text-blue-500 animate-spin mb-8" />
            <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">{progressText || '转换引擎正在全速运转...'}</h3>
            <div className="flex items-center space-x-3 px-6 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 text-sm font-medium">
              <FileText size={16} className="text-blue-400" />
              <span className="truncate max-w-[200px]">{selectedFile?.name}</span>
            </div>
          </motion.div>
        )}

        {status === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center"
            style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-8 rounded-full bg-blue-500/20 text-blue-400 mb-8 border border-blue-500/30"
            >
              <CheckCircle size={64} />
            </motion.div>
            <h3 className="text-3xl font-black mb-4 text-white">转换已完成！</h3>
            <p className="text-white/40 mb-12 font-medium">您的文档已就绪，正在通过浏览器发起下载...</p>
            
            <button
              onClick={() => {
                setSelectedFile(null);
                onReset();
              }}
              className="px-10 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all shadow-xl hover:shadow-white/5"
            >
              处理另一个文档
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;
