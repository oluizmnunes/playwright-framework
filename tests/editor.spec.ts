import { test, expect } from '@playwright/test';
import { EditorPage } from '../pages/editor.page';
import { faker } from '@faker-js/faker';


test.describe('Editor Page', () => {
  test('user can create a new article', async ({ page }) => {
    const editorPage = new EditorPage(page);

    const article = {
      title: faker.lorem.sentence(),
      about: 'Auto-waiting',
      content: 'Playwright performs a range of actionability checks...',
      tags: ['Visible', 'Stable', 'Receives Events', 'Enable', 'Editable'],
    };

    await page.goto('/');
    await page.getByRole('link', { name: 'New Article' }).click();
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