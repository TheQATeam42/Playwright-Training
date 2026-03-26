import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

export default class Autocomplete extends BaseComponent {
  readonly movieInput: Locator;
  readonly openButton: Locator;
  readonly options: Locator;

  constructor(page: Page) {
    super(page);
    this.movieInput = page.locator("#movies-input");
    this.openButton = page.locator('[aria-label="Open"]');
    this.options = page.locator(".MuiAutocomplete-option");
  }

  async selectMovieFromSearch(movieName: string): Promise<void> {
    await this.movieInput.fill(movieName);
    await this.options.first().click();
  }

  async selectMovieWithoutSearch(index: number = 0): Promise<void> {
    await this.openButton.click();
    await this.options.nth(index).click();
  }

  async clearMovieInput(): Promise<void> {
    await this.movieInput.clear();
  }
}
