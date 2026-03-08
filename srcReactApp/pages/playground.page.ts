import { Page, Locator, FrameLocator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the Playground page.
 * Provides access to all playground element locators.
 *
 * @extends BasePage
 */
export default class Playground extends BasePage {
  // Autocomplete
  readonly movieInput: Locator;

  // Switch
  readonly switchOne: Locator;
  readonly switchTwo: Locator;

  // Table
  readonly table: Locator;
  readonly tableRows: Locator;

  // Navigation elements
  readonly openTabLink: Locator;
  readonly openWindowButton: Locator;

  // IFrame
  readonly iframe: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.movieInput        = page.locator("#movies-input");
    this.switchOne         = page.locator('[data-id="switch-one"]');
    this.switchTwo         = page.locator('[data-id="switch-two"]');
    this.table             = page.locator('[data-id="basic-table"]');
    this.tableRows         = page.locator('[data-id="basic-table"] tbody tr');
    this.openTabLink       = page.locator('[data-id="new-tab-button"]');
    this.openWindowButton  = page.locator('[data-id="open-window-button"]');
    this.iframe            = page.frameLocator("#basic-iframe");
  }

  /**
   * Types a movie name and selects the first autocomplete option.
   * @param movieName - The movie name to search for.
   */
  async selectMovieFromSearch(movieName: string): Promise<void> {
    await this.movieInput.fill(movieName);
    await this.page.locator(".MuiAutocomplete-option").first().click();
  }

  /**
   * Opens the autocomplete dropdown without typing and selects an option by index.
   * @param index - Zero-based index of the option to select.
   */
  async selectMovieWithoutSearch(index: number = 0): Promise<void> {
    await this.page.locator('[aria-label="Open"]').click();
    await this.page.locator(".MuiAutocomplete-option").nth(index).click();
  }

  /**
   * Clears the movie input field.
   */
  async clearMovieInput(): Promise<void> {
    await this.movieInput.clear();
  }
}