import type { Page } from "@playwright/test";

import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, "/cart.html");
  }

  async itemNames(): Promise<string[]> {
    return this.page.getByTestId("inventory-item-name").allTextContents();
  }

  async removeItem(productName: string): Promise<void> {
    const itemCard = this.page.getByTestId("inventory-item").filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .filter({ hasText: productName }),
    });

    await itemCard.getByRole("button", { name: "Remove" }).click();
  }
}
