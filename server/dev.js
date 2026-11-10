// `npm run dev`: starts the local API (same code Vercel runs) and the Vite dev server.
import { createServer } from 'vite';
import { startApi } from './dev-api.js';

const apiPort = await startApi();
const vite = await createServer({
  server: { proxy: { '/api': `http://localhost:${apiPort}` } },
});
await vite.listen();
vite.printUrls();
console.log('  Admin panel: /admin  (local password: admin123, or ADMIN_PASSWORD if set)\n');
