import { Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the create page of the application.
 * This class provides methods and properties to interact with the create page elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class CreateContact extends BasePage {
  public readonly page: Page;
  public readonly createContactHeader: Locator;
  public readonly saveContact: Locator;
  // recieve a form field name and get the locator for that field
  public formField(fieldName: string): Locator {
    return this.page.locator(`input[data-id="${fieldName}"]`);
  }

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.createContactHeader = this.page.locator(
      'h1[data-id="create-contact-header"]'
    );
    this.saveContact = this.page.locator('button[data-id="save-button"]');
  }
}
