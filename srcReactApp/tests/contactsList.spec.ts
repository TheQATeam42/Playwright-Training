import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "Delete a contact - verify it disappears and reappears after refresh",
  async ({ page, contacts }): Promise<void> => {
    const contactsPage = contacts();
    const contactToDelete = "Abraham Perry";

    await expect(contactsPage.searchBar).toBeVisible();
    await contactsPage.searchContact(contactToDelete);
    await expect(contactsPage.contactCards).toHaveCount(1);
    await expect(page.locator('[data-id="name"]')).toHaveText(contactToDelete);
    page.once("dialog", (dialog) => dialog.accept());
    await contactsPage.contact.deleteContactByName(contactToDelete);
    await expect(contactsPage.contactCards).toHaveCount(0);
    await page.reload();
    await contactsPage.searchContact(contactToDelete);
    await expect(contactsPage.contactCards).toHaveCount(1);
    await expect(page.locator('[data-id="name"]')).toHaveText(contactToDelete);
  }
);