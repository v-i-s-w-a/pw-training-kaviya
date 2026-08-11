import { Page } from "@playwright/test";

export class BasePage {
  constructor(
    protected readonly page: Page,
    private path: string
  ) {}

  // Open this page
  async open() {
    await this.page.goto(`https://www.saucedemo.com${this.path}`);
  }
}
