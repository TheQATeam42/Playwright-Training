import { Dialog, expect, Locator } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";

/**
 * Add Contact Form - Add invalid input Behavior
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "Try to create contact with invalid input and validate error handling",
  async ({ page }): Promise<void> => {
    const invalidContactDetails = [
      {
        name: "", // Invalid name (empty)
        gender: "Male",
        phone: "1234567890",
        street: "123 Main St",
        city: "Anytown",
        expectedError: `Error: The "name" field can't be empty.`,
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "", // Invalid phone number (empty)
        street: "123 Main St",
        city: "Anytown",
        expectedError: `Error: The "phone" field can't be empty.`,
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "12345abc",
        street: "", // Invalid street (empty)
        city: "Anytown",
        expectedError: `Error: The "street" field can't be empty.`,
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "12345abc",
        street: "123 Main St",
        city: "", // Invalid city (empty)
        expectedError: `Error: The "city" field can't be empty.`,
      },
    ];

    // ---------------------------
    // 1️⃣ Click the create button to open the contact creation form
    // ---------------------------
    const createButton: Locator = page.locator('[data-id="add-button"]');
    await createButton.click();

    // iterate through the invalid contact details sequentially and validate error handling
    for (const contact of invalidContactDetails) {
      // ---------------------------
      // 2️⃣ Fill in the form fields with invalid data
      // ---------------------------
      await page.locator('[data-id="name"]').fill(contact.name);
      await page.locator('[data-id="gender"]').selectOption(contact.gender);
      await page.locator('[data-id="phone"]').fill(contact.phone);
      await page.locator('[data-id="street"]').fill(contact.street);
      await page.locator('[data-id="city"]').fill(contact.city);

      // ---------------------------
      // 3️⃣ Submit the form
      // ---------------------------
      await page.locator('[data-id="save-button"]').click();

      // ---------------------------
      // 4️⃣ Validate that we did not navigate away
      // ---------------------------
      await expect(
        await UrlHelper.validateUrl(ReactAppEndpoints.CREATE, page)
      ).toBeTruthy();

      // ---------------------------
      // 5️⃣ Validate that the error message is displayed
      // ---------------------------
      const errorMessage: Locator = page.locator('[data-id="error-message"]');

      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(contact.expectedError);

      // reset the page so the next iteration starts with a blank state
      await page.reload();
    }
  }
);
