import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import { Dessert } from "../../sharedFiles/modals/dessert.model";
import Contacts from "../pages/contacts.page";

/**
 * Tests for the Playground page.
 *
 * Each logical section is wrapped in a named test.step() so that
 * the Playwright report shows exactly which part failed — following
 * Uncle Bob's rule that functions (and their equivalent in tests)
 * should do one thing and be clearly named.
 *
 * Uses:
 *  contacts()   → navigate from contacts list to playground
 *  playground() → interact with playground elements via components
 */
const playgroundTest = reactAppTest.extend({});

const expectedDesserts: Dessert[] = [
  new Dessert("Frozen yoghurt", 159, 6, 24, 4),
  new Dessert("Ice cream sandwich", 237, 9, 37, 4.3),
  new Dessert("Eclair", 262, 16, 24, 6),
  new Dessert("Cupcake", 305, 3.7, 67, 4.3),
  new Dessert("Gingerbread", 356, 16, 49, 3.9),
];

playgroundTest(
  "playground test",
  async ({ contacts, playground, page }): Promise<void> => {
    await playgroundTest.step("Navigate to Playground", async () => {
      await expect(contacts().searchBar).toBeVisible();
      await playground().playgroundButton.click();
      expect(page.url()).toContain(ReactAppEndpoints.playgroundEnd);
    });

    await playgroundTest.step("Movie autocomplete", async () => {
      const movieName = "The Godfather";
      await playground().movieAutocomplete.selectMovie(movieName);
      await expect(playground().movieAutocomplete.movieInput).toHaveValue(
        movieName
      );
      const firsIndex: number = 0;
      await playground().movieAutocomplete.clearButton.click();
      await expect(playground().movieAutocomplete.movieInput).toHaveValue("");
      await playground().movieAutocomplete.selectMovieByIndex(firsIndex);
    });

    await playgroundTest.step("Switch group", async () => {
      await expect(playground().switchGroup.switchOne).toBeChecked();
      await playground().switchGroup.switchOne.click();
      await expect(playground().switchGroup.switchOne).not.toBeChecked();
      await expect(playground().switchGroup.switchTwo).toBeDisabled();
    });

    await playgroundTest.step("Dessert table", async () => {
      const rowCount = await playground().dessertTable.tableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const actual = await playground().dessertTable.getTableRowData(i);
        expect(actual).toEqual(expectedDesserts[i]);
      }
    });

    await playgroundTest.step("New window", async () => {
      await playground().newWindow.newWindowButton.click();
      const [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
      ]);
      await newPage.waitForLoadState();
      expect(newPage.url()).toBe("https://hub.testingtalks.com.au/");

      const newWindowContacts = new Contacts(newPage);
      await expect(newWindowContacts.searchBar).toBeVisible();
      await newWindowContacts.createContactButton.click();
      expect(newPage.url()).toBe(
        "https://hub.testingtalks.com.au/tasks/create"
      );
    });

    await playgroundTest.step("Iframe", async () => {
      await playground().iframeSection.addButton.click();
      await expect(playground().iframeSection.createContactTitle).toHaveText(
        "Create Contact"
      );
    });
  }
);
