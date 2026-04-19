import { Page, Locator } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;
  readonly newComponentButton: Locator;
  readonly angularMaterialButton: Locator;
  readonly addPwaSupportButton: Locator;
  readonly addDependencyButton: Locator;
  readonly runAndWatchTestsButton: Locator;
  readonly buildForProductionButton: Locator;
  readonly terminalText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newComponentButton = page.getByRole('button', { name: 'New Component' });
    this.angularMaterialButton = page.getByRole('button', { name: 'Angular Material' });
    this.addPwaSupportButton = page.getByRole('button', { name: 'Add PWA Support' });
    this.addDependencyButton = page.getByRole('button', { name: 'Add Dependency' });
    this.runAndWatchTestsButton = page.getByRole('button', { name: 'Run and Watch Tests' });
    this.buildForProductionButton = page.getByRole('button', { name: 'Build for Production' });

    this.terminalText = page.locator('.terminal pre');
  }

  async goto() {
    await this.page.goto('/');
  }
}
