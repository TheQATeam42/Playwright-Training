import { Locator } from "playwright";
import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "playwright/test";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
/**
 * Add Contact Form - Add invalid phone input Behavior
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "Try to create contact with invalid phone input and validate error handling",
  async ({ page }): Promise<void> => {
    const invalidPhoneContact = [
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "invalidPhone", // Invalid phone number (non-numeric)
        street: "123 Main St",
        city: "New York",
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "1234567890", // Invalid phone number (too long)
        street: "123 Main St",
        city: "New York",
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "123aa", // Invalid phone number (contains letters)
        street: "123 Main St",
        city: "New York",
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "@#$%", // Invalid phone number (special characters)
        street: "123 Main St",
        city: "New York",
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "123 456", // Invalid phone number (contains space)
        street: "123 Main St",
        city: "New York",
      },
      {
        name: "John-Doe1234",
        gender: "Male",
        phone: "123-456", // Invalid phone number (contains dash)
        street: "123 Main St",
        city: "New York",
      },
    ];

    // ---------------------------
    // 1️⃣ Click the create button to open the contact creation form
    // ---------------------------
    const createButton: Locator = page.locator('[data-id="add-button"]');
    await createButton.click();

    for (const contact of invalidPhoneContact) {
      // ---------------------------
      // 2️⃣ Fill in the form fields with invalid phone input
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
      // 4️⃣ Validate that the appropriate error message is displayed for invalid phone input
      // ---------------------------
      const errorMessageLocator: Locator = page.locator(
        '[data-id="error-message"]'
      );
      await expect(errorMessageLocator).toBeVisible();
      await expect(errorMessageLocator).toHaveText(
        `Error: The "phone" field must be a valid phone number.`
      );

      //---------------------------
      // 5️⃣ make sure we are still on the create page
      //---------------------------
      await expect(
        await UrlHelper.validateUrl(ReactAppEndpoints.CREATE, page)
      ).toBeTruthy();
    }
  }
);
