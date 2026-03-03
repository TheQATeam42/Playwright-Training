import { Locator, Page } from "playwright";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { expect } from "playwright/test";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";

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

  constructor(page: Page) {
    super(page);

    this.createContactHeader = page.locator("[data-id=create-contact-header]");
    this.nameField = page.locator("[data-id=name]");
    this.phoneField = page.locator("[data-id=phone]");
    this.streetField = page.locator("[data-id=street]");
    this.cityField = page.locator("[data-id=city]");
    this.saveButton = page.locator("[data-id=save-button]");
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
   * @param name
   * @param phone
   * @param street
   * @param city
   */
  async fillFormAndSubmit(
    name: string,
    phone: string,
    street: string,
    city: string
  ): Promise<void> {
    await this.nameField.fill(name);
    await this.phoneField.fill(phone);
    await this.streetField.fill(street);
    await this.cityField.fill(city);

    await this.saveButton.click();
  }
}
