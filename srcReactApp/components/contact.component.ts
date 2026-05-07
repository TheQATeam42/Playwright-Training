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
  /** Locator for the contact's displayed name */
  public readonly name: Locator;
  /** Button that deletes this contact (triggers a browser confirmation dialog) */
  public readonly deleteButton: Locator;
  /** Button that navigates to the Edit Contact form for this contact */
  public readonly editButton: Locator;

  constructor(page: Page, root: Locator) {
    super(page);
    this.name = root.getByTestId("name");
    this.deleteButton = root.getByTestId("delete-button");
    this.editButton = root.getByTestId("edit-button");
  }

  /**
   * Returns the displayed name of this contact.
   * @returns Text content of the name element, or `""` if unavailable.
   */
  async getName(): Promise<string> {
    return (await this.name.textContent()) ?? "";
  }
}
