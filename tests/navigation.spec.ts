import { test, expect } from '../fixtures';

test.describe('Navigation', () => {
  test.beforeEach(async ({ navigationPage }) => {
    await navigationPage.goto();
  });

  test('should display the main banner and navigate to Form page', async ({
    page,
    navigationPage,
  }) => {
    await expect(navigationPage.welcomeLink).toBeVisible();

    await navigationPage.navigateToForm();

    await expect(page).toHaveURL(/.*\/form/);
    await expect(navigationPage.heroFormHeading).toBeVisible();
  });

  test('should navigate to Stepper page', async ({ page, navigationPage }) => {
    await navigationPage.navigateToStepper();

    await expect(page).toHaveURL(/.*\/stepper/);
    await expect(navigationPage.stepperFirstTab).toBeVisible();
  });
});
