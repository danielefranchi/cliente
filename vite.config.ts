
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { componentTagger } from '@lovable/component-tagger';
import path from 'path';

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: true,
    minify: mode === 'production',
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger({
      projectId: process.env.VITE_LOVABLE_PROJECT_ID,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
