import { Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class ContactsList extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
