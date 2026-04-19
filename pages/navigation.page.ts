import { Page, Locator } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly welcomeLink: Locator;
  readonly formLink: Locator;
  readonly stepperLink: Locator;
  readonly heroFormHeading: Locator;
  readonly stepperFirstTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeLink = page.getByRole('link', { name: 'Welcome' });
    this.formLink = page.getByRole('link', { name: 'Form' });
    this.stepperLink = page.getByRole('link', { name: 'Stepper' });
    this.heroFormHeading = page.getByRole('heading', { name: 'Hero Form' });
    this.stepperFirstTab = page.getByRole('tab', { name: 'Fill out your name' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToForm() {
    await this.formLink.click();
  }

  async navigateToStepper() {
    await this.stepperLink.click();
  }
}
