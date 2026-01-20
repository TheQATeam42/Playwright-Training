import { defineConfig } from "@playwright/test";
import {
  BrowserConfig,
  EnvironmentConfig,
} from "./sharedFiles/utils/parseEnv.util";

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
    browserName: "chromium",
    headless: BrowserConfig.headless,
    viewport: null,
    screenshot: "on",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "react app",
      testDir: "srcReactApp",
      use: { baseURL: EnvironmentConfig.reactAppUrl },
    },
    {
      name: "swag labs",
      testDir: "srcSwagLabs",
      use: { baseURL: EnvironmentConfig.swagLabsUrl },
    },
  ],
});
