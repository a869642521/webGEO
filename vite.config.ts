import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base 使用相对路径，便于将 dist/ 挂到子路径或部分静态托管场景
export default defineConfig({
  plugins: [react()],
  base: './',
});
