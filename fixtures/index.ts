import { test as base } from '@playwright/test';
import { NavigationPage } from '../pages/navigation.page';
import { FormPage } from '../pages/form.page';
import { StepperPage } from '../pages/stepper.page';
import { WelcomePage } from '../pages/welcome.page';

type MyFixtures = {
  navigationPage: NavigationPage;
  formPage: FormPage;
  stepperPage: StepperPage;
  welcomePage: WelcomePage;
};

export const test = base.extend<MyFixtures>({
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },
  stepperPage: async ({ page }, use) => {
    await use(new StepperPage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
});

export { expect } from '@playwright/test';
