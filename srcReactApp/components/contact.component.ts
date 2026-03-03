import { Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents a contact container within the contacts list page.
 * This class provides methods and properties to interact with a contact's elements.
 *
 * @extends BaseComponent
 * @param {Locator} root - The Playwright Locator object representing the current component.
 */
export default class Contact extends BaseComponent {
  readonly deleteButton: Locator;

  constructor(root: Locator) {
    super(root);
    this.deleteButton = root.locator("[data-id=delete-button]");
  }

  /**
   * Delete a contact by clicking on this contact's delete button.
   */
  async delete(): Promise<void> {
    await this.deleteButton.click();

    // Resulting dialog will be handled according to test specific dialog handlers.
  }
}
