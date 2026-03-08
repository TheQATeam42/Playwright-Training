import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";

export default class Contacts extends BasePage {
  readonly searchBar: Locator;
  readonly contactCards: Locator;
  readonly contact: Contact;
  readonly pageTitle: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBar = page.locator('[data-id="search"]');
    this.contactCards = page.locator('[data-id="contact"]');
    this.contact = new Contact(page);
    this.createButton = page.locator('[data-id="add-button"]');
    this.pageTitle    = page.locator('[data-id="contacts"]');
  }

  /**
   * Searches for a contact by name using the search bar.
   * @param {string} name - The contact name to search for.
   */
  async searchContact(name: string): Promise<void> {
    await this.searchBar.fill(name);
  }

  /**
   * Returns the count of currently visible contact cards.
   */
  async getContactCount(): Promise<number> {
    return await this.contactCards.count();
  }
}