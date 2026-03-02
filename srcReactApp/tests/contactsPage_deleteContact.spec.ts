import { expect, Locator, Page } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

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

const nameOfUserToDelete: string = "Alika Medina";

const getSearchBarLocator = (page: Page): Locator => {
  return page.getByTestId("search");
};

const acceptDialog = (page: Page): void => {
  page.on("dialog", (dialog) => dialog.accept());
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

contactsListTest("Contact Deletion Test", async ({ page }): Promise<void> => {
  // Step 1
  const searchBarLocator: Locator = getSearchBarLocator(page);
  await expect(searchBarLocator).toBeVisible();

  // Step 2
  await searchBarLocator.fill(nameOfUserToDelete);
  const contactItemLocator: Locator = page.getByTestId("contact");

  // Step 3
  const specificContactLocator: Locator = contactItemLocator.filter({
    hasText: nameOfUserToDelete,
  });
  await expect(specificContactLocator).toBeVisible();

  // Step 4
  await expect(contactItemLocator).toHaveCount(1);

  // Step 5
  const deleteButton: Locator = specificContactLocator.getByRole("button", {
    name: "Delete",
  });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  await delay(5000);
  acceptDialog(page);
  await expect(page.getByTestId("contact")).toHaveCount(0);
});
