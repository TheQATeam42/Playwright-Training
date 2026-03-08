import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

export default class Contact extends BaseComponent {
  readonly deleteButton: Locator;
  readonly nameLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteButton = page.locator('[data-id="delete-button"]').first();
    this.nameLabel = page.locator('[data-id="name"]').first();
  }

  /**
   * Clicks the Delete button of a specific contact by name.
   * @param {string} name - The contact name to delete.
   */
  async deleteContactByName(name: string): Promise<void> {
    const contactCard = this.page
      .locator('[data-id="contact"]')
      .filter({ has: this.page.locator(`[data-id="name"]:text("${name}")`) });
    await contactCard.locator('[data-id="delete-button"]').click();
  }
}