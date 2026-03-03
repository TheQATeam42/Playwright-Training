import reactAppTest from "./setup/testLevelHooks.setup";

const contactsFormTest = reactAppTest.extend({});

contactsFormTest(
  "Create a new contact",
  async ({ contacts, createContactForm, page }) => {
    const contact = {
      name: "Noa",
      phone: "1234567890",
      street: "Cool Street",
      city: "Super Cool City",
    };

    // Navigate to create contact form.
    await contacts().clickCreate();

    await createContactForm().validateFormOpen();

    // Fill the form with valid values and submit.
    await createContactForm().fillFormAndSubmit(
      contact.name,
      contact.phone,
      contact.street,
      contact.city
    );

    // Validate that we have returned to the contacts page and that the new contact exists in the list.
    await contacts().validatePageOpen();

    await contacts().searchExists(contact.name);

    // Refresh and validate that the new contact no longer exists.
    await page.reload();

    await contacts().searchNotExists(contact.name);
  }
);
