import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

const contactsListTest = reactAppTest.extend({});

const contactCreateURL = "https://hub.testingtalks.com.au/tasks/create"
const contactsListURL = "https://hub.testingtalks.com.au"

// Create Valid Contact Scenario
contactsListTest("create valid contact", async ({ contacts }): Promise<void> => {
  const contactName = "Shir Zohar";
  const contactsPage = contacts();

  // checks for create button existence
  const createButton = await contactsPage.getElementByDataId("add-button");
  expect(createButton).toHaveCount(1)

  // clicks button to open contact form
  createButton?.click();

  // checks if the URL changed to contact form URL
  let isCorrectURL = await contactsPage.checkURL(contactCreateURL);
  expect(isCorrectURL).toBeTruthy;

  // checks page header exist and has the correct text
  let pageHeader = await contactsPage.getElementByDataId("create-contact-header");
  expect(pageHeader).toHaveCount(1)
  await expect(pageHeader!).toHaveText("Create Contact");

  // create contact by params
  await contactsPage.createContact(contactName, "Other", "0509161133", "QA", "PituahTochna");

  // checks if URL changed to contact list URL
  isCorrectURL = await contactsPage.checkURL(contactsListURL);
  expect(isCorrectURL).toBeTruthy;

  // checks page header exist and has the correct text
  pageHeader = await contactsPage.getElementByDataId("contacts");
  expect(pageHeader).toHaveCount(1)
  await expect(pageHeader!).toHaveText("Contacts");

  // search for the new contact
  const input = await contactsPage.getElementByDataId("search");
  input?.fill(contactName)
  
  // checks if the contact is there
  let newContact = await contactsPage.getElementByDataId("contact", { hasText: contactName });
  expect(newContact).toHaveCount(1)

  // checks if the contact is alone
  let contactList = await contactsPage.getElementByDataId("contact");
  expect(await contactList?.count()).toEqual(1);

  // reload the page
  await contactsPage.reload();

  // checks if the contact is not there any more
  newContact = await contactsPage.getElementByDataId("contact", { hasText: contactName });
  expect(newContact).toHaveCount(0)
});


// Create Invalid Contact Scenario
contactsListTest("create invalid contact", async ({ contacts }): Promise<void> => {
  const invalidInput = "00000000000000000000";
  const contactsPage = contacts();

  // checks for create button existence
  const createButton = await contactsPage.getElementByDataId("add-button");
  await expect(createButton).toHaveCount(1)

  // clicks button to open contact form
  createButton?.click();

  // checks if the URL changed to contact form URL
  let isCorrectURL = await contactsPage.checkURL(contactCreateURL);
  expect(isCorrectURL).toBeTruthy;

  // checks page header exist and has the correct text
  let pageHeader = await contactsPage.getElementByDataId("create-contact-header");
  await expect(pageHeader).toHaveCount(1)
  await expect(pageHeader!).toHaveText("Create Contact");

  // create contact by params
  await contactsPage.createContact(invalidInput, "Other", invalidInput, invalidInput, invalidInput);

  // checks if error appeared
  let errorMsg = await contactsPage.getElementByDataId("error-message");
  await expect(errorMsg).toHaveCount(1)

  // checks if the URL stayed as create form URL
  isCorrectURL = await contactsPage.checkURL(contactCreateURL);
  expect(isCorrectURL).toBeTruthy;
});
