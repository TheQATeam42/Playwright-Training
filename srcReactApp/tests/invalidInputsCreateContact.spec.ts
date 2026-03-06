import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";

interface EmptyInputTest {
  formLocator: Locator;
  inputName: string;
}

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "InvalidInputsCreateContact",
  async ({ page }): Promise<void> => {
    // Find create button, verify and click it
    const createButton: Locator = page.locator('[data-id="add-button"]');
    await expect(createButton).toBeVisible();
    await createButton.click();

    // Make sure we are on the create contact page
    const isOnContactList: boolean = await UrlHelper.validateUrl(
      ReactAppEndpoints.CREATE_CONTACT,
      page
    );
    await expect(isOnContactList).toBeTruthy();

    const formTitle: Locator = page.locator(
      '[data-id="create-contact-header"]'
    );
    await expect(formTitle).toHaveText("Create Contact");

    // Define invalid inputs and expected error messages
    const errorMessage: Locator = page.locator('[data-id="error-message"]');

    const emptyInputError = (inputName: string) =>
      `Error: The "${inputName}" field can't be empty.`;
    const emptyInputTests: EmptyInputTest[] = [
      {
        formLocator: page.locator('[data-id="name"]'),
        inputName: "name",
      },
      {
        formLocator: page.locator('[data-id="phone"]'),
        inputName: "phone",
      },
      {
        formLocator: page.locator('[data-id="street"]'),
        inputName: "street",
      },
      {
        formLocator: page.locator('[data-id="city"]'),
        inputName: "city",
      },
    ];

    // Run tests for each invalid input
    for (const testEmptyInput of emptyInputTests) {
      for (const input of emptyInputTests) {
        await input.formLocator.fill("string");
      }

      await testEmptyInput.formLocator.fill("");
      await page.locator('[data-id="save-button"]').click();
      await expect(errorMessage).toHaveText(
        emptyInputError(testEmptyInput.inputName)
      );
    }
  }
);
