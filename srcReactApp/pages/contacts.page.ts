import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  readonly searchBar: Locator;
  readonly contactItems: Locator;
  readonly addContactButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBar = this.page.locator('input[data-id="search"]');
    this.contactItems = this.page.locator('div[data-id="contact"]');
    this.addContactButton = this.page.locator('button[data-id="add-button"]');
  }

  async search(searchStr: string) {
    await expect(this.searchBar).toBeVisible();
    this.searchBar.fill(searchStr);
  }

  get getContactItems(): Locator {
    return this.contactItems;
  }

  async openAddContactPage() {
    await expect(this.addContactButton).toBeVisible();
    await this.addContactButton.click();
  }

  async verifyContactsPage() {
    // Ensuring we returned to the main contact page
    let baseUrl = process.env.REACT_BASE_URL;
    await expect(this.page).toHaveURL(baseUrl!);

    // Checking the title of this page is correct.
    const contactsPageTitle = this.page.locator('[data-id="contacts"]');
    await expect(contactsPageTitle).toContainText("Contacts");
  }
}
