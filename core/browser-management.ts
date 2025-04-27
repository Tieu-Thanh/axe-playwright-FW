import { Browser, BrowserContext, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class BrowserManager {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    /**
     * Initialize the browser with default settings
     * @param browser Playwright browser instance
     * @returns Promise<Page>
     */
    async initialize(browser: Browser): Promise<Page> {
        this.browser = browser;
        this.context = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        this.page = await this.context.newPage();
        return this.page;
    }

    /**
     * Open the configured URL from .env or playwright.config.ts
     * @returns Promise<void>
     */
    async open(url: string = '/'): Promise<void> {
        if (!this.page) {
            throw new Error('Browser not initialized. Call initialize() first.');
        }

        await this.page.goto(url);
    }

    /**
     * Close browser resources
     */
    async close(): Promise<void> {
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
    }

    /**
     * Get the current page
     * @returns Page | null
     */
    getPage(): Page | null {
        return this.page;
    }

    /**
     * Get the current browser context
     * @returns BrowserContext | null
     */
    getContext(): BrowserContext | null {
        return this.context;
    }
}