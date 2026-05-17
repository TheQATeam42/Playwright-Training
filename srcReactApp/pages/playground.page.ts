import { Locator, Page } from "playwright";
import BasePage from "../../sharedFiles/pages/basePage.page";
import { expect, Frame } from "playwright/test";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import { DessertTableRow } from "../components/dessertTableRow.component";
import { DessertModel } from "../models/dessert.model";

/**
 * Represents the playground page in the application.
 * Provides methods to interact with the pages contents.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Playground extends BasePage {
  /**
   * Autocomplete input.
   */
  readonly moviesInput: Locator;

  /**
   * Autocomplete options
   */
  readonly moviesOptions: Locator;

  /**
   * Enabled switch button.
   */
  readonly enabledSwitch: Locator;

  /**
   * Disabled switch button.
   */
  readonly disabledSwitch: Locator;

  /**
   * Columns in a basic table.
   */
  readonly basicTableColumns: Locator;

  /**
   * A Link that opens a new tab leading to the contacts page.
   */
  readonly openTabLink: Locator;

  /**
   * A button that opens a new window with the contacts page.
   */
  readonly openWindowButton: Locator;

  /**
   * An iframe holding the contacts page.
   */
  readonly iframe: Locator;

  constructor(page: Page) {
    super(page);

    this.moviesInput = page.locator("#movies-input");
    this.moviesOptions = page.locator("#movies-input-listbox [role=option]");
    this.enabledSwitch = page.getByTestId("switch-one");
    this.disabledSwitch = page.getByTestId("switch-two");
    this.basicTableColumns = page.locator("[data-id=basic-table] tbody tr");
    this.openTabLink = page.getByTestId("new-tab-button");
    this.openWindowButton = page.getByTestId("open-window-button");
    this.iframe = page.locator("#basic-iframe");
  }

  /**
   * Fill autocomplete box with expected input.
   * @param input
   */
  async fillAutocompleteBox(input: string): Promise<void> {
    await expect(this.moviesInput).toHaveCount(1);
    await expect(this.moviesInput).toHaveText("");

    await this.moviesInput.fill(input);
  }

  /**
   * Pick the autocomplete option at the nth index.
   * Validate that it has been chosen in the input.
   * @param nth the index of the options to choose.
   */
  async pickNthOptionAutocompleteBox(nth: number) {
    // Validate that the requested option exists.
    expect(await this.moviesOptions.count()).toBeGreaterThanOrEqual(nth);

    // Get picked locator and text contents.
    const picked = this.moviesOptions.nth(nth);
    const pickedText = (await picked.textContent()) ?? "";

    // Pick the option.
    await picked.click();

    // Make sure that the input now contains the chosen option.
    await expect(this.moviesInput).toHaveValue(pickedText);
  }

  /**
   * Toggle an enabled switch.
   */
  async toggleEnabledSwitch(): Promise<void> {
    // Get initial state.
    const initialState = await this.enabledSwitch.isChecked();
    // Toggle the switch.
    await this.enabledSwitch.click();
    // Expect state to be different.
    expect(this.enabledSwitch).not.toBe(initialState);
  }

  async validateTableContent(expectedContent: DessertModel[]): Promise<void> {
    // Make sure that the table has the expected number of columns.
    await expect(this.basicTableColumns).toHaveCount(expectedContent.length);

    // Check if each index exists in the table and in the right order.
    for (let index = 0; index < expectedContent.length; index++) {
      await new DessertTableRow(this.basicTableColumns.nth(index)).validateRow(
        expectedContent[index]
      );
    }
  }

  /**
   * Make sure that the playground page is open and contains all expected elements.
   */
  async validatePageOpen(): Promise<void> {
    expect(
      await UrlHelper.validateUrl(ReactAppEndpoints.PLAYGROUND, this.page)
    ).toBeTruthy();

    // Validate all elements exist.
    await expect(this.moviesInput).toHaveCount(1);
    await expect(this.enabledSwitch).toHaveCount(1);
    await expect(this.disabledSwitch).toHaveCount(1);
    expect(await this.basicTableColumns.count()).toBeGreaterThan(0);
    await expect(this.openTabLink).toHaveCount(1);
    await expect(this.openWindowButton).toHaveCount(1);
  }
}
