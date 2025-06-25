import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: ['dd18-103-240-33-154.ngrok-free.app',
      'eb4c-103-240-33-154.ngrok-free.app'
    ],
    
    // Other server options (e.g., port, host) if present
  },
});
