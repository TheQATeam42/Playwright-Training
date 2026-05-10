import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the Movie Autocomplete widget on the Playground page.
 * Provides locators and actions for selecting movies by name or index.
 *
 * @extends BaseComponent
 */
export default class MovieAutocompleteComponent extends BaseComponent {
  /** Text input for typing a movie name */
  public readonly movieInput: Locator;
  /** Button that opens the movie suggestions dropdown */
  public readonly movieDropdown: Locator;
  /** Button that clears the current movie selection */
  public readonly clearButton: Locator;

  constructor(page: Page) {
    super(page);
    this.movieInput = page.locator("#movies-input");
    this.movieDropdown = page.locator("[title='Open']");
    this.clearButton = page.locator("[title='Clear']");
  }

  /**
   * Types a movie name into the input and clicks the exact matching suggestion.
   * @param movie - The exact movie title to search for and select
   */
  async selectMovie(movie: string): Promise<void> {
    await this.movieInput.fill(movie);
    await this.page.getByRole("option", { name: movie, exact: true }).click();
  }

  /**
   * Opens the dropdown and selects the movie at the given zero-based position.
   * @param index - Zero-based index of the option in the dropdown list
   */
  async selectMovieByIndex(index: number): Promise<void> {
    await this.movieDropdown.click();
    await this.page.getByRole("option").nth(index).click();
  }
}
