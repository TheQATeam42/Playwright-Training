import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const addContactListTest = reactAppTest.extend({});

addContactListTest("Add Contact", async ({ page }): Promise<void> => {
  // Checking if the create button exists
  const createContactBtn = page.locator('button[data-id="add-button"]');
  await expect(createContactBtn).toBeVisible();

  // Click button
  await createContactBtn.click();

  // Checking the uri
  let baseUrl = process.env.REACT_BASE_URL;
  await expect(page).toHaveURL(baseUrl + "tasks/create");
  // Checking for 'Create Contact'
  const pageTitle = page.locator('[data-id="create-contact-header"]');
  await expect(pageTitle).toContainText("Create Contact");

  // filling out form
  let personName = "name";

  let nameLabel = page.locator('[data-id="name"]');
  await nameLabel.fill(personName);
  let phoneLabel = page.locator('[data-id="phone"]');
  await phoneLabel.fill("000");
  let streetLabel = page.locator('[data-id="street"]');
  await streetLabel.fill("street");
  let cityLabel = page.locator('[data-id="city"]');
  await cityLabel.fill("city");

  let saveBtn = page.locator('button[data-id="save-button"]');
  await saveBtn.click();

  // Ensuring we returned to the main contact page
  await expect(page).toHaveURL(baseUrl!);

  // Checking the title of this page is correct.
  const contactsPageTitle = page.locator('[data-id="contacts"]');
  await expect(contactsPageTitle).toContainText("Contacts");

  // Verifying this person was added.
  const searchBar = page.locator('input[data-id="search"]');
  await searchBar.fill(personName);
  const contactItems = page.locator('div[data-id="contact"]');
  await expect(contactItems).toHaveCount(1);

  // Checking that on reload the data was not saved.
  await page.reload();
  searchBar.fill(personName);
  await expect(contactItems).toHaveCount(0);
});

const addContactsInvalidInput = reactAppTest.extend({});

addContactsInvalidInput(
  "Add Contact with invalid input",
  async ({ page }): Promise<void> => {
    const createContactBtn = page.locator('button[data-id="add-button"]');
    // Click button
    await createContactBtn.click();
    let phoneLabel = page.locator('[data-id="phone"]');

    // Valid input
    await phoneLabel.fill("123456789");
    await expect(phoneLabel).toHaveValue("123456789");

    // Invalid Input
    await phoneLabel.fill("1234567890");
    await expect(phoneLabel).toHaveValue("123456789");
  }
);
