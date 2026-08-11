import { test, expect } from "@playwright/test";

import { CartPage } from "../pages/CartPage";

test("Add two products, verify cart, remove one product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Onesie" })
    .getByRole("button", { name: /add to cart/i })
    .click();

  await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" })
    .getByRole("button", { name: /add to cart/i })
    .click();

  const cartPage = new CartPage(page);
  await cartPage.open();

  await expect(cartPage.itemNames()).toContainText([
    "Sauce Labs Onesie",
    "Sauce Labs Backpack",
  ]);

  await cartPage.removeItems("Sauce Labs Backpack").click();
  await expect(cartPage.itemNames()).toHaveText("Sauce Labs Onesie");
});
