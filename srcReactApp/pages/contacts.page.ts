import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";
import NewContact from "./newcontact.page";


export default class Contacts extends BasePage {
  public readonly contactList: Locator;
  public readonly createContactButton: Locator;
  public readonly contacts: Locator;
  public readonly playgroundButton: Locator;
  public readonly searchBar: Locator;
  public readonly noItemsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.contactList         = page.locator(".ContactList");
    this.contacts            = this.contactList.locator("[data-id='contact']");
    this.createContactButton = page.getByTestId("add-button");
    this.playgroundButton    = page.getByTestId("playground-button");
    this.searchBar           = page.getByTestId("search");
    this.noItemsMessage      = page.getByTestId("no-items-message");
  }

  getContactByName(name: string): Locator {
    return this.contacts.filter({ hasText: name });
  }
  getContactByIndex(index: number): Locator {
    return this.contacts.nth(index);
  }
  getContactCount(): Promise<number> {
    return this.contacts.count();
  }
  async getContactNameByIndex(index: number): Promise<string> {
    return (await this.getContactComponentByIndex(index).name.textContent()) ?? "";
  }
  async searchContacts(query: string): Promise<void> {
    await this.searchBar.fill(query);
  }
  async getRandomContactName(): Promise<string> {
    const count = await this.getContactCount();
    const randomIndex = Math.floor(Math.random() * count);  
    return await this.getContactNameByIndex(randomIndex);
  }
  getContactComponentByIndex(index: number): Contact {
    return new Contact(this.page, this.getContactByIndex(index));
  }
  async deleteContact(index: number): Promise<void> {
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await this.getContactComponentByIndex(index).deleteButton.click();
  }
}
