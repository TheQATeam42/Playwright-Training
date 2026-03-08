import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class AddContactPage extends BasePage {
  readonly nameLabel: Locator;
  readonly phoneLabel: Locator;
  readonly streetLabel: Locator;
  readonly cityLabel: Locator;
  readonly saveButton: Locator;
  readonly errorLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.nameLabel = page.locator('[data-id="name"]');
    this.phoneLabel = page.locator('[data-id="phone"]');
    this.streetLabel = page.locator('[data-id="street"]');
    this.cityLabel = page.locator('[data-id="city"]');
    this.saveButton = page.locator('button[data-id="save-button"]');
    this.errorLabel = page.locator('[data-id="error-message"]');
  }

  async verifyPageUri() {
    let baseUrl = process.env.REACT_BASE_URL;
    await expect(this.page).toHaveURL(baseUrl + "tasks/create");

    // Checking for 'Create Contact'
    const pageTitle = this.page.locator('[data-id="create-contact-header"]');
    await expect(pageTitle).toContainText("Create Contact");
  }

  async fillContactDetails(
    name: string,
    phone: string,
    city: string,
    street: string
  ) {
    await this.nameLabel.fill(name);
    await this.phoneLabel.fill(phone);
    await this.cityLabel.fill(city);
    await this.streetLabel.fill(street);
  }

  async fillPhoneNumber(phone: string) {
    await this.phoneLabel.fill(phone);
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async reloadPage() {
    this.page.reload();
  }
}
