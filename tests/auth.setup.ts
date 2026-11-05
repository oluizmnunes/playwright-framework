import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/login.page";
import { editorUser, ensureUser } from "../helpers/ensure-user";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate user", async ({ page, request }) => {
  await ensureUser(request, editorUser);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(editorUser.email, editorUser.password);
  await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
