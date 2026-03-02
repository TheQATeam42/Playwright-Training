import { Locator } from "playwright";
import reactAppTest from "./setup/testLevelHooks.setup";
import { expect } from "playwright/test";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";

/**
 * Contact List - Create Behavior
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "create contact, verify addition of it to the list, and addition restored after refresh",
  async ({ page }): Promise<void> => {
    const newContact = {
      name: "John-Doe1234",
      gender: "Male",
      phone: "123456789",
      street: "123 Main St",
      city: "Anytown",
    };
    const newContactFormTitle: string = "Create Contact";
    const contactsListTitle: string = "Contacts";

    // ---------------------------
    // 1️⃣ Make sure create button is visible and click it
    // ---------------------------
    const createButton: Locator = page.locator('[data-id="add-button"]');

    await expect(createButton).toBeVisible();

    // ---------------------------
    // 2️⃣ Click the create button to open the contact creation form
    // ---------------------------
    await createButton.click();

    //---------------------------
    // 3️⃣ Validate that the contact creation form is displayed
    //---------------------------
    await UrlHelper.validateUrl(ReactAppEndpoints.CREATE, page);

    //make sure form title is correct
    await expect(
      page.locator('[data-id="create-contact-header"]')
    ).toContainText(newContactFormTitle);

    //---------------------------
    // 4️⃣ Fill in the form fields with correct input
    //---------------------------
    await page.locator('[data-id="name"]').fill(newContact.name);
    await page.locator('[data-id="gender"]').selectOption(newContact.gender);
    await page.locator('[data-id="phone"]').fill(newContact.phone);
    await page.locator('[data-id="street"]').fill(newContact.street);
    await page.locator('[data-id="city"]').fill(newContact.city);

    //---------------------------
    // 5️⃣ Submit the form
    //---------------------------
    await page.locator('[data-id="save-button"]').click();

    //---------------------------
    // 6️⃣ Validate that the we are navigated back to the contacts list and the title is correct
    //---------------------------
    await UrlHelper.validateUrl(ReactAppEndpoints.NONE, page);
    await expect(page.locator('[data-id="contacts"]')).toContainText(
      contactsListTitle
    );

    // ---------------------------
    // 7️⃣ Search for the created contact
    // ---------------------------
    await page.locator('[data-id="search"]').fill(newContact.name);

    //---------------------------
    // 8️⃣ Validate that the created contact appears in the search results with correct details
    // ---------------------------
    await expect(page.locator('[data-id="contact"]')).toHaveCount(1);

    const createdContact: Locator = page.locator('[data-id="contact"]').first();

    await expect(createdContact.locator('[data-id="name"]')).toHaveText(
      newContact.name
    );
    await expect(createdContact.locator('[data-id="gender"]')).toHaveText(
      newContact.gender
    );
    await expect(createdContact.locator('[data-id="address"]')).toHaveText(
      `${newContact.street}, ${newContact.city}`
    );

    // ---------------------------
    // 9️⃣ reload the page
    // ---------------------------
    await page.reload();

    // ---------------------------
    // 1️⃣0️⃣ Validate that the created contact still appears after page reload
    // ---------------------------
    const restoredContact: Locator = page
      .locator('[data-id="contact"]')
      .filter({
        has: page.locator('[data-id="name"]', { hasText: newContact.name }),
      });

    await expect(restoredContact).toHaveCount(0);
  }
);
