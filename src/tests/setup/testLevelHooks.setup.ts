import UrlHelper from "../../utils/urlHelper.util";
import baseTest from "./initPages.setup";

/**
 * Extended test fixture for the application tests.
 * Inherits fixtures and configurations from baseTest.
 */
const swagLabsTest = baseTest;

/**
 * beforeEach Hook - Executes before each test
 *
 * Navigates to the application URL before running each test.
 * This ensures that every test starts with a fresh page at the correct URL.
 *
 * @param {Object} context - Playwright test context
 * @param {Page} context.page - The Playwright page object for the current test
 */
swagLabsTest.beforeEach(async ({ page }) => {
  await page.goto(UrlHelper.url);
});

/**
 * afterEach Hook - Executes after each test
 *
 * Closes the browser page after each test completes.
 * This ensures proper cleanup and resource management between test runs.
 *
 * @param {Object} context - Playwright test context
 * @param {Page} context.page - The Playwright page object for the current test
 */
swagLabsTest.afterEach(async ({ page }) => {
  await page.close();
});

export default swagLabsTest;
