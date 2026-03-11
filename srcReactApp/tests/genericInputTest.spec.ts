import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ContactFormPage from "../pages/contactForm.page";
import ContactListPage from "../pages/contactList.page";
import { GenericInputTest } from "../models/inputTest";

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "GenericInputsTestCreateContact",
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
