import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

interface Contact {
  name: string;
  gender: "Male" | "Female";
  address: string;
}

const contactsListTest = reactAppTest.extend({});

contactsListTest("DeleteContact", async ({ page }): Promise<void> => {
  const contact: Contact = {
    name: "Nissim Wade",
    gender: "Male",
    address: "887-1297 Sollicitudin Rd., Acireale",
  };

  // Find search bar and verify it is visible
  const searchInput: Locator = page.locator('[data-id="search"]');
  await expect(searchInput).toBeVisible();

  // Look for chosen contact
  await searchInput.fill(contact.name);

  const searchedContacts: Locator = page.locator(
    '.ContactListItems > div[data-id="contact"]'
  );
  await expect(searchedContacts).toHaveCount(1);

  const searchedContact: Locator = searchedContacts.first();
  await expect(searchedContact.locator('[data-id="name"]')).toHaveText(
    contact.name
  );
  await expect(searchedContact.locator('[data-id="gender"]')).toHaveText(
    contact.gender
  );
  await expect(searchedContact.locator('[data-id="address"]')).toHaveText(
    contact.address
  );

  // Delete the contact and verify it is deleted
  const deleteButton: Locator = page.locator('[data-id="delete-button"]');

  await page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await deleteButton.click();

  await expect(searchedContacts).toHaveCount(0);

  // Reload to make sure the contact is back
  await page.reload({ waitUntil: "load" });
  await searchInput.fill(contact.name);
  await expect(searchedContacts).toHaveCount(1);
});
