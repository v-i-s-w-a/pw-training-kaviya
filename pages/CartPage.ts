import { Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, "/cart.html");
  }

  // Get product names in the cart
  async itemNames(): Promise<string[]> {
    return this.page.getByTestId("inventory-item-name").allTextContents();
  }

  // Remove one product by name
  async removeItem(productName: string): Promise<void> {
    await this.page
      .locator(".cart_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: /remove/i })
      .click();
  }
}
