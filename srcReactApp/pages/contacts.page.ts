import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";

export default class Contacts extends BasePage {
  public readonly contactList: Locator;
  public readonly createContactButton: Locator;
  public readonly contacts: Locator;
  public readonly palygroundbutton: Locator;

  constructor(page: Page) {
    super(page);
    this.contactList         = page.locator(".ContactList");
    this.contacts            = this.contactList.locator("[data-id='contact']");
    this.createContactButton = page.getByTestId("add-button");
    this.palygroundbutton    = page.getByTestId("playground-button");
  }

  getContactByName(name: string): Locator {
    return this.contacts.filter({ hasText: name });
  }
  isContactInList(name: string): Promise<boolean> {
    return this.getContactByName(name).first().isVisible();
  }
  getContactByIndex(index: number): Locator {
    return this.contacts.nth(index);
  }
  getContactCount(): Promise<number> {
    return this.contacts.count();
  }
  async getContactNameByIndex(index: number): Promise<string> {
    return (await this.getContactByIndex(index).getByTestId("name").textContent()) ?? "";
  }
  issearchResultEmpty(): Promise<boolean> {
    return this.page.getByTestId("no-items-message").isVisible();
  }
  async searchContacts(query: string): Promise<void> {
    const searchInput = this.page.getByTestId("search");
    await searchInput.fill(query);
  }
  async getRandomContactName(): Promise<string> {
    const count = await this.getContactCount();
    const randomIndex = Math.floor(Math.random() * count);
    return await this.getContactNameByIndex(randomIndex);
  }
  async createContactButtonClick(): Promise<void> {
    await this.createContactButton.click();
  }
  getContactComponentByIndex(index: number): Contact {
    const contactLocator = this.getContactByIndex(index);
    return new Contact(this.page, contactLocator);
  }
  issherachbarVisible(): Promise<boolean> {
    return this.page.getByTestId("search").isVisible();
  }
  async clickPlaygroundButton(): Promise<void> {
    await this.palygroundbutton.click();
  }
}
