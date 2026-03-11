import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ContactListPage from "../pages/contactList.page";
import ContactFormPage from "../pages/contactForm.page";
import { InputTest } from "../models/inputTest";

const contactsListTest = reactAppTest.extend({});

contactsListTest(
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
