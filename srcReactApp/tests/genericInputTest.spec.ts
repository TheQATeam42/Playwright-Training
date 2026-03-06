import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";

interface InputField {
  formLocator: Locator;
  input: string;
}

interface GenericInputTest {
  setup: InputField[];
  expectedError: string;
}

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "GenericInputsTestCreateContact",
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

    const genericInputTests: GenericInputTest[] = [
      {
        setup: [
          {
            formLocator: page.locator('[data-id="name"]'),
            input: "liam",
          },
          {
            formLocator: page.locator('[data-id="phone"]'),
            input: "abc",
          },
        ],
        expectedError: 'Error: The "phone" field must only contain digits.',
      },
      {
        setup: [
          {
            formLocator: page.locator('[data-id="name"]'),
            input: "liam",
          },
          {
            formLocator: page.locator('[data-id="phone"]'),
            input: "05499999999999",
          },
        ],
        expectedError:
          'Error: The "phone" field must have a maximum length of 9 digits.',
      },
    ];

    // Run tests for each invalid input
    for (const genericInputTest of genericInputTests) {
      for (const input of genericInputTest.setup) {
        await input.formLocator.fill(input.input);
      }

      await page.locator('[data-id="save-button"]').click();
      await expect(errorMessage).toHaveText(genericInputTest.expectedError);
    }
  }
);
