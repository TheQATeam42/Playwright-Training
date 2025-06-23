import { defineConfig } from '@playwright/test'

export default defineConfig({
  /* Tell the test runner where are the test files */
  testDir: "./src/features",
  /* Max time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // Understanding of full screen: https://stackoverflow.com/questions/71407251/playwright-wont-launch-full-screen
  use: {
    launchOptions: {
      args: ["--start-maximized"]
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: null,
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure" // will show all errors of the steps as a video
      },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
})
