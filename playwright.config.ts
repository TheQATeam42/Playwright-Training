import { defineConfig } from "@playwright/test";
import { BrowserConfig } from "./src/utils/parseEnv.util";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "playwright-report/xml-report.xml" }],
  ],
  use: {
    launchOptions: {
      args: ["--start-maximized"],
    },
    testIdAttribute: "data-test",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: null,
        headless: BrowserConfig.headless,
        screenshot: "on",
        trace: "retain-on-failure",
      },
    },
  ],
});
