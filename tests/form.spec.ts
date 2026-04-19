import { test, expect } from '../fixtures';
import { testData } from '../data/test-data';

test.describe('Hero Form', () => {
  test.beforeEach(async ({ formPage }) => {
    await formPage.goto();
  });

  test('should fill and submit the hero form', async ({ page, formPage }) => {
    const { name, alterEgo, power } = testData.heroForm.validHero;

    await formPage.fillHeroForm(name, alterEgo, power);
    await formPage.submit();

    await expect(formPage.successHeading).toBeVisible();
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await expect(page.getByText(alterEgo, { exact: true })).toBeVisible();
  });

  test('should clear the form when New Hero is clicked', async ({ formPage }) => {
    const { name } = testData.heroForm.newHero;

    await formPage.nameInput.fill(name);
    await formPage.clickNewHero();

    await expect(formPage.nameInput).toHaveValue('');
  });
});
