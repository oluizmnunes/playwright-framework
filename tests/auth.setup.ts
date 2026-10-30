import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/login.page";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("automation@test.com", "Autoproject12@");
  await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();

  // Save the authentication state to a file
  await page.context().storageState({ path: authFile });
});
