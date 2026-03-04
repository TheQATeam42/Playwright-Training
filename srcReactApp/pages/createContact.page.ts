import { Locator, Page } from "playwright";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { expect } from "playwright/test";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import { ContactModel } from "../models/contact.model";

/**
 * Represents the create contact form page of the application.
 * Provides methods to interact with the pages contents.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class CreateContact extends BasePage {
  readonly createContactHeader: Locator;
  readonly nameField: Locator;
  readonly phoneField: Locator;
  readonly streetField: Locator;
  readonly cityField: Locator;
  readonly saveButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.createContactHeader = page.locator("[data-id=create-contact-header]");
    this.nameField = page.locator("[data-id=name]");
    this.phoneField = page.locator("[data-id=phone]");
    this.streetField = page.locator("[data-id=street]");
    this.cityField = page.locator("[data-id=city]");
    this.saveButton = page.locator("[data-id=save-button]");
    this.errorMessage = page.locator("[data-id=error-message]");
  }

  /**
   * Validate that the create contact form is open.
   */
  async validateFormOpen(): Promise<void> {
    expect(
      await UrlHelper.validateUrl(ReactAppEndpoints.CREATE_CONTACT, this.page)
    ).toBeTruthy();

    await expect(this.createContactHeader).toHaveText("Create Contact");
  }

  /**
   * Fill the form and submit it.
   * @param contact the required information to build a contact.
   */
  async fillFormAndSubmit(contact: ContactModel): Promise<void> {
    await this.nameField.fill(contact.name);
    await this.phoneField.fill(contact.phone);
    await this.streetField.fill(contact.street);
    await this.cityField.fill(contact.city);

    await this.saveButton.click();
  }

  /**
   * Check if an error message appears in the DOM.
   * @param field the name of the field that should appear in the error message.
   */
  async checkForErrorByField(field: string): Promise<void> {
    // Verify error message exists.
    await expect(this.errorMessage).toHaveCount(1);

    // Verify error message text includes field.
    await expect(this.errorMessage).toContainText(field);
  }
}
