import { Page } from "playwright";

/**
 * Abstract base class that serves as the parent class for all page objects.
 *
 * Provides a foundation for page object model implementation by encapsulating
 * a Playwright Page instance that can be used by derived classes to interact
 * with web pages.
 *
 * @abstract
 * @class BasePage
 */
export default abstract class BasePage {
  constructor(protected readonly page: Page) {}
}
