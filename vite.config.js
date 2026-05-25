import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    // Plugin para servir .m2ts com MIME type correto de vídeo
    {
      name: 'video-mime',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.m2ts')) {
            res.setHeader('Content-Type', 'video/mp2t')
            res.setHeader('Accept-Ranges', 'bytes')
          }
          next()
        })
      },
    },
  ],
})
