import { Page } from "@playwright/test";

import { BasePage } from "./BasePage";
import { CartPage } from "./CartPage";

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page, "/inventory.html");
  }

  // How many products are on the inventory page
  async itemCount(): Promise<number> {
    return this.page.getByTestId("inventory-item").count();
  }

  // Add one named product to the cart
  async addToCart(productName: string): Promise<void> {
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: /add to cart/i })
      .click();
  }

  // Open the cart and return a CartPage
  async openCart(): Promise<CartPage> {
    await this.page.getByTestId("shopping-cart-link").click();
    return new CartPage(this.page);
  }
}
