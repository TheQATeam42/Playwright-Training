import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";
import Contacts from "../pages/contacts.page";

/**
 * Represents a contact container within the contacts list page.
 * This class provides methods and properties to interact with a contact's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contact extends BaseComponent {
  readonly contactsPage: Contacts;
  readonly contactName: string;
  readonly deleteButton: Locator;

  // Creation only works when there is only a single contact.
  constructor(page: Page, name: string) {
    super(page);
    this.contactsPage = new Contacts(page);
    this.contactName = name;
    this.deleteButton = this.contactsPage.contactItems.locator(
      'button[data-id="delete-button"]'
    );
  }

  async deleteContact() {
    await this.deleteButton.click();
  }
}
