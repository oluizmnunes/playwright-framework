import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('user can sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('automation@test.com', 'Autoproject12@');

  await expect(page.getByRole('link', { name: 'automation' })).toBeVisible();
});

test.only('user cannot sign in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('inexistent@email.com', 'password123');
  await expect(page.getByText('credentials invalid')).toBeVisible();
});