import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


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
