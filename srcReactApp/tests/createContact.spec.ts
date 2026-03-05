import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "@playwright/test";
import Contact from "../components/contact.component";
import CreateContact from "../pages/createContact.page";

const createContactTest = reactAppTest.extend({});

/**
 * Test: Create a new contact
 */
createContactTest(
  "Create a new contact",
  async ({ page, contacts }): Promise<void> => {
    const contactsPage = contacts();
    const createContactPage = new CreateContact(page);

    const newContact = {
      name: "Shachar",
      phone: "123456789",
      street: "Best Street",
      city: "Haifa",
    };

    //1.verify the create button is visible
    await expect(contactsPage.createButton).toBeVisible();

    //2.click the create button
    await contactsPage.clickCreate();

    //3.verify the create contact form opened with the correct header
    await expect(createContactPage.pageHeader).toHaveText("Create Contact");

    //4.fill in the form fields
    await createContactPage.fill(
      newContact.name,
      newContact.phone,
      newContact.street,
      newContact.city
    );

    //5.click save
    await createContactPage.save();

    //6.verify the system redirected back to the contacts list with the correct title
    await expect(contactsPage.pageTitle).toHaveText("Contacts");

    //7.search for the newly created contact
    await contactsPage.search(newContact.name);

    //8.verify the contact is in the list with the correct details and is the only result
    const contact = new Contact(page);
    await expect(contact.name).toHaveText(newContact.name);
    await expect(contact.address).toContainText(newContact.street);
    await expect(contact.address).toContainText(newContact.city);
    await expect(contactsPage.contactsList).toHaveCount(1);

    //9.reload the page
    await contactsPage.reload();

    //10.search again and verify the creation was not persistent
    await contactsPage.search(newContact.name);
    await expect(contactsPage.contactsList).toHaveCount(0);
  }
);
