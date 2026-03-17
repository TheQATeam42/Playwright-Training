import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  public readonly searchInput: Locator;
  public readonly contactsList: Locator;
  public readonly pageTitle: Locator;
  public readonly createButton: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator('[data-id="search"]');
    this.contactsList = page.locator('[data-id="contact"]');
    this.pageTitle = page.locator('[data-id="contacts"]');
    this.createButton = page.locator('[data-id="add-button"]');
  }

  /**
   * clicks the create button to navigate to the create contact form.
   */
  async clickCreate(): Promise<void> {
    await this.createButton.click();
  }

  /**
   * search for a contact by name
   */
  async search(name: string): Promise<void> {
    await this.searchInput.fill(name);
  }

  /**
   * reloads the current page.
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }
}
