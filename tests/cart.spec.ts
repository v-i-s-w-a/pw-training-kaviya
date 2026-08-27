import { test, expect } from "../fixtures";

test("Add two products, verify cart, remove one product", async ({ cartPage }) => {
  expect(await cartPage.itemNames()).toEqual([
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
  ]);

  await cartPage.removeItem("Sauce Labs Backpack");
  expect(await cartPage.itemNames()).toEqual(["Sauce Labs Bike Light"]);
});
