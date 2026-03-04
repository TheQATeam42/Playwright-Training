import reactAppTest from "./setup/testLevelHooks.setup";
import { test, expect } from "@playwright/test";

/**
 * Here you write all the tests for the contactsList page.
 * Like Chappell Roan said: `Good luck babe!`
 *
 * Your checklist for this file:
 *
 * TODO: Change the file name
 * TODO: Expand the first test block
 * TODO: Delete this comment when done
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest("Contact Searchbar", async ({ page }): Promise<void> => {
  // Checking if the searchbar exists
  const searchBar = page.locator('input[data-id="search"]');
  await expect(searchBar).toBeVisible();

  // Checking if a certain individual exists
  let personName = "August Erickson";
  searchBar.fill(personName);
  const contactItems = page.locator('div[data-id="contact"]');
  await expect(contactItems).toHaveCount(1);

  // Checking delete button
  page.once("dialog", (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });
  await contactItems.locator('button[data-id="delete-button"]').click();
  await expect(contactItems).toHaveCount(0);

  // Checking if refresh works
  await page.reload();
  searchBar.fill(personName);
  await expect(contactItems).toHaveCount(1);
});
