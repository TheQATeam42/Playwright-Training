import { expect, Locator } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import { expectContactToBe } from "../utils/helpers/contactsHelpers.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import { testConfigs } from "../utils/parseJson.util";
import ContactsPage from "../POMs/ContactsPage";
import CreateContactPage from "../POMs/CreateContactPage";

const contactsListTest = reactAppTest.extend({});

contactsListTest("Contact Creation Test", async ({ page }): Promise<void> => {
  const contactsPage = new ContactsPage(page);

  // Step 1
  await expect(contactsPage.createButton).toBeVisible();

  // Step 2
  await contactsPage.createButton.click();

  // Step 3
  const createContactPage = new CreateContactPage(page);
  expect(
    UrlHelper.validateUrl(ReactAppEndpoints.CreateContactForm, page)
  ).toBeTruthy();
  await expect(page.getByRole("heading")).toHaveText(
    testConfigs.titles.CreateContact
  ); // In case "כותרת" refers to the Heading.
  await expect(page).toHaveTitle(testConfigs.titles.CreateContact);

  // Step 4
  const contactToCreate = testConfigs.contacts.ToCreate;
  await createContactPage.fillForm(contactToCreate);

  // Step 5
  await createContactPage.saveButton.click();

  // Step 6
  expect(page).toHaveURL(UrlHelper.baseUrl);
  await expect(page.getByRole("heading")).toHaveText(
    testConfigs.titles.Contacts
  ); // In case "כותרת" refers to the Heading.
  await expect(page).toHaveTitle(testConfigs.titles.Contacts);

  // Step 7
  await contactsPage.searchContact(contactToCreate.name);

  // Step 8
  const specificContactLocator: Locator = contactsPage.getSpecificContact(
    contactToCreate.name
  );
  await expect(contactsPage.allContactItems).toHaveCount(1); // check that there is only 1 in the list
  await expectContactToBe(specificContactLocator, contactToCreate);
  // Step 9
  await page.reload();

  // Step 10
  await expect(specificContactLocator).toHaveCount(0); // check that the contact does no longer exists
});
