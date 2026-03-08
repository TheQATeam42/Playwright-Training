import reactAppTest from "./setup/testLevelHooks.setup";
import { expect, Page } from "@playwright/test";
import ReactAppEndpoints from "../utils/endpoints.util";

const playgroundTest = reactAppTest.extend({});

class DessertRow {
  constructor(
    public name: string,
    public calories: number,
    public fat: number,
    public carbs: number,
    public protein: number
  ) {}
}

const expectedTableData: DessertRow[] = [
  new DessertRow("Frozen yoghurt",     159, 6,    24, 4),
  new DessertRow("Ice cream sandwich", 237, 9,    37, 4.3),
  new DessertRow("Eclair",             262, 16,   24, 6),
  new DessertRow("Cupcake",            305, 3.7,  67, 4.3),
  new DessertRow("Gingerbread",        356, 16,   49, 3.9),
];

async function navigateToPlayground(page: Page): Promise<void> {
  await page.goto(ReactAppEndpoints.PLAYGROUND);
}

playgroundTest(
  "Autocomplete - search for a movie and verify selection",
  async ({ page, playground }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);
    await playgroundPage.selectMovieFromSearch("The");
    const selectedValue = await playgroundPage.movieInput.inputValue();
    expect(selectedValue.length).toBeGreaterThan(0);
    await playgroundPage.clearMovieInput();
    await expect(playgroundPage.movieInput).toHaveValue("");
    await playgroundPage.selectMovieWithoutSearch(0);
    const selectedWithoutSearch = await playgroundPage.movieInput.inputValue();
    expect(selectedWithoutSearch.length).toBeGreaterThan(0);
  }
);


playgroundTest.only(
  "Switch - verify switch-one is togglable and switch-two is disabled",
  async ({ page, playground }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);
    await playgroundPage.switchOne.click();
    await expect(playgroundPage.switchOne).not.toBeChecked();
    await playgroundPage.switchOne.click();
    await expect(playgroundPage.switchOne).toBeChecked();
    await expect(playgroundPage.switchTwo).toBeDisabled();
  }
);

playgroundTest(
  "Table - verify all rows match expected data",
  async ({ page, playground }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);

    const rows = playgroundPage.tableRows;
    await expect(rows).toHaveCount(expectedTableData.length);

    for (let i = 0; i < expectedTableData.length; i++) {
      const row      = rows.nth(i);
      const cells    = row.locator("td, th");
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
  async ({ page, playground, context }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);
    const [newTab] = await Promise.all([
      context.waitForEvent("page"),
      playgroundPage.openTabLink.click(),
    ]);
    await newTab.waitForLoadState();
    await newTab.locator('[data-id="add-button"]').click();
    await expect(newTab).toHaveURL(new RegExp(ReactAppEndpoints.CREATE_CONTACT));
  }
);

playgroundTest(
  "Open Window - click button, navigate to new window, verify create page opens",
  async ({ page, playground, context }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);
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

playgroundTest.only(
  "IFrame - navigate to home page inside iframe, click create, verify create page",
  async ({ page, playground }): Promise<void> => {
    const playgroundPage = playground();
    await navigateToPlayground(page);
    const iframeCreateButton = playgroundPage.iframe.locator(
      '[data-id="add-button"]'
    );
    
    await expect(iframeCreateButton).toBeVisible();
    await iframeCreateButton.click();
    const iframeTitle = playgroundPage.iframe.locator('[data-id="create-contact-header"]');
    await expect(iframeTitle).toHaveText("Create Contact");
  }
);