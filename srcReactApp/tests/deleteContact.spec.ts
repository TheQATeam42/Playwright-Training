import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

const contactsListTest = reactAppTest.extend({});

// Delete Contact Scenario
contactsListTest("delete row", async ({ contacts }): Promise<void> => {
  const contactName = "Abraham Perry";
  const contactsPage = contacts();

  // checks for input existence
  const input = await contactsPage.getElementByDataId("search");
  expect(input).not.toBeNull();

  // search for contact name
  input?.fill(contactName);

  // checks for contact existence
  let contactExists = await contactsPage.getElementByDataId("contact", {
    hasText: contactName,
  });
  expect(contactExists).not.toBeNull();

  // checks if the contact is alone
  let contactList = await contactsPage.getElementByDataId("contact");
  expect(await contactList?.count()).toEqual(1);

  // delete the contact by the button
  await contactsPage.deleteContact(contactName);

  // checks if contact deleted and not exist any more
  contactList = await contactsPage.getElementByDataId("contact");
  expect(contactList).toBeNull();

  // reload the page
  await contactsPage.reload();

  // checks if contact return after the reload (as should)
  contactExists = await contactsPage.getElementByDataId("contact", {
    hasText: contactName,
  });
  expect(contactExists).not.toBeNull();
});
