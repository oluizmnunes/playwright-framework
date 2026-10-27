import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.banner-logo')).toHaveAttribute('alt', 'Conduit');
});