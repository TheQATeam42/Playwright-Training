import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { IContact } from "../models/contact.model";

export default class CreateContact extends BasePage {
  readonly pageTitle: Locator;
  readonly nameInput: Locator;
  readonly genderSelect: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('[data-id="create-contact-header"]');
    this.nameInput = page.locator('[data-id="name"]');
    this.genderSelect = page.locator('[data-id="gender"]');
    this.phoneInput = page.locator('[data-id="phone"]');
    this.streetInput = page.locator('[data-id="street"]');
    this.cityInput = page.locator('[data-id="city"]');
    this.saveButton = page.locator('[data-id="save-button"]');
    this.cancelButton = page.locator('[data-id="cancel-button"]');
    this.errorMessage = page.locator('[data-id="error-message"]');
  }

  async fillForm(contact: IContact): Promise<void> {
    await this.nameInput.fill(contact.name);
    if (contact.gender) {
      await this.genderSelect.selectOption(contact.gender);
    }
    await this.phoneInput.fill(contact.phone);
    await this.streetInput.fill(contact.street);
    await this.cityInput.fill(contact.city);
  }

  async fillFormExcept(
    baseContact: IContact,
    emptyField: keyof IContact
  ): Promise<void> {
    const data = { ...baseContact, [emptyField]: "" };
    await this.fillForm(data);
  }

  async saveContact(): Promise<void> {
    await this.saveButton.click();
  }
}
