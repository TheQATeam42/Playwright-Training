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

contactsListTest(
  "Contact Searchbar visible",
  async ({ page }): Promise<void> => {
    const searchBar = page.locator('input[data-id="search"]');
    await expect(searchBar).toBeVisible();
    searchBar.fill("August Erickson");

    const contactItems = page.locator('div[data-id="contact"]');

    await expect(contactItems).toHaveCount(1);

    page.once("dialog", (dialog) => {
      console.log(dialog.message()); // Optional: see the text (e.g., "Are you sure?")
      dialog.accept(); // This clicks the "OK" or "Confirmation" button
    });

    await contactItems.locator('button[data-id="delete-button"]').click();

    await expect(contactItems).toHaveCount(0);
    await page.reload();
    searchBar.fill("August Erickson");
    await expect(contactItems).toHaveCount(1);
  }
);
