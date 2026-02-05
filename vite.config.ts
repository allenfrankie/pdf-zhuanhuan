import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          pdf: ['pdf-lib', 'pdfjs-dist'],
          office: ['mammoth', 'pptxgenjs']
        }
      }
    }
  },
  server: {
    port: 3000,
  }
});