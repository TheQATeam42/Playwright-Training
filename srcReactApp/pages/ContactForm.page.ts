import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { ContactData } from "../modals/contact.model";

/**
 * Page object for the Create Contact form page.
 *
 * Provides locators for all form inputs and a convenience method
 * to fill the entire form in one call.
 *
 * @extends BasePage
 */
export default class ContactForm extends BasePage {
  /** Input field for the contact's full name */
  public readonly nameInput: Locator;
  /** Heading that confirms the Create Contact page is loaded */
  public readonly createContactTitle: Locator;
  /** Input field for the contact's phone number */
  public readonly phoneInput: Locator;
  /** Input field for the contact's street address */
  public readonly streetInput: Locator;
  /** Input field for the contact's city */
  public readonly cityInput: Locator;
  /** Button that submits the form and saves the new contact */
  public readonly saveButton: Locator;
  /** Dropdown for selecting the contact's gender */
  public readonly genderInput: Locator;
  /** Error message displayed when form validation fails */
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByTestId("name");
    this.createContactTitle = page.getByTestId("create-contact-header");
    this.phoneInput = page.getByTestId("phone");
    this.streetInput = page.getByTestId("street");
    this.cityInput = page.getByTestId("city");
    this.saveButton = page.getByTestId("save-button");
    this.genderInput = page.getByTestId("gender");
    this.errorMessage = page.getByTestId("error-message");
  }

  /**
   * Fills every field of the Create Contact form with the provided data.
   *
   * @param data - A {@link ContactData} object containing name, gender, phone, street, and city
   */
  async fillContactForm(data: ContactData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.genderInput.selectOption(data.gender);
    await this.phoneInput.fill(data.phone);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
  }
}
