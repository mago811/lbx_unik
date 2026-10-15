import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.uniksofas.es', // PENDIENTE: dominio definitivo
  trailingSlash: 'never',
  // Todo es estático salvo /api/contacto (función serverless en Vercel)
  adapter: vercel(),
});
