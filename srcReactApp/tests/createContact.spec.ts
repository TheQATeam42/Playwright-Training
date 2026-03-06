import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";

interface CreateContactDTO {
  name: string;
  gender: "Male" | "Female";
  phone: string;
  street: string;
  city: string;
}

const contactsListTest = reactAppTest.extend({});

contactsListTest("CreateContact", async ({ page }): Promise<void> => {
  const createContact: CreateContactDTO = {
    name: "Liam Shvarts",
    gender: "Male",
    phone: "0542745678",
    street: "Liam's house",
    city: "Petah Tikva",
  };

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

  const formTitle: Locator = page.locator('[data-id="create-contact-header"]');
  await expect(formTitle).toHaveText("Create Contact");

  // Fill the form and submit
  await page.locator('[data-id="name"]').fill(createContact.name);
  await page.locator('[data-id="gender"]').selectOption(createContact.gender);
  await page.locator('[data-id="phone"]').fill(createContact.phone);
  await page.locator('[data-id="street"]').fill(createContact.street);
  await page.locator('[data-id="city"]').fill(createContact.city);

  await page.locator('[data-id="save-button"]').click();

  // Make sure we are back on the contact list page
  const isOnHome: boolean = await UrlHelper.validateUrl(
    ReactAppEndpoints.HOME,
    page
  );
  await expect(isOnHome).toBeTruthy();

  const listTitle: Locator = page.locator('[data-id="contacts"]');
  await expect(listTitle).toHaveText("Contacts");

  // Search for the created contact and verify it is in the list
  const searchInput: Locator = page.locator('[data-id="search"]');
  await searchInput.fill(createContact.name);

  const contact: Locator = page.locator(
    '.ContactListItems > div[data-id="contact"]'
  );
  await expect(contact).toHaveCount(1);
  await expect(contact.locator('[data-id="name"]')).toHaveText(
    createContact.name
  );
  await expect(contact.locator('[data-id="gender"]')).toHaveText(
    createContact.gender
  );
  await expect(contact.locator('[data-id="address"]')).toHaveText(
    createContact.street + ", " + createContact.city
  );

  // Reload to make sure the contact is gone
  await page.reload({ waitUntil: "load" });
  await searchInput.fill(createContact.name);
  await expect(contact).toHaveCount(0);
});
