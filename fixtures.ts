import { test as base, expect } from "@playwright/test";

import { CartPage } from "./pages/CartPage";
import { InventoryPage } from "./pages/InventoryPage";

type Fixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  // Log in and hand back the inventory page
  inventoryPage: async ({ page }, use) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await use(new InventoryPage(page));
  },

  // Use inventoryPage to add two products, open the cart, hand back CartPage
  cartPage: async ({ inventoryPage }, use) => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");

    const cartPage = await inventoryPage.openCart();
    await use(cartPage);
  },
});

export { expect };
