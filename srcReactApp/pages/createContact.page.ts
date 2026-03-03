import { Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

export enum ContactData {
  name = "name",
  phone = "phone",
  street = "street",
  city = "city",
}

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
  public readonly errorMessage: Locator;
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
    this.errorMessage = this.page.locator('div[data-id="error-message"]');
  }

  async fillFormExceptField(fieldToExclude: ContactData): Promise<void> {
    const fields = Object.values(ContactData);
    for (const field of fields) {
      if (field === fieldToExclude) {
        continue;
      }
      await this.formField(field).fill("123456789");
    }
  }

  async clearForm(): Promise<void> {
    const fields = Object.values(ContactData);
    for (const field of fields) {
      await this.formField(field).fill("");
    }
  }
}
