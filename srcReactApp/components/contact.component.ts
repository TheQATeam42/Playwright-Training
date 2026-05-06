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
  public readonly name: Locator;
  public readonly deleteButton: Locator;
  public readonly editButton: Locator;

  constructor(page: Page, root: Locator) {
    super(page);
    this.name = root.getByTestId("name");
    this.deleteButton = root.getByTestId("delete-button");
    this.editButton = root.getByTestId("edit-button");
  }
  async delete(): Promise<void> {
    await this.deleteButton.click();
  }
  async edit(): Promise<void> {
    await this.editButton.click();
  }

  async getName(): Promise<string> {
    return (await this.name.textContent()) ?? "";
  }
}
