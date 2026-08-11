import { test, expect } from "@playwright/test";

import { CartPage } from "../pages/CartPage";

test("Add two products, verify cart, remove one product", async ({ page }) => {
  // Login first
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Add two products
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

  // Open cart and check both products
  const cartPage = new CartPage(page);
  await cartPage.open();

  expect(await cartPage.itemNames()).toEqual([
    "Sauce Labs Onesie",
    "Sauce Labs Backpack",
  ]);

  // Remove one product and check the other remains
  await cartPage.removeItem("Sauce Labs Backpack");
  expect(await cartPage.itemNames()).toEqual(["Sauce Labs Onesie"]);
});
