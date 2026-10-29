import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EditorPage } from '../pages/editor.page';
import { faker } from '@faker-js/faker';


test.describe('Editor Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('automation@test.com', 'Autoproject12@');
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
  });

  test('user can create a new article', async ({ page }) => {
    const editorPage = new EditorPage(page);

    await page.getByRole('link', { name: 'New Article' }).click();

    const article = {
      title: faker.lorem.sentence(),
      about: 'Auto-waiting',
      content: 'Playwright performs a range of actionability checks...',
      tags: ['Visible', 'Stable', 'Receives Events', 'Enable', 'Editable'],
    };

    await editorPage.fillArticleFields(article);
    await page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(page.getByRole('heading', { name: article.title, level: 1 })).toBeVisible();
  });

  test('user can delete a new article', async ({ page }) => {
    const editorPage = new EditorPage(page);

    const article = {
      title: faker.lorem.sentence(),
      about: 'Auto-waiting',
      content: 'Playwright performs a range of actionability checks...',
      tags: ['Visible', 'Stable', 'Receives Events', 'Enable', 'Editable'],
    };

    await editorPage.publishArticle(article);
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByRole('navigation').getByRole('link', { name: 'Conduit' }).click();
    await expect(page.getByRole('heading', { name: article.title, level: 1 })).not.toBeVisible();
  });
});