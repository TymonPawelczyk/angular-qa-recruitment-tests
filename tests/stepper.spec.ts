import { test, expect } from '../fixtures';
import { testData } from '../data/test-data';

test.describe('Stepper Flow', () => {
  test.beforeEach(async ({ stepperPage }) => {
    await stepperPage.goto();
  });

  test('should complete the full stepper flow successfully', async ({ page, stepperPage }) => {
    const { name, address } = testData.stepper.validUser;

    await expect(stepperPage.nameTab).toHaveAttribute('aria-selected', 'true');
    await stepperPage.fillNameAndProceed(name);

    await expect(stepperPage.addressTab).toHaveAttribute('aria-selected', 'true');
    await stepperPage.fillAddressAndProceed(address);

    await expect(stepperPage.doneTab).toHaveAttribute('aria-selected', 'true');

    await expect(page.getByText('You are now done!')).toBeVisible();
    await expect(page.getByText(`Name: ${name}`)).toBeVisible();
    await expect(page.getByText(`Address: ${address}`)).toBeVisible();
  });

  test('should allow navigating back to previous steps and retain data', async ({
    stepperPage,
  }) => {
    const { name } = testData.stepper.backAndForthUser;

    await stepperPage.fillNameAndProceed(name);

    await stepperPage.goBackToStep1();
    await expect(stepperPage.nameTab).toHaveAttribute('aria-selected', 'true');
    await expect(stepperPage.nameInput).toHaveValue(name);
  });

  test('should reset the stepper to initial state', async ({ stepperPage }) => {
    const { name, address } = testData.stepper.resetUser;

    await stepperPage.fillNameAndProceed(name);
    await stepperPage.fillAddressAndProceed(address);

    await stepperPage.resetStepper();

    await expect(stepperPage.nameTab).toHaveAttribute('aria-selected', 'true');
    await expect(stepperPage.nameInput).toHaveValue('');
  });
});
