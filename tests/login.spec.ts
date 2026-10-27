import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('user can sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('automation@test.com', 'Autoproject12@');

  await expect(page.getByRole('link', { name: 'automation' })).toBeVisible();
});