import { Page, Locator } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly alterEgoInput: Locator;
  readonly powerSelect: Locator;
  readonly submitButton: Locator;
  readonly newHeroButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.alterEgoInput = page.getByRole('textbox', { name: 'Alter Ego' });
    this.powerSelect = page.getByRole('combobox', { name: 'Hero Power' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.newHeroButton = page.getByRole('button', { name: 'New Hero' });
    this.successHeading = page.getByRole('heading', { name: 'You submitted the following:' });
  }

  async goto() {
    await this.page.goto('/form');
  }

  async fillHeroForm(name: string, alterEgo: string, power: string) {
    await this.nameInput.fill(name);
    await this.alterEgoInput.fill(alterEgo);
    await this.powerSelect.selectOption(power);
  }

  async submit() {
    await this.submitButton.click();
  }

  async clickNewHero() {
    await this.newHeroButton.click();
  }
}
