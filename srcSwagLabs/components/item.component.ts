import { Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents an item container within the shopping items list page.
 * This class provides methods and properties to interact with an item's elements.
 *
 * @extends BaseComponent
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Item extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }
}
