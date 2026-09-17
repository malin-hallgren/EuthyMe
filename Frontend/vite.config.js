import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     cert: fs.readFileSync(path.resolve(import.meta.dirname, 'certs', 'localhost.crt')),
  //     key: fs.readFileSync(path.resolve(import.meta.dirname, 'certs', 'localhost.key'))
  //   },
  //   port: 5173,
  //   host: 'localhost'
  // }
})
