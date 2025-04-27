import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const browser = process.env.BROWSER || 'chromium';

export default defineConfig({
    testDir: './tests/test',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: false,
    },
    projects: [
        {
            name: browser,
            use: { ...devices[`Desktop ${browser.charAt(0).toUpperCase() + browser.slice(1)}`] },
        },
    ],
});