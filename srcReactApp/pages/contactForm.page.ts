import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";
import { CreateContactDTO } from "../models/createContactDTO";

/**
 * Represents the contact form container within the contact create or edit page.
 * This class provides methods and properties to interact with the form's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class ContactFormPage extends BaseComponent {
  public readonly Title: Locator;

  public readonly NameInput: Locator;
  public readonly GenderSelect: Locator;
  public readonly PhoneInput: Locator;
  public readonly StreetInput: Locator;
  public readonly CityInput: Locator;

  public readonly ErrorMessage: Locator;
  public readonly SaveButton: Locator;

  constructor(page: Page) {
    super(page);

    this.Title = page.locator('[data-id="create-contact-header"]');

    this.NameInput = page.locator('[data-id="name"]');
    this.GenderSelect = page.locator('[data-id="gender"]');
    this.PhoneInput = page.locator('[data-id="phone"]');
    this.StreetInput = page.locator('[data-id="street"]');
    this.CityInput = page.locator('[data-id="city"]');

    this.ErrorMessage = page.locator('[data-id="error-message"]');
    this.SaveButton = page.locator('[data-id="save-button"]');
  }

  public async FillForm(createContactDTO: CreateContactDTO) {
    await this.NameInput.fill(createContactDTO.name);
    await this.GenderSelect.selectOption(createContactDTO.gender);
    await this.PhoneInput.fill(createContactDTO.phone);
    await this.StreetInput.fill(createContactDTO.street);
    await this.CityInput.fill(createContactDTO.city);
  }
}
