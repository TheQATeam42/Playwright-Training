import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import ReactAppEndpoints from "../utils/endpoints.util";
import { expectedTableData } from "../models/dessertRow.model";

const playgroundTest = reactAppTest.extend({});

playgroundTest.beforeEach(async ({ page }) => {
  await page.goto(ReactAppEndpoints.PLAYGROUND);
});

playgroundTest(
  "Autocomplete - search for a movie and verify selection",
  async ({ playground }): Promise<void> => {
    const playgroundPage = playground();
    await playgroundPage.autocomplete.selectMovieFromSearch("The");
    const selectedValue =
      await playgroundPage.autocomplete.movieInput.inputValue();
    expect(selectedValue.length).toBeGreaterThan(0);
    await playgroundPage.autocomplete.clearMovieInput();
    await expect(playgroundPage.autocomplete.movieInput).toHaveValue("");
    await playgroundPage.autocomplete.selectMovieWithoutSearch(0);
    const selectedWithoutSearch =
      await playgroundPage.autocomplete.movieInput.inputValue();
    expect(selectedWithoutSearch.length).toBeGreaterThan(0);
  }
);

playgroundTest(
  "Switch - verify switch-one is togglable and switch-two is disabled",
  async ({ playground }): Promise<void> => {
    const playgroundPage = playground();
    await playgroundPage.switches.switchOne.click();
    await expect(playgroundPage.switches.switchOne).not.toBeChecked();
    await playgroundPage.switches.switchOne.click();
    await expect(playgroundPage.switches.switchOne).toBeChecked();
    await expect(playgroundPage.switches.switchTwo).toBeDisabled();
  }
);

playgroundTest(
  "Table - verify all rows match expected data",
  async ({ playground }): Promise<void> => {
    const playgroundPage = playground();
    const rows = playgroundPage.table.rows;
    await expect(rows).toHaveCount(expectedTableData.length);

    for (let i = 0; i < expectedTableData.length; i++) {
      const row = rows.nth(i);
      const cells = row.locator("td, th");
      const expected = expectedTableData[i];

      await expect(cells.nth(0)).toHaveText(String(expected.name));
      await expect(cells.nth(1)).toHaveText(String(expected.calories));
      await expect(cells.nth(2)).toHaveText(String(expected.fat));
      await expect(cells.nth(3)).toHaveText(String(expected.carbs));
      await expect(cells.nth(4)).toHaveText(String(expected.protein));
    }
  }
);

playgroundTest(
  "Open Tab - click link, navigate to new tab, verify create page opens",
  async ({ playground, context }): Promise<void> => {
    const playgroundPage = playground();
    const [newTab] = await Promise.all([
      context.waitForEvent("page"),
      playgroundPage.openTabLink.click(),
    ]);
    await newTab.waitForLoadState();
    await newTab.locator('[data-id="add-button"]').click();
    await expect(newTab).toHaveURL(
      new RegExp(ReactAppEndpoints.CREATE_CONTACT)
    );
  }
);

playgroundTest(
  "Open Window - click button, navigate to new window, verify create page opens",
  async ({ playground, context }): Promise<void> => {
    const playgroundPage = playground();
    const [newWindow] = await Promise.all([
      context.waitForEvent("page"),
      playgroundPage.openWindowButton.click(),
    ]);

    await newWindow.waitForLoadState();
    await newWindow.locator('[data-id="add-button"]').click();
    await expect(newWindow).toHaveURL(
      new RegExp(ReactAppEndpoints.CREATE_CONTACT)
    );
  }
);

playgroundTest(
  "IFrame - navigate to home page inside iframe, click create, verify create page",
  async ({ playground }): Promise<void> => {
    const playgroundPage = playground();
    const iframeCreateButton = playgroundPage.iframe.locator(
      '[data-id="add-button"]'
    );

    await expect(iframeCreateButton).toBeVisible();
    await iframeCreateButton.click();
    const iframeTitle = playgroundPage.iframe.locator(
      '[data-id="create-contact-header"]'
    );
    await expect(iframeTitle).toHaveText("Create Contact");
  }
);
