import { Locator, Page } from "playwright";
import { getElement } from "../support/elements-helper";
import { globalConfig } from "..";
import {
  selectAutocompleteComboBoxOption,
  selectAutocompleteComboBoxOptionByIndex,
} from "../common/helpers/combo-box";
import { fillField } from "../common/helpers/elements-helper";
import { Dessert } from "../common/models/dessert";

/**
 * Opens the playground by clicking the playground button.
 * @param page The Playwright page object
 */
export const openPlayground = async (page: Page) => {
  const playgroundButton = await getElement(
    page,
    "playground button",
    globalConfig
  );
  await playgroundButton.click();
};

/**
 * Searches for a movie by entering the movie name in the movies input field.
 * @param page The Playwright page object
 * @param movieName The name of the movie to search for
 */
export const searchMovie = async (page: Page, movieName: string) => {
  await fillField(page, "movies input", movieName, globalConfig);
};

export const selectFirstMovieOption = async (page: Page) => {
  await selectAutocompleteComboBoxOptionByIndex(
    page,
    "movies input options",
    0
  );
};

export const selectMovieOption = async (page: Page, movieToSelect: string) => {
  await selectAutocompleteComboBoxOption(
    page,
    "movies input options",
    movieToSelect
  );
};

/**
 * Verifies that the value of the movie input field matches the required value.
 * @param page The Playwright page object
 * @param requiredValue The value to verify in the input field
 * @returns True if the input value matches, false otherwise
 */
export const verifyMovieInputValue = async (
  page: Page,
  requiredValue: string
) => {
  const movieInput: Locator = await getElement(
    page,
    "movies input",
    globalConfig
  );
  return (await movieInput.inputValue()) === requiredValue;
};

export const clearSearch = async (page: Page) => {
  await searchMovie(page, "");
};

export const clickOnMovieCheckBox = async (page: Page) => {
  const movieInput: Locator = await getElement(
    page,
    "movies input",
    globalConfig
  );
  await movieInput.click();
};

export const checkCheckboxes = async (page: Page) => {
  const checkboxes: Locator[] = await (
    await getElement(page, "checkbox", globalConfig)
  ).all();

  for (const checkbox of checkboxes) {
    await checkbox.check();
  }
};

export const areCheckboxesChecked = async (page: Page) => {
  const checkboxes: Locator[] = await (
    await getElement(page, "checkbox", globalConfig)
  ).all();

  for (const checkbox of checkboxes) {
    if (!(await checkbox.isChecked())) return false;
  }

  return true;
};

export const parseTable = async (page: Page): Promise<Dessert[]> => {
    const table: Locator = await getElement(page, "dessert table", globalConfig);
    const rows = table.locator("tr");
    const desserts: Dessert[] = [];
  
    const rowCount = await rows.count();
  
    for (let i = 1; i < rowCount; i++) { // skip header
      const cells = await rows.nth(i).locator("th, td").allInnerTexts();
  
      if (cells.length > 0) {
        desserts.push({
          name: cells[0]?.trim() || "",
          calories: Number(cells[1]?.trim() || 0),
          fat: Number(cells[2]?.trim() || 0),
          carbs: Number(cells[3]?.trim() || 0),
          protein: Number(cells[4]?.trim() || 0),
        });
      }
    }
  
    return desserts;
  };
  