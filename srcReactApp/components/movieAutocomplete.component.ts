import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the Movie Autocomplete widget on the Playground page.
 * Provides locators and actions for selecting movies by name or index.
 *
 * @extends BaseComponent
 */
export default class MovieAutocompleteComponent extends BaseComponent {
  public readonly movieInput: Locator;
  public readonly movieDropdown: Locator;
  public readonly clearButton: Locator;

  constructor(page: Page) {
    super(page);
    this.movieInput = page.locator("#movies-input");
    this.movieDropdown = page.locator("[title='Open']");
    this.clearButton = page.locator("[title='Clear']");
  }

  async selectMovie(movie: string): Promise<void> {
    await this.movieInput.fill(movie);
    await this.page.getByRole("option", { name: movie, exact: true }).click();
  }

  async selectMovieByIndex(index: number): Promise<void> {
    await this.movieDropdown.click();
    await this.page.getByRole("option").nth(index).click();
  }
}
