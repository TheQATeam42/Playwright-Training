import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

export default class Contact extends BaseComponent {
  readonly deleteButton: Locator;
  readonly nameLabel: Locator;
  readonly contactCard: Locator;

  constructor(page: Page) {
    super(page);
    this.contactCard = page.locator('[data-id="contact"]');
    this.deleteButton = page.locator('[data-id="delete-button"]');
    this.nameLabel = page.locator('[data-id="name"]');
  }

  async deleteContactByName(name: string): Promise<void> {
    const card = this.contactCard.filter({
      has: this.page.locator(`[data-id="name"]:text("${name}")`),
    });
    await card.locator('[data-id="delete-button"]').click();
  }
}
