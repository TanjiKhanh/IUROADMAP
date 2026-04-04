import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // 👇 FIX THIS BLOCK
      '/admin': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Bypass proxy if the request is for an HTML page (Browser Navigation)
        bypass: (req, res, options) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return req.url;
          }
        },
      },
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/public': {
        target: 'http://localhost:8080',
        changeOrigin: true, 
        secure: false,
      },
      '/mentors': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/mentor-profiles': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});