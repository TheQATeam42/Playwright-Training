import reactAppTest from "./setup/testLevelHooks.setup";
import CreateContact from "../pages/create-contact.page";
import Contacts from "../pages/contacts.page";
const createContactTest = reactAppTest.extend({});
const createContactMissingFieldsTest = reactAppTest.extend({});
const createContactInvalidPhoneTest = reactAppTest.extend({});

createContactTest(
  "Create Contact - Valid Input",
  async ({ page }): Promise<void> => {
    // create an instance of the page object
    const createContactPage = new CreateContact(page);

    // check create button exists
    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    // fill the form
    await createContactPage.fillContactForm({
      name: "Shir Zohar",
      gender: "Female",
      phone: "123456789",
      street: "123 Main St",
      city: "New York",
    });

    await createContactPage.saveContact();

    // Go to contacts page and check the new contact is visible

    const contactsPage = new Contacts(page);

    await contactsPage.searchForContact("Shir Zohar");
    await contactsPage.checkContactIsVisible("Shir Zohar");
    await contactsPage.refreshPage();

    // check new contact no longer exists
    await contactsPage.searchForContact("Shir Zohar");
    await contactsPage.checkContactListLength(0);
  }
);

createContactMissingFieldsTest(
  "Create Contact - Invalid Input (Missing Required Fields)",
  async ({ page }): Promise<void> => {
    // create an instance of the page object
    const createContactPage = new CreateContact(page);

    // check create button exists
    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    for (const field of ["name", "phone", "street", "city"]) {
      // fill the form with empty value for the current field
      await createContactPage.fillContactForm({
        name: field === "name" ? "" : "Shir Zohar",
        gender: "Female",
        phone: field === "phone" ? "" : "123456789",
        street: field === "street" ? "" : "123 Main St",
        city: field === "city" ? "" : "New York",
      });

      await createContactPage.saveContact();

      // check error message is displayed
      await createContactPage.checkErrorMessage(field);
    }
  }
);

createContactInvalidPhoneTest(
  "Create Contact - Invalid Input (Invalid Phone Number)",
  async ({ page }): Promise<void> => {
    // create an instance of the page object
    const createContactPage = new CreateContact(page);

    // check create button exists
    await createContactPage.checkElementExists("add-button");
    await createContactPage.clickAddContact();

    ["letters", "!!@#", "12345", "1234567890"].forEach(async (phone) => {
      // fill the form with invalid phone number
      await createContactPage.fillContactForm({
        name: "Shir Zohar",
        gender: "Female",
        phone: phone,
        street: "123 Main St",
        city: "New York",
      });

      await createContactPage.saveContact();

      // check error message is displayed
      await createContactPage.checkInvalidPhoneErrorMessage();
    });
  }
);
