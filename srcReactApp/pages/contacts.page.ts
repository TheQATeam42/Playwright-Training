import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";

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

  /**
   * A button which leads to the create contact form.
   */
  readonly createButton: Locator;

  /**
   * The header of the contacts page.
   */
  readonly contactsPageHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator("[data-id=search]");
    this.contacts = page.locator("[data-id=contact]");
    this.createButton = page.locator("[data-id=add-button]");
    this.contactsPageHeader = page.locator("[data-id=contacts]");
  }

  /**
   * Search for a certain phrase. Validate that a valid result is found.
   * @param search the phrase to execute the search with.
   * @param [isUnique=true] expect there to be only one exact match.
   */
  async searchExists(search: string, isUnique: boolean = true): Promise<void> {
    // Fill search bar.
    await this.searchInput.fill(search);

    // Assert expected result.
    await expect(this.contacts).toContainText(search);

    if (isUnique) {
      await expect(this.contacts).toHaveCount(1);
    }
  }

  /**
   * Search for a certain phrase. Validate that no result is found
   * @param search the phrase to execute the search with.
   */
  async searchNotExists(search: string): Promise<void> {
    // Fill search bar.
    await this.searchInput.fill(search);
    // Expect no results.
    await expect(this.contacts).toHaveCount(0);
  }

  /**
   * Check that the create button exists and click it.
   */
  async clickCreate(): Promise<void> {
    await expect(this.createButton).toHaveCount(1);

    await this.createButton.click();
  }

  /**
   * Validate that the contacts page is open.
   */
  async validatePageOpen(): Promise<void> {
    expect(
      await UrlHelper.validateUrl(ReactAppEndpoints.CONTACTS, this.page)
    ).toBeTruthy();

    await expect(this.contactsPageHeader).toHaveText("Contacts");
  }
}
