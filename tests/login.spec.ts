import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Page", () => {
  test("user can sign in", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("automation4@test.com", "Autoproject14@");
    await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();
  });

  test("user cannot sign in with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("inexistent@email.com", "password123");
    await expect(page.getByText("credentials invalid")).toBeVisible();
  });
});
