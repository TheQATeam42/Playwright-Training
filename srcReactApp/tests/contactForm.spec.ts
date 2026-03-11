import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import { CreateContactDTO } from "../models/createContactDTO";
import ContactListPage from "../pages/contactList.page";
import ContactFormPage from "../pages/contactForm.page";
import ContactComponent from "../components/contact.component";
import { GenericInputTest, InputTest } from "../models/inputTest";

const contactsFormTest = reactAppTest.extend({});

contactsFormTest("CreateContact", async ({ page }): Promise<void> => {
  const createContact: CreateContactDTO = {
    name: "Liam Shvarts",
    gender: "Male",
    phone: "0542745678",
    street: "Liam's house",
    city: "Petah Tikva",
  };

  const contactListComponent: ContactListPage = new ContactListPage(page);
  const contactFormComponent: ContactFormPage = new ContactFormPage(page);

  // Find create button, verify and click it
  await expect(contactListComponent.CreateButton).toBeVisible();
  await contactListComponent.CreateButton.click();

  // Make sure we are on the create contact page
  const isOnContactList: boolean = await UrlHelper.validateUrl(
    ReactAppEndpoints.CREATE_CONTACT,
    page
  );
  await expect(isOnContactList).toBeTruthy();
  await expect(contactFormComponent.Title).toHaveText("Create Contact");

  // Fill the form and submit
  await contactFormComponent.FillForm(createContact);
  await contactFormComponent.SaveButton.click();

  // Make sure we are back on the contact list page
  const isOnHome: boolean = await UrlHelper.validateUrl(
    ReactAppEndpoints.HOME,
    page
  );
  await expect(isOnHome).toBeTruthy();
  await expect(contactListComponent.Title).toHaveText("Contacts");

  // Search for the created contact and verify it is in the list
  await contactListComponent.Search(createContact.name);
  await expect(contactListComponent.SearchedContacts).toHaveCount(1);

  const foundContact: ContactComponent = contactListComponent.GetFirstContact();
  await expect(foundContact.Name).toHaveText(createContact.name);
  await expect(foundContact.Gender).toHaveText(createContact.gender);
  await expect(foundContact.Address).toHaveText(
    createContact.street + ", " + createContact.city
  );

  // Reload to make sure the contact is gone
  await page.reload();
  await contactListComponent.Search(createContact.name);
  await expect(contactListComponent.SearchedContacts).toHaveCount(0);
});


contactsFormTest(
  "InvalidInputsCreateContact",
  async ({ page }): Promise<void> => {
    const contactListComponent: ContactListPage = new ContactListPage(page);
    const contactFormComponent: ContactFormPage = new ContactFormPage(page);

    // Find create button, verify and click it
    await expect(contactListComponent.CreateButton).toBeVisible();
    await contactListComponent.CreateButton.click();

    // Make sure we are on the create contact page
    const isOnContactList: boolean = await UrlHelper.validateUrl(
      ReactAppEndpoints.CREATE_CONTACT,
      page
    );
    await expect(isOnContactList).toBeTruthy();
    await expect(contactFormComponent.Title).toHaveText("Create Contact");

    // Define invalid inputs and expected error messages
    const emptyInputError = (inputName: string): string =>
      `Error: The "${inputName}" field can't be empty.`;
    const emptyInputTests: InputTest[] = [
      {
        formLocator: contactFormComponent.NameInput,
        inputName: "name",
      },
      {
        formLocator: contactFormComponent.PhoneInput,
        inputName: "phone",
      },
      {
        formLocator: contactFormComponent.StreetInput,
        inputName: "street",
      },
      {
        formLocator: contactFormComponent.CityInput,
        inputName: "city",
      },
    ];

    // Run tests for each invalid input
    for (const testEmptyInput of emptyInputTests) {
      for (const input of emptyInputTests) {
        await input.formLocator.fill("string");
      }

      await testEmptyInput.formLocator.fill("");
      await contactFormComponent.SaveButton.click();
      await expect(contactFormComponent.ErrorMessage).toHaveText(
        emptyInputError(testEmptyInput.inputName)
      );
    }
  }
);


contactsFormTest(
  "GenericInputsTest",
  async ({ page }): Promise<void> => {
    const contactListComponent: ContactListPage = new ContactListPage(page);
    const contactFormComponent: ContactFormPage = new ContactFormPage(page);

    // Find create button, verify and click it
    await expect(contactListComponent.CreateButton).toBeVisible();
    await contactListComponent.CreateButton.click();

    // Make sure we are on the create contact page
    const isOnContactList: boolean = await UrlHelper.validateUrl(
      ReactAppEndpoints.CREATE_CONTACT,
      page
    );
    await expect(isOnContactList).toBeTruthy();
    await expect(contactFormComponent.Title).toHaveText("Create Contact");

    // Define invalid inputs and expected error messages
    const genericInputTests: GenericInputTest[] = [
      {
        setup: [
          {
            formLocator: contactFormComponent.NameInput,
            inputName: "liam",
          },
          {
            formLocator: contactFormComponent.PhoneInput,
            inputName: "abc",
          },
        ],
        expectedError: 'Error: The "phone" field must only contain digits.',
      },
      {
        setup: [
          {
            formLocator: contactFormComponent.NameInput,
            inputName: "liam",
          },
          {
            formLocator: contactFormComponent.PhoneInput,
            inputName: "05499999999999",
          },
        ],
        expectedError:
          'Error: The "phone" field must have a maximum length of 9 digits.',
      },
    ];

    // Run tests for each invalid input
    for (const genericInputTest of genericInputTests) {
      for (const input of genericInputTest.setup) {
        await input.formLocator.fill(input.inputName);
      }

      await contactFormComponent.SaveButton.click();
      await expect(contactFormComponent.ErrorMessage).toHaveText(
        genericInputTest.expectedError
      );
    }
  }
);