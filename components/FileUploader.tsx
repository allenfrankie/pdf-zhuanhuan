
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';

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
            className={`relative border-2 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 glass group
              ${isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/20'}`}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.pptx"
            />
            <div className={`p-6 rounded-full bg-white/5 mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ${isDragging ? 'bg-blue-500/20 text-blue-400' : 'text-white/40'}`}>
              <Upload size={48} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-white/80">拖拽文件到此处，或点击上传</h3>
            <p className="text-sm text-white/40">支持 PDF, Word (DOCX), PPT (PPTX) 格式</p>
          </motion.div>
        )}

        {(status === 'uploading' || status === 'processing') && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[2rem] p-12 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Liquid Progress Glow */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            
            <Loader2 size={48} className="text-blue-400 animate-spin mb-6" />
            <h3 className="text-xl font-medium mb-4 text-white">{progressText || '正在处理中...'}</h3>
            <div className="flex items-center space-x-2 text-white/50 text-sm">
              <FileText size={16} />
              <span>{selectedFile?.name}</span>
            </div>

            {/* Scanning line animation for watermark removal */}
            {progressText?.includes('扫描') && (
               <motion.div 
                 className="absolute left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                 animate={{ top: ['0%', '100%', '0%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
            )}
          </motion.div>
        )}

        {status === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[2rem] p-12 flex flex-col items-center justify-center text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-6 rounded-full bg-green-500/20 text-green-400 mb-6"
            >
              <CheckCircle size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-white">转换完成！</h3>
            <p className="text-white/60 mb-8">您的文件已准备就绪，系统将自动开始下载。</p>
            
            <button
              onClick={() => {
                setSelectedFile(null);
                onReset();
              }}
              className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
            >
              继续处理下一个文件
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;
