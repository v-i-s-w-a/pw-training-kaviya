import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
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
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
      testIgnore: /problem-user\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
      testIgnore: /problem-user\.spec\.ts/,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState: ".auth/user.json" },
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
