import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the Create Contact form page.
 * Provides methods to interact with the form fields and submit.
 *
 * @extends BasePage
 */
export default class CreateContact extends BasePage {
  readonly pageTitle: Locator;
  readonly nameInput: Locator;
  readonly genderSelect: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle    = page.locator('[data-id="create-contact-header"]');
    this.nameInput    = page.locator('[data-id="name"]');
    this.genderSelect = page.locator('[data-id="gender"]');
    this.phoneInput   = page.locator('[data-id="phone"]');
    this.streetInput  = page.locator('[data-id="street"]');
    this.cityInput    = page.locator('[data-id="city"]');
    this.saveButton   = page.locator('[data-id="save-button"]');
    this.cancelButton = page.locator('[data-id="cancel-button"]');
  }

  /**
   * Fills in all form fields with the provided contact details.
   * @param contact - Object containing the contact details to fill in.
   */
  async fillForm(contact: {
    name: string;
    gender?: string;
    phone: string;
    street: string;
    city: string;
  }): Promise<void> {
    await this.nameInput.fill(contact.name);
    if (contact.gender) {
      await this.genderSelect.selectOption(contact.gender);
    }
    await this.phoneInput.fill(contact.phone);
    await this.streetInput.fill(contact.street);
    await this.cityInput.fill(contact.city);
  }

  /**
   * Clicks the Save button to submit the form.
   */
  async saveContact(): Promise<void> {
    await this.saveButton.click();
  }
}

