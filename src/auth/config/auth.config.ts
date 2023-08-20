import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  CONNECTION_URI: process.env.CONNECTION_URI ?? '',
  appInfo: {
    APP_NAME: process.env.APP_NAME ?? 'Default Name',
    API_DOMAIN: process.env.API_DOMAIN ?? 'http://localhost:3000',
    WEBSITE_DOMAIN: process.env.WEBSITE_DOMAIN ?? 'http://localhost:5000',
    API_BASE_PATH: process.env.API_BASE_PATH ?? '/api',
    WEBSITE_BASE_PATH: process.env.WEBSITE_BASE_PATH ?? '/',
  },
}));
