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
  /**
   * The header of the create contact form.
   */
  readonly createContactHeader: Locator;

  /**
   * The name input in the create contact form.
   */
  readonly nameField: Locator;

  /**
   * The phone input in the create contact form.
   */
  readonly phoneField: Locator;

  /**
   * The street input in the create contact form.
   */
  readonly streetField: Locator;

  /**
   * The city input in the create contact form.
   */
  readonly cityField: Locator;

  /**
   * The radio input used to pick the contact's gender.
   */
  readonly genderRadio: Locator;

  /**
   * The save button used to submit the form.
   */
  readonly saveButton: Locator;

  /**
   * Error text which appears when the form is submit with invalid values.
   */
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.createContactHeader = page.getByTestId("create-contact-header");
    this.nameField = page.getByTestId("name");
    this.phoneField = page.getByTestId("phone");
    this.streetField = page.getByTestId("street");
    this.cityField = page.getByTestId("city");
    this.saveButton = page.getByTestId("save-button");
    this.errorMessage = page.getByTestId("error-message");
    this.genderRadio = page.getByTestId("gender");
  }

  /**
   * Validate that the create contact form is open.
   */
  async validateFormOpen(): Promise<void> {
    expect(
      await UrlHelper.validateUrl(ReactAppEndpoints.CREATE_CONTACT, this.page)
    ).toBeTruthy();

    // Make sure all elements exist.
    await expect(this.createContactHeader).toHaveText("Create Contact");
    await expect(this.nameField).toHaveCount(1);
    await expect(this.phoneField).toHaveCount(1);
    await expect(this.streetField).toHaveCount(1);
    await expect(this.cityField).toHaveCount(1);
    await expect(this.genderRadio).toHaveCount(1);
    await expect(this.saveButton).toHaveCount(1);
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
    await this.genderRadio.selectOption(contact.gender);

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
