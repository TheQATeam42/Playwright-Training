import { expect } from "playwright/test";
import { test } from "../setup/hooks";
import {
  areCheckboxesChecked,
  checkCheckboxes,
  clickOnMovieCheckBox,
  openPlayground,
  parseTable,
  searchMovie,
  selectFirstMovieOption,
  selectMovieOption,
  verifyMovieInputValue,
} from "../steps/playground-steps";
import { getElement } from "../support/elements-helper";
import { globalConfig } from "..";
import { Dessert } from "../common/models/dessert";
import { getDesserts } from "../data-sources/services/desserts";

const movieToSelect = "The Dark Knight";

test.describe("Movies input", () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page);
  });

  test("check movie selection with search", async ({ page }) => {
    await searchMovie(page, movieToSelect);
    await selectFirstMovieOption(page);
    expect(await verifyMovieInputValue(page, movieToSelect)).toBeTruthy();
  });

  test("check movie selection", async ({ page }) => {
    await clickOnMovieCheckBox(page);
    await selectMovieOption(page, movieToSelect);
    expect(await verifyMovieInputValue(page, movieToSelect)).toBeTruthy();
  });
});

test.describe("check checkboxes", async () => {
  test("mark all checkboxes", async ({ page }) => {
    await openPlayground(page);
    await checkCheckboxes(page);
    expect(await areCheckboxesChecked(page)).toBeTruthy();
  });
});

test.describe("check switches", async () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page);
  });

  test("check if first checkbox is enabled", async ({ page }) => {
    const secondSwitch = await getElement(page, "switch one", globalConfig);
    await expect(secondSwitch).toBeEnabled();
  });

  test("check if the second switch is disabled", async ({ page }) => {
    const secondSwitch = await getElement(page, "switch two", globalConfig);
    await expect(secondSwitch).toBeDisabled();
  });
});

test.describe("check table", async () => {
  test.beforeEach(async ({ page }) => await openPlayground(page));

  test("check if data is correct", async ({ page }) => {
    const expectedTable: Dessert[] = await getDesserts();
    const actualTable: Dessert[] = await parseTable(page);
    
    expect(actualTable).toStrictEqual(expectedTable);
  });
});
