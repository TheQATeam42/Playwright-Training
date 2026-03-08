import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
import Contacts from "../pages/contacts.page";
import AddContactPage from "../pages/addContact.page";
dotenv.config();

const addContactListTest = reactAppTest.extend({});

addContactListTest("Add Contact", async ({ page }): Promise<void> => {
  // Opening add contact page
  const contactPage = new Contacts(page);
  await contactPage.openAddContactPage();

  const addContactPage = new AddContactPage(page);
  // Checking the uri
  addContactPage.verifyPageUri();

  // filling out form
  let personName = "name";

  await addContactPage.fillContactDetails(personName, "000", "city", "street");
  await addContactPage.clickSaveButton();

  await contactPage.verifyContactsPage();

  // Verifying this person was added.
  await contactPage.search(personName);
  await expect(contactPage.contactItems).toHaveCount(1);

  // Checking that on reload the data was not saved.
  await page.reload();
  await contactPage.search(personName);
  await expect(contactPage.contactItems).toHaveCount(0);
});

const addContactsInvalidInput = reactAppTest.extend({});
addContactsInvalidInput(
  "Add Contact with empty field input",
  async ({ page }): Promise<void> => {
    const contactPage = new Contacts(page);
    await contactPage.openAddContactPage();

    const addContactPage = new AddContactPage(page);
    await addContactPage.verifyPageUri();
    // The various fields and accompanying valid values.

    const allFields1 = ["Human Name", "0000", "Street st", "City here"];
    // Iterating over the field we will skip
    for (let i = 0; i < allFields1.length; i++) {
      // Creating array copy
      let copy = [...allFields1];
      copy[i] = "";
      await addContactPage.fillContactDetails(
        copy[0],
        copy[1],
        copy[2],
        copy[3]
      );

      await addContactPage.clickSaveButton();
      await expect(addContactPage.errorLabel).toBeVisible();

      // Reloading page.
      await addContactPage.reloadPage();
    }
  }
);

const addContactsInvalidPhoneInput = reactAppTest.extend({});

addContactsInvalidPhoneInput(
  "Add Contact with invalid phone input",
  async ({ page }): Promise<void> => {
    const contactPage = new Contacts(page);
    await contactPage.openAddContactPage();

    const addContactPage = new AddContactPage(page);
    await addContactPage.verifyPageUri();

    // Valid input
    await addContactPage.fillPhoneNumber("123456789");
    await expect(addContactPage.phoneLabel).toHaveValue("123456789");

    // Invalid Input
    await addContactPage.fillPhoneNumber("1234567890");
    await expect(addContactPage.phoneLabel).toHaveValue("123456789");

    // Should not be able to enter letters.
    await addContactPage.fillPhoneNumber("abcd");
    await expect(addContactPage.phoneLabel).toHaveValue("");
  }
);
