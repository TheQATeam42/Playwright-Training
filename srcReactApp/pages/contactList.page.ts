import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";
import ContactComponent from "../components/contact.component";

/**
 * Represents the contact list container within the contacts list page.
 * This class provides methods and properties to interact with the contact list's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class ContactListPage extends BaseComponent {
  public readonly Title: Locator;

  public readonly SearchInput: Locator;
  public readonly CreateButton: Locator;
  public readonly SearchedContacts: Locator;

  constructor(page: Page) {
    super(page);

    this.Title = page.locator('[data-id="contacts"]');

    this.SearchInput = page.locator('[data-id="search"]');
    this.CreateButton = page.locator('[data-id="add-button"]');
    this.SearchedContacts = page.locator(
      '.ContactListItems > div[data-id="contact"]'
    );
  }

  public async Search(name: string) {
    await this.SearchInput.fill(name);
  }

  public GetFirstContact(): ContactComponent {
    return new ContactComponent(this.page, this.SearchedContacts.first());
  }
}
