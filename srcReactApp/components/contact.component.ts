import { Page, Locator, Dialog } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents a contact container within the contacts list page.
 * This class provides methods and properties to interact with a contact's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class ContactComponent extends BaseComponent {
  public readonly Name: Locator;
  public readonly Gender: Locator;
  public readonly Address: Locator;

  public readonly DeleteButton: Locator;
  public readonly EditButton: Locator;

  constructor(page: Page, container: Locator) {
    super(page);

    this.Name = container.locator('[data-id="name"]');
    this.Gender = container.locator('[data-id="gender"]');
    this.Address = container.locator('[data-id="address"]');

    this.DeleteButton = container.locator('[data-id="delete-button"]');
    this.EditButton = container.locator('[data-id="edit-button"]');
  }

  async delete(): Promise<void> {
    this.page.once("dialog", async (dialog: Dialog) => {
      await dialog.accept();
    });

    await this.DeleteButton.click();
  }
}
