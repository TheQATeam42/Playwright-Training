import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import { Dessert } from "../../sharedFiles/modals/dessert.model";
import Contacts from "../pages/contacts.page";

/**
 * Tests for the Playground page.
 * Uses:
 *  contacts()   → navigate from contacts list to playground
 *  playground() → interact with playground elements
 */
const playgroundTest = reactAppTest.extend({});

const expectedDesserts: Dessert[] = [
  new Dessert("Frozen yoghurt",     159, 6,   24, 4  ),
  new Dessert("Ice cream sandwich", 237, 9,   37, 4.3),
  new Dessert("Eclair",             262, 16,  24, 6  ),
  new Dessert("Cupcake",            305, 3.7, 67, 4.3),
  new Dessert("Gingerbread",        356, 16,  49, 3.9),
];

playgroundTest(
  "playground test",
  async ({ contacts, playground, page }): Promise<void> => {
    await expect(contacts().searchBar).toBeVisible();
    await contacts().playgroundButton.click();
    expect(page.url()).toContain(ReactAppEndpoints.playgroundend);
    const movieName = "The Godfather";
    await playground().selectMovie(movieName);
    await expect(playground().movieInput).toHaveValue(movieName);
    await playground().clearButton.click();
    await expect(playground().movieInput).toHaveValue("");
    await playground().selectMovieByIndex(0);
    await expect(playground().switchOne).toBeChecked();
    await playground().switchOne.click();
    await expect(playground().switchOne).not.toBeChecked();
    await expect(playground().switchTwo).toBeDisabled();
    const rowCount = await playground().tableRows.count();
    for (let i = 0; i < rowCount; i++) {
      const actual   = await playground().getTableRowData(i);
      const expected = expectedDesserts[i];
      expect(actual.name).toBe(expected.name);
      expect(actual.calories).toBe(expected.calories);
      expect(actual.fat).toBe(expected.fat);
      expect(actual.carbs).toBe(expected.carbs);
      expect(actual.protein).toBe(expected.protein);
    }

    await playground().newWindowButton.click();
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page")
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toBe("https://hub.testingtalks.com.au/");

    const newWindowContacts = new Contacts(newPage);
    await expect(newWindowContacts.searchBar).toBeVisible();
    const newContactButton = newPage.getByTestId("add-button");
    await newContactButton.click();
    expect(newPage.url()).toBe("https://hub.testingtalks.com.au/tasks/create");

    await playground().iframeAddButton.click();
    await expect(playground().iframeCreateContactTitle).toHaveText("Create Contact");
  }
);
