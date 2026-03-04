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
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-id="search"]');
  }

  async searchForContact(contactName: string): Promise<void> {
    await this.searchInput.fill(contactName);
  }

  async checkContactIsVisible(contactName: string): Promise<void> {
    const foundContact = this.page.locator("[data-id='contact']").filter({
      has: this.page.locator("[data-id='full-name-label']", {
        hasText: contactName,
      }),
    });
    await foundContact.waitFor({ state: "visible" });
  }

  async deleteContact(contactName: string): Promise<void> {
    const foundContact = this.page.locator("[data-id='contact']").filter({
      has: this.page.locator("[data-id='full-name-label']", {
        hasText: contactName,
      }),
    });
    await foundContact.waitFor({ state: "visible" });

    // Listen for the specific dialog triggered by this action and accept it
    this.page.once("dialog", (dialog) => dialog.accept());
    await foundContact.locator("[data-id='delete-button']").click();
    console.log(`foundContact: ${foundContact.toString()}`);
    console.log(`Deleted contact: ${contactName}`);
  }

  async checkContactListLength(expectedLength: number): Promise<void> {
    const contactList = this.page.locator("[data-id='contact']");
    await expect(contactList).toHaveCount(expectedLength);

    console.log(`Verified contact list length is: ${expectedLength}`);
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
  }
}
