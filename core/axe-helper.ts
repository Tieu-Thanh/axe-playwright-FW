import { test as base, Page, TestInfo } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import type { Result, ImpactValue } from 'axe-core';
import path from 'path';
import * as fs from 'fs';
import { Element } from './element';

export interface AccessibilityViolation extends Result {
    impact: ImpactValue;
}

export interface AxeBuilderOptions {
    tags?: string[];
    exclude?: string[];
    disableRules?: string[];
}

export class AxeHelper {
    private readonly page: Page;
    private readonly builder: AxeBuilder;

    constructor(page: Page, options: AxeBuilderOptions = {}) {
        this.page = page;
        this.builder = new AxeBuilder({ page: this.page });
        this.configureBuilder(options);
    }

    private configureBuilder(options: AxeBuilderOptions = {}): AxeBuilder {
        const builder = this.builder;
        if (options.tags) {
            builder.withTags(options.tags);
        }
        if (options.exclude) {
            options.exclude.forEach(selector => builder.exclude(selector));
        }
        if (options.disableRules) {
            builder.disableRules(options.disableRules);
        }
        return builder;
    }

    /**
     * Scan the full page
     */
    async scanPage(options: AxeBuilderOptions = {}): Promise<AccessibilityViolation[]> {
        const builder = this.configureBuilder(options);
        const results = await builder.analyze();
        return results.violations as AccessibilityViolation[];
    }

    /**
     * Scan a specific part of the page
     */
    async scanPart(selector: string, options: AxeBuilderOptions = {}): Promise<AccessibilityViolation[]> {
        const builder = this.configureBuilder(options).include(selector);
        const results = await builder.analyze();
        return results.violations as AccessibilityViolation[];
    }

    /**
     * Scan a specific locator
     */
    async scanLocator(locator: string, options: AxeBuilderOptions = {}): Promise<AccessibilityViolation[]> {
        return this.scanPart(locator, options);
    }

    /**
     * Scan a specific element
     */
    async scanElement(element: Element, options: AxeBuilderOptions = {}): Promise<AccessibilityViolation[]> {
        return this.scanPart(element.getSelector(), options);
    }

    /**
     * Predefined scans by WCAG level
     */
    async scanWcag2a(): Promise<AccessibilityViolation[]> {
        return this.scanPage({ tags: ['wcag2a'] });
    }

    async scanWcag2aa(): Promise<AccessibilityViolation[]> {
        return this.scanPage({ tags: ['wcag2aa'] });
    }

    async scanWcag21a(): Promise<AccessibilityViolation[]> {
        return this.scanPage({ tags: ['wcag21a'] });
    }

    async scanWcag21aa(): Promise<AccessibilityViolation[]> {
        return this.scanPage({ tags: ['wcag21aa'] });
    }

    /**
     * Export scan results to a JSON attachment
     */
    async exportResults(testInfo: TestInfo, results: AccessibilityViolation[], fileName: string = 'a11y-report.json'): Promise<void> {
        const outputPath = path.join(testInfo.outputDir, fileName);

        await testInfo.attach('Accessibility Report', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json'
        });

        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

        console.log(`Accessibility results saved to ${outputPath}`);
    }
}
