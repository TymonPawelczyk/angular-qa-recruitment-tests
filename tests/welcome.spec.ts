import { test, expect } from '../fixtures';

test.describe('Welcome Page', () => {
  test.beforeEach(async ({ welcomePage }) => {
    await welcomePage.goto();
  });

  test('should change terminal command text when clicking Next Steps buttons', async ({
    page,
    welcomePage,
  }) => {
    await expect(page.getByText('ng generate component xyz')).toBeVisible();

    await welcomePage.angularMaterialButton.click();
    await expect(page.getByText('ng add @angular/material')).toBeVisible();

    await welcomePage.addPwaSupportButton.click();
    await expect(page.getByText('ng add @angular/pwa')).toBeVisible();

    await welcomePage.buildForProductionButton.click();
    await expect(page.getByText('ng build')).toBeVisible();
  });
});
