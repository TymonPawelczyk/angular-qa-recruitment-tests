import { test, expect } from '../fixtures';

test.describe('Welcome Page', () => {
  test.beforeEach(async ({ welcomePage }) => {
    await welcomePage.goto();
  });

  test('should change terminal command text when clicking Next Steps buttons', async ({
    welcomePage,
  }) => {
    await expect(welcomePage.terminalText).toContainText('ng generate component xyz');

    await welcomePage.angularMaterialButton.click();
    await expect(welcomePage.terminalText).toContainText('ng add @angular/material');

    await welcomePage.addPwaSupportButton.click();
    await expect(welcomePage.terminalText).toContainText('ng add @angular/pwa');

    await welcomePage.buildForProductionButton.click();
    await expect(welcomePage.terminalText).toContainText('ng build');
  });
});
