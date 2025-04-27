import { test as base } from '@playwright/test';
import { AxeHelper } from './axe-helper';
import { BrowserManager } from './browser-management';

interface CustomFixtures {
    browserManager: BrowserManager;
    axeHelper: AxeHelper;
}

// Extend the base test with custom fixtures
export const test = base.extend<CustomFixtures>({
    browserManager: async ({ browser, }, use) => {
        const manager = new BrowserManager();
        await manager.initialize(browser);
        await use(manager);
        await manager.close();
    },
    axeHelper: async ({ browserManager }, use) => {
        const managedPage = browserManager.getPage();
        if (!managedPage) {
            throw new Error('Page not initialized by BrowserManager');
        }
        const axeHelper = new AxeHelper(managedPage);
        await use(axeHelper);
    },
});

export { expect } from '@playwright/test';
