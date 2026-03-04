import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import Contact from "../components/contact.component";

const contactsListTest = reactAppTest.extend({});

/**
 * Test: Delete an existing contact
 */
contactsListTest(
  "Delete an existing contact",
  async ({ page, contacts }): Promise<void> => {
    const contactsPage = contacts();
    const contactComponent = new Contact(page);

    //1.check if search is visible
    await expect(contactsPage.searchInput).toBeVisible();

    //2.search for a contact
    const contactName = "Jorden Cooper";
    await contactsPage.searchInput.fill(contactName);

    //3.verify the contacts name matches
    await expect(contactComponent.name).toHaveText(contactName);

    //4.verify only one contact is shown
    await expect(contactsPage.contactsList).toHaveCount(1);

    //5/6.click delete and accept the confirmation dialog
    page.once("dialog", (dialog) => dialog.accept());
    await contactComponent.deleteButton.click();

    //7.verify the contact is no longer displayed in the list
    await expect(contactsPage.contactsList).toHaveCount(0);

    //8.refresh the page
    await page.reload();

    //9.search for the same contact again after reload and verify the contact is back
    await contactsPage.searchInput.fill(contactName);
    await expect(contactsPage.contactsList).toHaveCount(1);
  }
);
