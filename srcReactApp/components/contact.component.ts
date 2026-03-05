import { Page, Locator } from "@playwright/test";
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
  public readonly gender: Locator;
  public readonly address: Locator;
  public readonly deleteButton: Locator;
  public readonly editButton: Locator;

  constructor(page: Page) {
    super(page);

    this.name = page.locator('[data-id="name"]').first();
    this.gender = page.locator('[data-id="gender"]').first();
    this.address = page.locator('[data-id="address"]').first();
    this.deleteButton = page.locator('[data-id="delete-button"]').first();
    this.editButton = page.locator('[data-id="edit-button"]').first();
  }

  /**
   * clicks the delete button and accepts the native confirmation dialog.
   */
  async delete(): Promise<void> {
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.deleteButton.click();
  }
}
