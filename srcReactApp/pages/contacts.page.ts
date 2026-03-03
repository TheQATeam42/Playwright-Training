import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  /**
   * The contact search bar.
   */
  readonly searchInput: Locator;

  /**
   * The list of contact cards showing on the screens.
   */
  readonly contacts: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator("[data-id=search]");
    this.contacts = page.locator("[data-id=contact]");
  }

  /**
   * Search for a certain phrase. Return a locator with the results of the search.
   * @param search the phrase to execute the search with.
   * @param [isUnique=true] expect there to be only one exact match.
   */
  async search(search: string, isUnique: boolean = true): Promise<void> {
    // Fill search bar.
    await this.searchInput.fill(search);

    // Assert expected result.
    await expect(this.contacts).toContainText(search);

    if (isUnique) {
      await expect(this.contacts).toHaveCount(1);
    }
  }
}
