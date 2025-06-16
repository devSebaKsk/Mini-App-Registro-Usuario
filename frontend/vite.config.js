import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const codespaceName = process.env.CODESPACE_NAME;
let flaskBackendUrl = '';


if (codespaceName) {
  flaskBackendUrl = `https://${codespaceName}-5000.app.github.dev`;
} else {
  flaskBackendUrl = 'http://localhost:5000';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   define: {
    'import.meta.env.VITE_FLASK_BACKEND_URL': JSON.stringify(flaskBackendUrl)
  }
})
