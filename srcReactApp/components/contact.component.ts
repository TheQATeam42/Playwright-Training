import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents a contact container within the contacts list page.
 * This class provides methods and properties to interact with a contact's elements.
 *  
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contact extends BaseComponent {
  private root: Locator;
  constructor(page: Page , root : Locator) {
    super(page);
    this.root = root;
  }
  get name(): Locator {
    return this.root.getByTestId("name");
  }
  get deleteButton(): Locator {
    return this.root.getByTestId("delete-button");
  }
  get editButton(): Locator {
    return this.root.getByTestId("edit-button");
  }
  async delete(): Promise<void> {
    await this.deleteButton.click();
  }
  async edit(): Promise<void> {
    await this.editButton.click();
  } 

  async getName(): Promise<string> {
    return await this.name.textContent() ?? "";
  }
  
}

