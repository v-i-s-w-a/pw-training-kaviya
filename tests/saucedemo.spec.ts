import { test, expect, type Page } from "@playwright/test";

import { CartPage } from "../pages/cart-page";

async function login(page: Page): Promise<void> {
  await page.goto("https://www.saucedemo.com/");
  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();
}

async function addToCart(page: Page, productName: string): Promise<void> {
  const productCard = page.getByTestId("inventory-item").filter({
    has: page.getByTestId("inventory-item-name").filter({ hasText: productName }),
  });

  await productCard.getByRole("button", { name: "Add to cart" }).click();
}

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

test("cart page object lists items and removes one item", async ({ page }) => {
  const firstProduct = "Sauce Labs Backpack";
  const secondProduct = "Sauce Labs Bike Light";
  const cartPage = new CartPage(page);

  await login(page);
  await addToCart(page, firstProduct);
  await addToCart(page, secondProduct);

  await page.getByTestId("shopping-cart-link").click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  expect(await cartPage.itemNames()).toEqual([firstProduct, secondProduct]);

  await cartPage.removeItem(firstProduct);
  expect(await cartPage.itemNames()).toEqual([secondProduct]);
});
