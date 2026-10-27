import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests', workers: 1, timeout: 30000,
 use: { baseURL: 'http://127.0.0.1:3198', launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined } },
 webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 3198 --strictPort', url: 'http://127.0.0.1:3198', reuseExistingServer: false },
});
