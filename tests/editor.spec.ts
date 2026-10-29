import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EditorPage } from '../pages/editor.page';
import { faker } from '@faker-js/faker';

test('user can create a new article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);

  await loginPage.goto();
  await loginPage.login('automation@test.com', 'Autoproject12@');
  await page.getByRole('link', { name: 'New Article' }).click();

  const articleTitle = faker.lorem.sentence();
  const articleAbout = 'Auto-waiting';
  const articleDescription = 'Playwright performs a range of actionability checks...';
  const articleTags = ['Visible', 'Stable', 'Receives Events', 'Enable', 'Editable'];

  await editorPage.fillArticleFields(articleTitle, articleAbout, articleDescription, articleTags);
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await expect(page.getByRole('heading', { name: articleTitle, level: 1 })).toBeVisible();
});