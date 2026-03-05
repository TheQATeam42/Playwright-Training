import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the create contact form page of the application.
 * This class provides methods and properties to interact with the form's elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class CreateContact extends BasePage {
  public readonly pageHeader: Locator;
  public readonly nameInput: Locator;
  public readonly phoneInput: Locator;
  public readonly streetInput: Locator;
  public readonly cityInput: Locator;
  public readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeader = page.locator('[data-id="create-contact-header"]');
    this.nameInput = page.locator('[data-id="name"]');
    this.phoneInput = page.locator('[data-id="phone"]');
    this.streetInput = page.locator('[data-id="street"]');
    this.cityInput = page.locator('[data-id="city"]');
    this.saveButton = page.locator('[data-id="save-button"]');
  }

  /**
   * fills in the contact form fields.
   */
  async fill(
    name: string,
    phone: string,
    street: string,
    city: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
  }

  /**
   * clicks the save button to submit the form.
   */
  async save(): Promise<void> {
    await this.saveButton.click();
  }
}
