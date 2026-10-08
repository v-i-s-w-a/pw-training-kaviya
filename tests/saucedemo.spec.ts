import { test, expect } from "@playwright/test";

// These tests need a logged-out browser (login page / locked_out_user)
test.use({ storageState: { cookies: [], origins: [] } });

test("saucedemo has title Swag Labs and correct URL", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test("locked_out_user shows error banner", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByTestId("username").fill("locked_out_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("error")).toBeVisible();
});
