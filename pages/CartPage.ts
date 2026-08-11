import { Locator, Page } from "@playwright/test";

import { BasePage } from "../pages/BasePage";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, "/cart.html");
  }

  itemNames(): Locator {
    return this.page.getByTestId("inventory-item-name");
  }

  removeItems(productName: string): Locator {
    return this.page
      .locator(".cart_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: /remove/i });
  }
}
