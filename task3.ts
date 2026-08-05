import { test, expect } from "@playwright/test";

test("saucedemo has title Swag Labs and correct URL", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
