import { ContactModel } from "../models/contact.model";
import reactAppTest from "./setup/testLevelHooks.setup";

const contactsFormTest = reactAppTest.extend({});

contactsFormTest.beforeEach(async ({ contacts, createContactForm }) => {
  // Navigate to create contact form.
  await contacts().clickCreate();
  // Validate that it has been opened.s
  await createContactForm().validateFormOpen();
});

/**
 * Create a valid contact and check that it appears in search after saving.
 * After reload, any new contacts should not appear anymore.
 */
contactsFormTest(
  "Create a new contact",
  async ({ contacts, createContactForm, page }) => {
    const contact: ContactModel = {
      name: "Noa",
      phone: "1234567890",
      street: "Cool Street",
      city: "Super Cool City",
    };

    // Fill the form with valid values and submit.
    await createContactForm().fillFormAndSubmit(contact);

    // Validate that we have returned to the contacts page and that the new contact exists in the list.
    await contacts().validatePageOpen();

    await contacts().searchExists(contact.name);

    // Refresh and validate that the new contact no longer exists.
    await page.reload();

    await contacts().searchNotExists(contact.name);
  }
);

/**
 * Validate that each field in the new contacts form is required.
 * Try to fill all other fields except one and check that an appropriate error shows.
 */
(
  [
    {
      name: "",
      phone: "1",
      street: "B",
      city: "C",
    },
    {
      name: "A",
      phone: "",
      street: "B",
      city: "C",
    },
    {
      name: "A",
      phone: "1",
      street: "",
      city: "C",
    },
    {
      name: "A",
      phone: "1",
      street: "B",
      city: "",
    },
  ] as ContactModel[]
).forEach((contact: ContactModel) => {
  // Find the empty field.
  const emptyField = Object.entries(contact).find(
    ([_, value]) => value === ""
  )?.[0];

  if (emptyField) {
    contactsFormTest(
      `Validate form error when field ${emptyField} is empty`,
      async ({ createContactForm }) => {
        // Fill the form with one empty field each iteration.
        await createContactForm().fillFormAndSubmit(contact);

        // Make sure that the correct error message has appeared.
        await createContactForm().checkForErrorByField(emptyField);
      }
    );
  }
});

/**
 * Check phone number length and type constraints.
 */
["abc", "12345678910"].forEach((phone) =>
  contactsFormTest(
    `Check phone field validation using invalid value: ${phone}`,
    async ({ createContactForm }) => {
      // Fill the form with valid data, except for the phone field and submit.
      const contactData = {
        name: "a",
        phone,
        street: "b",
        city: "c",
      };

      createContactForm().fillFormAndSubmit(contactData);

      // Validate that there is a phone related error.
      createContactForm().checkForErrorByField("phone");
    }
  )
);
