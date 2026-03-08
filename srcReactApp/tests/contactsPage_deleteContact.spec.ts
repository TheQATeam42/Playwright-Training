import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import { setupOnDialog } from "../utils/helpers/dialogHelpers.util";
import { testConfigs } from "../utils/parseJson.util";
import Contact from "../types/Types/Contact";
import ContactsPage from "../POMs/ContactsPage";

const contactsListTest = reactAppTest.extend({});

contactsListTest("Contact Deletion Test", async ({ page }): Promise<void> => {
  const contactsPage = new ContactsPage(page);

  // Step 1
  await expect(contactsPage.searchbar).toBeVisible();

  // Step 2
  const contactToDelete: Contact = testConfigs.contacts.ToDelete;
  await contactsPage.searchContact(contactToDelete.name);

  // Step 3
  const specificContactLocator: Locator = contactsPage.getSpecificContact(
    contactToDelete.name
  );
  await expect(specificContactLocator).toBeVisible();

  // Step 4
  await expect(contactsPage.allContactItems).toHaveCount(1);

  // Step 5 & 6
  const deleteButton: Locator = specificContactLocator.getByRole("button", {
    name: "Delete",
  });
  setupOnDialog(page);
  await deleteButton.click();

  // Step 7
  await contactsPage.clearSearchBar();
  await expect(specificContactLocator).toHaveCount(0);

  // Step 8
  await page.reload();

  // Step 9
  await expect(specificContactLocator).toHaveCount(1);
});
