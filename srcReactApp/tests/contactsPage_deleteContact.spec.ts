import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import {
  clearSearchBar,
  getAllContactsLocator,
  getSearchBarLocator,
  getSpecificContactLocatorFromAllContacts,
} from "../utils/helpers/contactsHelpers.util";
import { setupOnDialog } from "../utils/helpers/dialogHelpers.util";
import { NAME_OF_USER_TO_DELETE } from "../Global Variables/testVariables";

const contactsListTest = reactAppTest.extend({});

contactsListTest("Contact Deletion Test", async ({ page }): Promise<void> => {
  // Step 1
  const searchBarLocator: Locator = getSearchBarLocator(page);
  await expect(searchBarLocator).toBeVisible();

  // Step 2
  await searchBarLocator.fill(NAME_OF_USER_TO_DELETE);
  const allContacts: Locator = getAllContactsLocator(page);

  // Step 3
  const specificContactLocator: Locator =
    getSpecificContactLocatorFromAllContacts(
      allContacts,
      NAME_OF_USER_TO_DELETE
    );
  await expect(specificContactLocator).toBeVisible();

  // Step 4
  await expect(allContacts).toHaveCount(1);

  // Step 5 & 6
  const deleteButton: Locator = specificContactLocator.getByRole("button", {
    name: "Delete",
  });
  setupOnDialog(page);
  await deleteButton.click();

  // Step 7
  await clearSearchBar(searchBarLocator);
  await expect(specificContactLocator).toHaveCount(0);

  // Step 8
  await page.reload();

  // Step 9
  await expect(specificContactLocator).toHaveCount(1);
});
