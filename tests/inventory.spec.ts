import { test, expect } from "../fixtures";

test("inventory shows six products", async ({ inventoryPage }) => {
  expect(await inventoryPage.itemCount()).toBe(6);
});
