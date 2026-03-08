import { FrameLocator, Locator, Page, expect } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class ContactsIFrame {
  readonly page: FrameLocator;
  readonly addContactButton: Locator;

  constructor(page: FrameLocator) {
    this.page = page;
    this.addContactButton = this.page.locator('button[data-id="add-button"]');
  }

  async openAddContactPage() {
    await expect(this.addContactButton).toBeVisible();
    await this.addContactButton.click();
  }

  async verifyContactsPage() {
    // Ensuring we returned to the main contact page
    let baseUrl = process.env.REACT_BASE_URL;
    // await expect(this.page).toHaveProperty(baseUrl!);
    const frame = this.page.owner();
    const currentUrl = await frame.evaluate(() => window.location.pathname);
    await expect(currentUrl).toContain(baseUrl!);

    // Checking the title of this page is correct.
    const contactsPageTitle = this.page.locator('[data-id="contacts"]');
    await expect(contactsPageTitle).toContainText("Contacts");
  }

  async verifyAddContactsPage() {
    // Ensuring we returned to the main contact page
    let baseUrl = process.env.REACT_BASE_URL;
    // await expect(this.page).toHaveProperty(baseUrl!);
    const frame = this.page.owner();
    const currentUrl = await frame.evaluate(() => window.location.pathname);
    await expect(currentUrl).toContain(baseUrl + "tasks/create");
  }
}
