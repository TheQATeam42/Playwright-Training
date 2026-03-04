import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { ContactModel } from "../models/contact.model";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class CreateContact extends BasePage {
  private readonly addContactButton: Locator;
  private readonly nameInput: Locator;
  private readonly genderSelect: Locator;
  private readonly phoneInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly saveButton: Locator;
  public errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.addContactButton = page.locator('[data-id="add-button"]');
    this.nameInput = page.locator('[data-id="name"]');
    this.genderSelect = page.locator('[data-id="gender"]');
    this.phoneInput = page.locator('[data-id="phone"]');
    this.streetInput = page.locator('[data-id="street"]');
    this.cityInput = page.locator('[data-id="city"]');
    this.saveButton = page.locator('[data-id="save-button"]');
    this.errorMessage = page.locator('[data-id="error-message"]');
  }

  async fillContactForm(contact: ContactModel): Promise<void> {
    await this.nameInput.fill(contact.name);
    if (contact.gender) {
      await this.genderSelect.selectOption(contact.gender);
    }
    await this.phoneInput.fill(contact.phone);
    await this.streetInput.fill(contact.street);
    await this.cityInput.fill(contact.city);
  }

  async checkElementExists(dataId: string): Promise<void> {
    await expect(this.page.locator(`[data-id="${dataId}"]`)).toBeVisible();
  }

  async clickAddContact(): Promise<void> {
    await this.addContactButton.click();
  }

  async saveContact(): Promise<void> {
    await this.saveButton.click();
  }

  async checkErrorMessage(invalidField: string): Promise<void> {
    await expect(this.errorMessage).toContainText(
      `Error: The "${invalidField}" field can't be empty.`
    );
  }

  async checkInvalidPhoneErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      `Error: The "phone" field must be a valid phone number.`
    );
  }
}
