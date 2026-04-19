import { Page, Locator } from '@playwright/test';

export class StepperPage {
  readonly page: Page;
  readonly nameTab: Locator;
  readonly addressTab: Locator;
  readonly doneTab: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly nextButtonStep1: Locator;
  readonly nextButtonStep2: Locator;
  readonly backButtonStep2: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameTab = page.getByRole('tab', { name: 'Fill out your name' });
    this.addressTab = page.getByRole('tab', { name: 'Fill out your address' });
    this.doneTab = page.getByRole('tab', { name: 'Done' });

    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.addressInput = page.getByRole('textbox', { name: 'Address' });

    this.nextButtonStep1 = page.getByRole('button', { name: 'Next' }).first();
    this.nextButtonStep2 = page.getByRole('button', { name: 'Next' }).nth(1);
    this.backButtonStep2 = page.getByRole('button', { name: 'Back' }).first();
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async goto() {
    await this.page.goto('/stepper');
  }

  async fillNameAndProceed(name: string) {
    await this.nameInput.fill(name);
    await this.nextButtonStep1.click();
  }

  async fillAddressAndProceed(address: string) {
    await this.addressInput.fill(address);
    await this.nextButtonStep2.click();
  }

  async goBackToStep1() {
    await this.backButtonStep2.click();
  }

  async resetStepper() {
    await this.resetButton.click();
  }
}
