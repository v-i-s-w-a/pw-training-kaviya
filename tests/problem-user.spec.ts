import { test, expect } from "@playwright/test";

test("problem_user shows the same image for every product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  const imageSrcs = await page
    .locator(".inventory_item_img img")
    .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")));

  expect(imageSrcs).toHaveLength(6);
  expect(new Set(imageSrcs).size).toBe(1);
});
