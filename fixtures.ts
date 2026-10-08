import { test as base, expect } from "@playwright/test";

import { CartPage } from "./pages/CartPage";
import { InventoryPage } from "./pages/InventoryPage";

type Fixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  // Session comes from .auth/user.json (setup project)
  inventoryPage: async ({ page }, use) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
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
