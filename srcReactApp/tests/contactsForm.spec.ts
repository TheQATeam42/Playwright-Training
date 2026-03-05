import { expect } from "playwright/test";
import { ContactModel, ContactField } from "../models/contact.model";
import reactAppTest from "./setup/testLevelHooks.setup";

const contactsFormTest = reactAppTest.extend({});

contactsFormTest.describe.configure({ mode: "parallel" });

contactsFormTest.describe("Contacts Form Tests", { tag: "@form" }, () => {
  contactsFormTest.beforeEach(async ({ contacts, createContactForm }) => {
    // Navigate to create contact form.
    await expect(contacts().createButton).toHaveCount(1);
    await contacts().createButton.click();
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
        gender: "Female",
      };

      // Fill the form with valid values and submit.
      await createContactForm().fillFormAndSubmit(contact);

      // Validate that we have returned to the contacts page and that the new contact exists in the list.
      await contacts().validatePageOpen();

      await contacts().search(contact.name, 1);
      await contacts().validateContactDetails(contact);

      // Refresh and validate that the new contact no longer exists.
      await page.reload();

      await contacts().search(contact.name, 0);
    }
  );

  /**
   * Validate that each field in the new contacts form is required.
   * Try to fill all other fields except one and check that an appropriate error shows.
   */
  (["name", "phone", "street", "city"] as ContactField[]).forEach(
    (field: ContactField) => {
      // The contact to use.
      const contact: ContactModel = {
        name: "a",
        phone: "1",
        street: "b",
        city: "c",
        gender: "Male",
      };

      if (field != "gender") {
        contact[field] = "";
      }

      // Find the empty field.
      contactsFormTest(
        `Validate form error when field ${field} is empty`,
        async ({ createContactForm }) => {
          // Fill the form with one empty field each iteration.
          await createContactForm().fillFormAndSubmit(contact);

          // Make sure that the correct error message has appeared.
          await createContactForm().checkForErrorByField(field);
        }
      );
    }
  );

  /**
   * Check phone number length and type constraints.
   */
  ["abc", "12345678910"].forEach((phone) =>
    contactsFormTest(
      `Check phone field validation using invalid value: ${phone}`,
      async ({ createContactForm }) => {
        // Fill the form with valid data, except for the phone field and submit.
        const contactData: ContactModel = {
          name: "a",
          phone,
          street: "b",
          city: "c",
          gender: "Male",
        };

        createContactForm().fillFormAndSubmit(contactData);

        // Validate that there is a phone related error.
        createContactForm().checkForErrorByField("phone" as ContactField);
      }
    )
  );
});
