import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the Contacts List/Dashboard page.
 * Handles searching, verifying, and deleting contact records from the UI list.
 * * @extends BasePage
 */
export default class Contacts extends BasePage {
  /** Input field for filtering contacts by name */
  private readonly searchInput: Locator;

  /**
   * @param {Page} page - The Playwright Page object.
   */
  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-id="search"]');
  }

  /**
   * Types the contact name into the search bar to filter the list.
   * @param {string} contactName - The name to search for.
   */
  async searchForContact(contactName: string): Promise<void> {
    await this.searchInput.fill(contactName);
  }

  /**
   * Finds a specific contact row by name and waits for it to become visible.
   * Uses a sub-locator filter to ensure the correct record is targeted.
   * @param {string} contactName - The exact text of the contact's full name.
   */
  async checkContactIsVisible(contactName: string): Promise<void> {
    const foundContact = this.page.locator("[data-id='contact']").filter({
      has: this.page.locator("[data-id='full-name-label']", {
        hasText: contactName,
      }),
    });
    // Ensures the element is attached to DOM and not hidden by CSS
    await foundContact.waitFor({ state: "visible" });
  }

  /**
   * Deletes a contact by identifying its row and confirming the browser dialog.
   * @param {string} contactName - The name of the contact to be removed.
   * @example await contactsPage.deleteContact('John Doe');
   */
  async deleteContact(contactName: string): Promise<void> {
    const foundContact = this.page.locator("[data-id='contact']").filter({
      has: this.page.locator("[data-id='full-name-label']", {
        hasText: contactName,
      }),
    });

    await foundContact.waitFor({ state: "visible" });

    /**
     * Dialog Listener: Automatically accepts the browser 'confirm' or 'alert'
     * that appears immediately after clicking the delete button.
     */
    this.page.once("dialog", (dialog) => dialog.accept());

    await foundContact.locator("[data-id='delete-button']").click();

    console.log(`Deleted contact: ${contactName}`);
  }

  /**
   * Asserts the total number of contact cards/rows currently visible in the list.
   * @param {number} expectedLength - The expected count of contact elements.
   */
  async checkContactListLength(expectedLength: number): Promise<void> {
    const contactList = this.page.locator("[data-id='contact']");
    await expect(contactList).toHaveCount(expectedLength);

    console.log(`Verified contact list length is: ${expectedLength}`);
  }

  /**
   * Performs a browser-level page reload.
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
  }
}
