# Playwright TypeScript Accessibility Testing Framework

This project is a Playwright-based testing framework for accessibility testing using Axe-core.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Configure environment variables:
- Create `.env`
- Add `BASE_URL={url}`
- Add `BROWSER={browser}`

## Running Tests

Run all tests:
```bash
npm test
```
or

```bash
npx playwright test
```
Run tests in headed mode:
```bash
npm run test:headed
```

Run tests with UI:
```bash
npm run test:ui
```

## Project Structure

- `core/` - Core framework components
  - `axe-helper.ts` - Axe accessibility testing utilities
  - `fixtures.ts` - Common test fixtures
  - `browser-management.ts` - Browser management utilities
  - `element.ts` - Web element declaration and interactions
- `tests/` - Test organization
  - `test` - Test files
    - `au.spec.ts` - Sample accessibility tests
  - `pages` - POM
    - `au-page.ts` - Sample page class
- `playwright.config.ts` - Playwright configuration
- `.env` - Environment variables
- `package.json` - Package

## Features

- TypeScript support
- Axe-core integration for accessibility testing
- Configurable browser support (Chrome, Edge)
- Environment-based configuration
- HTML test reports
- Modular and maintainable architecture
- Detailed accessibility violation reporting
- Element-specific accessibility testing