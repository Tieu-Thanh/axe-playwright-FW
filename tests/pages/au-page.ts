import { Page, Locator } from '@playwright/test';
import { Element } from '../../core/element';

export class AUPage {
    page: Page;
    logo: Element;
    menu: Element;
    enrollment: Element;
    appForm: Element;

    constructor(page: Page) {
        this.page = page;
        this.logo = new Element(page, '#logo');
        this.menu = new Element(page, '#menu');
        this.enrollment = new Element(page, '#enrollment');
        this.appForm = new Element(page, '#appForm');
    }

}