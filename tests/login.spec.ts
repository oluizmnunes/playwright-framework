import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ensureUser, loginUser } from "../helpers/ensure-user";

test.describe("Login Page", () => {
  test.describe("valid account", () => {
    test.beforeEach(async ({ request }) => {
      await ensureUser(request, loginUser);
    });

    test("user can sign in", async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(loginUser.email, loginUser.password);
      await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();
    });

    test("user can sign out", async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(loginUser.email, loginUser.password);
      await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();

      await page.getByRole("link", { name: "Settings" }).click();
      await page.getByRole("button", { name: "Or click here to logout." }).click();
      await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    });
  });

  test("user cannot sign in with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("inexistent@email.com", "password123");
    await expect(page.getByText("credentials invalid")).toBeVisible();
  });
});
