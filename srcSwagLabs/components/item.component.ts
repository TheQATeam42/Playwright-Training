import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents an item container within the shopping items list page.
 * This class provides methods and properties to interact with an item's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 * @param {Locator} root - The root locator for the item container.
 */
export default class Item extends BaseComponent {
  root: Locator;

  constructor(page: Page, root: Locator) {
    super(page);
    this.root = root;
  }
}
