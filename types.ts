
export enum ToolType {
  PDF_TO_WORD = 'pdf-to-word',
  WORD_TO_PDF = 'word-to-pdf',
  PDF_TO_PPT = 'pdf-to-ppt',
  PPT_TO_PDF = 'ppt-to-pdf',
  PDF_WATERMARK = 'pdf-watermark'
}

export interface ToolMetadata {
  id: ToolType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export type ProcessingStatus = 'idle' | 'uploading' | 'scanning' | 'converting' | 'completed' | 'error';
