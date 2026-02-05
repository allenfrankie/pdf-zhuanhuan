
import React from 'react';
import { FileText, Presentation, Eraser, FileType, FileOutput } from 'lucide-react';
import { ToolType, ToolMetadata } from './types';

export const TOOLS: ToolMetadata[] = [
  {
    id: ToolType.PDF_TO_WORD,
    title: 'PDF 转 Word',
    description: '精准提取 PDF 内容并转换为可编辑的 Word 文档。',
    icon: 'file-text',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: ToolType.WORD_TO_PDF,
    title: 'Word 转 PDF',
    description: '保持原始排版，将 Word 文档快速转换为 PDF。',
    icon: 'file-output',
    color: 'from-blue-600/20 to-indigo-600/20'
  },
  {
    id: ToolType.PDF_TO_PPT,
    title: 'PDF 转 PPT',
    description: '将 PDF 页面识别为 PPT 幻灯片，方便演示。',
    icon: 'presentation',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: ToolType.PPT_TO_PDF,
    title: 'PPT 转 PDF',
    description: '高保真转换 PPT 演示文稿为通用的 PDF 格式。',
    icon: 'file-type',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: ToolType.PDF_WATERMARK,
    title: 'PDF 去水印',
    description: '智能扫描识别并一键清除 PDF 中的顽固水印。',
    icon: 'eraser',
    color: 'from-green-500/20 to-emerald-500/20'
  }
];

export const getIcon = (iconName: string, size = 24) => {
  switch (iconName) {
    case 'file-text': return <FileText size={size} />;
    case 'presentation': return <Presentation size={size} />;
    case 'eraser': return <Eraser size={size} />;
    case 'file-type': return <FileType size={size} />;
    case 'file-output': return <FileOutput size={size} />;
    default: return <FileText size={size} />;
  }
};
