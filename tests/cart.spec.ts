import { test, expect } from "@playwright/test";

import { CartPage } from "../pages/CartPage";

test("Add two products, verify cart, remove one product", async ({ page }) => {
  // Session comes from .auth/user.json (setup project)
  await page.goto("https://www.saucedemo.com/inventory.html");

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

  expect(await cartPage.itemNames()).toEqual([
    "Sauce Labs Onesie",
    "Sauce Labs Backpack",
  ]);

  await cartPage.removeItem("Sauce Labs Backpack");
  expect(await cartPage.itemNames()).toEqual(["Sauce Labs Onesie"]);
});
