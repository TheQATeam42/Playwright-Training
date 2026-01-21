import { Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents a contact container within the contacts list page.
 * This class provides methods and properties to interact with a contact's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contact extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }
}
