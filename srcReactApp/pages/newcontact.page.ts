import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

export default class NewContact extends BasePage {
  public readonly nameInput: Locator;
  public readonly createContactTitle: Locator;
  public readonly phoneInput: Locator;
  public readonly streetInput: Locator;
  public readonly cityInput: Locator;
  public readonly saveButton: Locator;
  public readonly genderInput: Locator;
  public readonly errormassge: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput          = page.getByTestId("name");
    this.createContactTitle = page.getByTestId("create-contact-header");
    this.phoneInput         = page.getByTestId("phone");
    this.streetInput        = page.getByTestId("street");
    this.cityInput          = page.getByTestId("city");
    this.saveButton         = page.getByTestId("save-button");
    this.genderInput        = page.getByTestId("gender");
    this.errormassge        = page.getByTestId("no-items-message");
  }

  async getErrorMessageText(): Promise<string> {
    return (await this.errormassge.textContent()) ?? "";
  }
  async fillContactForm(name: string, gender: string, phone: string, street: string, city: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.genderInput.selectOption(gender);
    await this.phoneInput.fill(phone);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
  }
  async saveContact(): Promise<void> {
    await this.saveButton.click();
  }
}
