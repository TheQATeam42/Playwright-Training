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
  readonly name: Locator;
  readonly address: Locator;
  readonly gender: Locator;

  constructor(root: Locator) {
    super(root);
    this.deleteButton = root.getByTestId("delete-button");
    this.name = root.getByTestId("name");
    this.address = root.getByTestId("address");
    this.gender = root.getByTestId("gender");
  }
}
