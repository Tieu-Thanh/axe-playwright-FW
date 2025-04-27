import { test as base, expect } from '../../core/fixtures';
import { AUPage } from '../pages/au-page';

// Extend the base test with AUPage
const test = base.extend<{ auPage: AUPage }>({
    auPage: async ({ browserManager }, use) => {
        const page = await browserManager.getPage();
        if (!page) {
            throw new Error('Page not initialized by BrowserManager');
        }
        const auPage = new AUPage(page);
        await use(auPage);
    },
});

test.describe('Accessible University Page Accessibility Tests', () => {
    test.beforeEach(async ({ browserManager, baseURL }) => {
        await browserManager.open(baseURL);
    });

    test('Full Page Accessibility Scan', async ({ axeHelper, auPage }, testInfo) => {
        const violations = await axeHelper.scanPage();

        // Export results before assertion
        await axeHelper.exportResults(testInfo, violations, 'full-page-scan.json');

        // Assert after exporting
        expect(violations.length).toBe(0);
    });

    test('Menu Section Accessibility Scan', async ({ axeHelper, auPage }, testInfo) => {
        const violations = await axeHelper.scanElement(auPage.menu);

        // Export results before assertion
        await axeHelper.exportResults(testInfo, violations, 'menu-scan.json');

        // Assert after exporting
        expect(violations.length).toBe(0);
    });

    test('Form Section Accessibility Scan', async ({ axeHelper, auPage }, testInfo) => {
        const violations = await axeHelper.scanElement(auPage.appForm);

        // Export results before assertion
        await axeHelper.exportResults(testInfo, violations, 'form-scan.json');

        // Assert after exporting
        expect(violations.length).toBe(0);
    });

    test('WCAG 2.0 AA Compliance Scan', async ({ axeHelper, auPage }, testInfo) => {
        const violations = await axeHelper.scanWcag2aa();

        // Export results before assertion
        await axeHelper.exportResults(testInfo, violations, 'wcag2aa-scan.json');

        // Assert after exporting
        expect(violations.length).toBe(0);
    });

    test('WCAG 2.1 AA Compliance Scan', async ({ axeHelper, auPage }, testInfo) => {
        const violations = await axeHelper.scanWcag21aa();

        // Export results before assertion
        await axeHelper.exportResults(testInfo, violations, 'wcag21aa-scan.json');

        // Assert after exporting
        expect(violations.length).toBe(0);
    });
});