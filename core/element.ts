import { Page, Locator } from 'playwright';

export class Element {
    protected locator: Locator;
    private selector: string;

    constructor(page: Page, selector: string) {
        this.selector = selector;
        this.locator = page.locator(selector);
    }

    getSelector(): string {
        return this.selector;
    }

    async click(): Promise<this> {
        await this.waitForElement('visible');
        await this.locator.click();
        return this;
    }

    async hover() {
        await this.waitForElement('visible');
        await this.locator.hover();
    }

    async enterText(text: string) {
        await this.waitForElement('visible');
        await this.locator.fill(text);
    }

    async clearText() {
        await this.waitForElement('visible');
        await this.locator.fill('');
    }

    async getText() {
        await this.waitForElement('visible');
        return await this.locator.textContent();
    }

    async submit() {
        await this.waitForElement('visible');
        await this.locator.press('Enter');
    }

    async selectByValue(value: string) {
        await this.waitForElement('visible');
        await this.locator.selectOption({ value });
    }

    async selectByText(text: string) {
        await this.waitForElement('visible');
        await this.locator.selectOption({ label: text });
    }

    async typeTextAndEnter(text: string) {
        await this.waitForElement('visible');
        await this.locator.fill(text);
        await this.locator.press('Enter');
    }

    async isVisible() {
        return this.waitForElement('visible', false);
    }

    async isClickable() {
        try {
            await this.waitForElement('attached');
            return await this.locator.isEnabled();
        } catch {
            return false;
        }
    }

    async isLocated() {
        return this.waitForElement('attached', false);
    }

    async scrollToElement() {
        await this.waitForElement('visible');
        await this.locator.scrollIntoViewIfNeeded();
    }

    async getHeaderIndices(headerSelector: string): Promise<{ [key: string]: number }> {
        const headerCells = await this.locator.locator(headerSelector).elementHandles();
        const indices: { [key: string]: number } = {};

        for (let i = 0; i < headerCells.length; i++) {
            const textContent = await headerCells[i].textContent();
            if (textContent) {
                indices[textContent] = i;
            }
        }

        return indices;
    }

    async findElements(selector: string) {
        await this.waitForElement('visible');
        return await this.locator.locator(selector).elementHandles();
    }

    async getElements() {
        await this.waitForElement('visible');
        return await this.locator.elementHandles();
    }

    async getAttribute(attributeName: string): Promise<string | null> {
        await this.waitForElement('visible');
        return await this.locator.getAttribute(attributeName);
    }

    // Helper method to handle different locator strategies
    static fromSelector(page: Page, selector: string): Element {
        return new Element(page, selector);
    }

    private async waitForElement(state: 'attached' | 'visible', throwOnError: boolean = true, timeout: number = 5000): Promise<boolean> {
        await this.locator.waitFor({ state, timeout });
        return true;
    }
}