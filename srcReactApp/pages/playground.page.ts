import { FrameLocator, Locator, Page, expect } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class PlaygroundPage extends BasePage {
  readonly autoCompleteComboBox: Locator;
  readonly activeSwitch: Locator;
  readonly inactiveSwitch: Locator;
  readonly openTabLink: Locator;
  readonly openWindowLink: Locator;
  readonly iframe: FrameLocator;
  constructor(page: Page) {
    super(page);
    this.autoCompleteComboBox = page.locator('input[id="movies-input"]');
    this.activeSwitch = page.locator('input[data-id="switch-one"]');
    this.inactiveSwitch = page.locator('input[data-id="switch-two"]');
    this.openTabLink = page.locator('a[data-id="new-tab-button"]');
    this.openWindowLink = page.locator('button[data-id="open-window-button"]');
    this.iframe = page.frameLocator("basic-iframe");
  }
}
