import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ContactListPage from "../pages/contactList.page";
import { Contact } from "../models/contact";
import ContactComponent from "../components/contact.component";

const contactsListTest = reactAppTest.extend({});

contactsListTest("DeleteContact", async ({ page }): Promise<void> => {
  const contact: Contact = {
    name: "Nissim Wade",
    gender: "Male",
    address: "887-1297 Sollicitudin Rd., Acireale",
  };

  const contactListComponent: ContactListPage = new ContactListPage(page);

  // Find search bar and verify it is visible
  await expect(contactListComponent.SearchInput).toBeVisible();

  // Look for chosen contact
  await contactListComponent.Search(contact.name);
  await expect(contactListComponent.SearchedContacts).toHaveCount(1);

  const foundContact: ContactComponent = contactListComponent.GetFirstContact();
  await expect(foundContact.Name).toHaveText(contact.name);
  await expect(foundContact.Gender).toHaveText(contact.gender);
  await expect(foundContact.Address).toHaveText(contact.address);

  // Delete the contact and verify it is deleted
  await foundContact.delete();
  await expect(contactListComponent.SearchedContacts).toHaveCount(0);

  // Reload to make sure the contact is back
  await page.reload();
  await contactListComponent.Search(contact.name);
  await expect(contactListComponent.SearchedContacts).toHaveCount(1);
});
