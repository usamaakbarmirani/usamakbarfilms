import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IncomingMessage, ServerResponse } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA_ROOT = '/Volumes/Seagate Exp/web material'

const MIME: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

function resolveMedia(urlPath: string): string | null {
  const raw = decodeURIComponent(urlPath.split('?')[0] ?? '')
  if (
    raw !== '/Logo.png' &&
    !raw.startsWith('/Images/') &&
    !raw.startsWith('/video/')
  ) {
    return null
  }
  const relative = raw.replace(/^\//, '').replace(/^Images\/bw\//, 'Images/b:w/')
  const file = path.resolve(MEDIA_ROOT, relative)
  if (!file.startsWith(path.resolve(MEDIA_ROOT))) return null
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null
}

function sendFile(req: IncomingMessage, res: ServerResponse, file: string) {
  const stat = fs.statSync(file)
  const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
  const range = req.headers.range
  const match = range ? /bytes=(\d+)-(\d*)/.exec(range) : null
  if (match) {
    const start = Number(match[1])
    const end = match[2] ? Number(match[2]) : stat.size - 1
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': type,
    })
    fs.createReadStream(file, { start, end }).pipe(res)
    return
  }
  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': type,
    'Accept-Ranges': 'bytes',
  })
  fs.createReadStream(file).pipe(res)
}

function mediaMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const file = resolveMedia(req.url ?? '')
  if (!file) {
    next()
    return
  }
  sendFile(req, res, file)
}

function serveParentMedia() {
  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use((req, res, next) => {
      mediaMiddleware(req, res, next)
    })
  }
  return {
    name: 'serve-parent-media',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveParentMedia()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    fs: { allow: [path.resolve(__dirname), MEDIA_ROOT] },
  },
})
