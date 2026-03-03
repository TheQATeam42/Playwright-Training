import { Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  public readonly page: Page;
  public readonly searchBar: Locator;
  public readonly createButton: Locator;
  public readonly contactCards: Locator;
  public readonly contactsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchBar = this.page.locator('input[data-id="search"]');
    this.createButton = this.page.locator('button[data-id="add-button"]');
    this.contactCards = this.page.locator('[data-id="contact"]');
    this.contactsHeader = this.page.locator('h1[data-id="contacts"]');
  }

  contactCard(contactName: string): Locator {
    return this.page.locator(
      `[data-id="contact"]:has([data-id="name"]:has-text("${contactName}"))`
    );
  }

  deleteButton(contactName: string): Locator {
    return this.contactCard(contactName).locator(
      'button[data-id="delete-button"]'
    );
  }
}
