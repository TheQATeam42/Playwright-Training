import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { ContactModel } from "../models/contact.model";

/**
 * Represents the Contact Creation page.
 * Provides a specialized interface for interacting with form fields,
 * handling validation errors, and submitting contact data.
 * * @extends BasePage
 */
export default class CreateContact extends BasePage {
  // Private locators to encapsulate the page structure
  private readonly addContactButton: Locator;
  private readonly nameInput: Locator;
  private readonly genderSelect: Locator;
  private readonly phoneInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly saveButton: Locator;

  /** Locator for the general error message alert/container */
  public errorMessage: Locator;

  /**
   * @param {Page} page - The Playwright Page object.
   */
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

  /**
   * Populates the contact form fields using a ContactModel object.
   * @param {ContactModel} contact - Data object containing name, gender, phone, etc.
   * @returns {Promise<void>}
   */
  async fillContactForm(contact: ContactModel): Promise<void> {
    await this.nameInput.fill(contact.name);

    // Optional check: Selects gender only if provided in the model
    if (contact.gender) {
      await this.genderSelect.selectOption(contact.gender);
    }

    await this.phoneInput.fill(contact.phone);
    await this.streetInput.fill(contact.street);
    await this.cityInput.fill(contact.city);
  }

  /**
   * Validates that a specific element is visible based on its data-id.
   * Useful for dynamic or shared elements not explicitly defined in the constructor.
   * @param {string} dataId - The data-id attribute value of the element.
   */
  async checkElementExists(dataId: string): Promise<void> {
    await expect(this.page.locator(`[data-id="${dataId}"]`)).toBeVisible();
  }

  /**
   * Clicks the initial 'Add Contact' button to open the form.
   */
  async clickAddContact(): Promise<void> {
    await this.addContactButton.click();
  }

  /**
   * Submits the contact form.
   */
  async saveContact(): Promise<void> {
    await this.saveButton.click();
  }

  /**
   * Asserts that a mandatory field validation error is displayed.
   * @param {string} invalidField - The name of the field expected to be missing (e.g., 'name').
   */
  async checkErrorMessage(invalidField: string): Promise<void> {
    await expect(this.errorMessage).toContainText(
      `Error: The "${invalidField}" field can't be empty.`
    );
  }

  /**
   * Asserts that the specific phone format validation error is displayed.
   * This actually a bug in the application, but we want to make sure that the error message is displayed when an invalid phone number is entered.
   */
  async checkInvalidPhoneErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      `Error: The "phone" field must be a valid phone number.`
    );
  }
}
