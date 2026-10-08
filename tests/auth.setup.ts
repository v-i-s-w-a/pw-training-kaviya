import { test as setup, expect } from "@playwright/test";

setup("authenticate as standard_user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: ".auth/user.json" });
});

setup("authenticate as problem_user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("problem_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: ".auth/problem.json" });
});
