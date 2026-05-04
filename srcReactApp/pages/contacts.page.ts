import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";

/**
 * Page object for the Contacts List page.
 *
 * Provides locators and helper methods to interact with the contacts list,
 * including searching, navigating, and performing CRUD-style actions on contacts.
 *
 * @extends BasePage
 */
export default class Contacts extends BasePage {
  /** The full contact list container */
  public readonly contactList: Locator;
  /** Button that navigates to the Create Contact form */
  public readonly createContactButton: Locator;
  /** All individual contact row elements inside the list */
  public readonly contacts: Locator;
  /** Search bar for filtering the contacts list */
  public readonly searchBar: Locator;
  /** Message shown when the contacts list is empty */
  public readonly noItemsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.contactList = page.locator(".ContactList");
    this.contacts = this.contactList.locator("[data-id='contact']");
    this.createContactButton = page.getByTestId("add-button");
    this.searchBar = page.getByTestId("search");
    this.noItemsMessage = page.getByTestId("no-items-message");
  }

  /**
   * Returns a locator filtered to the contact row matching the given name.
   * @param name - The contact name to search for
   */
  getContactByName(name: string): Locator {
    return this.contacts.filter({ hasText: name });
  }

  /**
   * Returns a locator for the contact row at the given zero-based index.
   * @param index - Zero-based row index
   */
  getContactByIndex(index: number): Locator {
    return this.contacts.nth(index);
  }

  /**
   * Returns the total number of contacts currently visible in the list.
   */
  getContactCount(): Promise<number> {
    return this.contacts.count();
  }

  /**
   * Returns the display name of the contact at the given index.
   * @param index - Zero-based row index
   */
  async getContactNameByIndex(index: number): Promise<string> {
    return (
      (await this.getContactComponentByIndex(index).name.textContent()) ?? ""
    );
  }

  /**
   * Fills the search bar with the given query string.
   * @param query - Text to search for
   */
  async searchContacts(query: string): Promise<void> {
    await this.searchBar.fill(query);
  }

  /**
   * Returns the display name of a randomly selected contact from the list.
   */
  async getRandomContactName(): Promise<string> {
    const count = await this.getContactCount();
    const randomIndex = Math.floor(Math.random() * count);
    return await this.getContactNameByIndex(randomIndex);
  }

  /**
   * Returns the {@link Contact} component for the row at the given index.
   * @param index - Zero-based row index
   */
  getContactComponentByIndex(index: number): Contact {
    return new Contact(this.page, this.getContactByIndex(index));
  }

  /**
   * Accepts the browser confirmation dialog and deletes the contact at the given index.
   * @param index - Zero-based row index of the contact to delete
   */
  async deleteContact(index: number): Promise<void> {
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await this.getContactComponentByIndex(index).deleteButton.click();
  }
}
