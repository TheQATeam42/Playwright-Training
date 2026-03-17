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

/**
 * Test: Empty Required Fields
 */
const requiredFields = ["name", "phone", "street", "city"];

requiredFields.forEach((field) => {
  createContactTest(
    `Should show error when required field "${field}" is empty`,
    async ({ page, contacts }): Promise<void> => {
      const contactsPage = contacts();
      const createContactPage = new CreateContact(page);

      // 1.navigate to create form and verify the header
      await expect(contactsPage.createButton).toBeVisible();
      await contactsPage.clickCreate();
      await expect(createContactPage.pageHeader).toHaveText("Create Contact");

      // 2.fill in all fields except the one being tested
      if (field !== "name") await createContactPage.nameInput.fill("Test Name");
      if (field !== "phone") await createContactPage.phoneInput.fill("123456789");
      if (field !== "street") await createContactPage.streetInput.fill("Test Street");
      if (field !== "city") await createContactPage.cityInput.fill("Test City");

      // 3.attempt to save
      await createContactPage.save();

      // 4.verify correct error message is displayed
      await expect(createContactPage.errorMessage).toBeVisible();
      await expect(createContactPage.errorMessage).toHaveText(
        `Error: The "${field}" field can't be empty.`
      );
    }
  );
});

/**
 * Test: Invalid Phone Numbers
 */
const invalidPhoneNumbers = [
  { testName: "letters", value: "abcdefghi" },
  { testName: "control characters", value: "!@#$%^&*()" },
  { testName: "negative number", value: "-12345678" },
  { testName: "less than 8 digits", value: "1234567" },
  { testName: "more than 10 digits", value: "12345678901" },
];

invalidPhoneNumbers.forEach(({ testName, value }) => {
  createContactTest(
    `Should show error when phone number contains ${testName}`,
    async ({ page, contacts }): Promise<void> => {
      const contactsPage = contacts();
      const createContactPage = new CreateContact(page);

      // 1.navigate to create form
      await expect(contactsPage.createButton).toBeVisible();
      await contactsPage.clickCreate();
      await expect(createContactPage.pageHeader).toHaveText("Create Contact");

      // 2.fill in all fields with valid data except the phone field
      await createContactPage.nameInput.fill("Test Name");
      await createContactPage.streetInput.fill("Test Street");
      await createContactPage.cityInput.fill("Test City");

      // Fill phone with invalid value
      await createContactPage.phoneInput.fill(value);

      // 3.attempt to save
      await createContactPage.save();

      // 4.verify correct error message is displayed
      await expect(createContactPage.errorMessage).toBeVisible();
      await expect(createContactPage.errorMessage).toHaveText(
        'Error: The "phone" field must contain at least 8-10 digit'
      );
    }
  );
});
