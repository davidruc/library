import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: env.VITE_PORT_FRONTEND,
    host: env.VITE_HOSTNAME
  }
})
