import reactAppTest from "./setup/testLevelHooks.setup";
import CreateContact from "../pages/create-contact.page";
import Contacts from "../pages/contacts.page";

/** * Extended test instances for categorized reporting or specific hook overrides.
 */
const createContactTest = reactAppTest.extend({});
const createContactMissingFieldsTest = reactAppTest.extend({});
const createContactInvalidPhoneTest = reactAppTest.extend({});

/**
 * FEATURE: Contact Management
 * SCENARIO: User creates a valid contact and verifies its existence in the list.
 */
createContactTest(
  "Create Contact - Valid Input",
  async ({ page }): Promise<void> => {
    const createContactPage = new CreateContact(page);
    const contactsPage = new Contacts(page);

    // Step 1: Initialize form entry
    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    // Step 2: Submit valid data
    await createContactPage.fillContactForm({
      name: "Shir Zohar",
      gender: "Female",
      phone: "123456789",
      street: "123 Main St",
      city: "New York",
    });
    await createContactPage.saveContact();

    // Step 3: Verification on the Contacts List page
    await contactsPage.searchForContact("Shir Zohar");
    await contactsPage.checkContactIsVisible("Shir Zohar");

    // Step 4: Verify persistence (or lack thereof depending on app state) after refresh
    await contactsPage.refreshPage();
    await contactsPage.searchForContact("Shir Zohar");
    await contactsPage.checkContactListLength(0); // Note: Assuming no data persistence, adjust as needed if the app does persist data
  }
);

/**
 * FEATURE: Form Validation
 * SCENARIO: Ensure each mandatory field triggers the correct 'empty' error message.
 */
createContactMissingFieldsTest(
  "Create Contact - Invalid Input (Missing Required Fields)",
  async ({ page }): Promise<void> => {
    const createContactPage = new CreateContact(page);

    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    // Data-driven approach to test every required field sequentially
    for (const field of ["name", "phone", "street", "city"]) {
      await createContactPage.fillContactForm({
        name: field === "name" ? "" : "Shir Zohar",
        gender: "Female",
        phone: field === "phone" ? "" : "123456789",
        street: field === "street" ? "" : "123 Main St",
        city: field === "city" ? "" : "New York",
      });

      await createContactPage.saveContact();
      await createContactPage.checkErrorMessage(field);
    }
  }
);

/**
 * FEATURE: Form Validation
 * SCENARIO: Verify that non-numeric or incorrectly formatted phone numbers are rejected.
 */
createContactInvalidPhoneTest(
  "Create Contact - Invalid Input (Invalid Phone Number)",
  async ({ page }): Promise<void> => {
    const createContactPage = new CreateContact(page);

    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    const invalidPhones = ["letters", "!!@#", "12345", "1234567890"];

    for (const phone of invalidPhones) {
      await createContactPage.fillContactForm({
        name: "Shir Zohar",
        gender: "Female",
        phone: phone,
        street: "123 Main St",
        city: "New York",
      });

      await createContactPage.saveContact();
      await createContactPage.checkInvalidPhoneErrorMessage();
    }
  }
);
