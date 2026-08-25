import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
      testIgnore: /problem-user\.spec\.ts/,
    },
    {
      name: "chromium-problem",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/problem.json" },
      dependencies: ["setup"],
      testMatch: /problem-user\.spec\.ts/,
    },
  ],
});
