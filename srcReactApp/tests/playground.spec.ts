import Contacts from "../pages/contacts.page";
import reactAppTest from "./setup/testLevelHooks.setup";
import { test, expect } from "@playwright/test";
import Contact from "../components/contact.component";
import PlaygroundPage from "../pages/playground.page";
import AddContactPage from "../pages/addContact.page";
import ContactsIFrame from "../pages/contactsIframe.page";

const comboBoxTest = reactAppTest.extend({});

comboBoxTest("Combo Box test", async ({ page }): Promise<void> => {
  const contacts = new Contacts(page);
  await contacts.openPlaygroundPage();

  const playgroundPage = new PlaygroundPage(page);
  await playgroundPage.autoCompleteComboBox.click();
  await playgroundPage.autoCompleteComboBox.pressSequentially(
    "Schindler's List"
  );
  const firstOption = page.getByRole("listitem").first();
  await page.waitForTimeout(500);
  await firstOption.click({ force: true });

  await expect(playgroundPage.autoCompleteComboBox).toHaveValue(
    "Schindler's List"
  );

  //   await playgroundPage.autoCompleteComboBox.pressSequentially("");
});

const switchTest = reactAppTest.extend({});

switchTest("Switch Test", async ({ page }): Promise<void> => {
  const contacts = new Contacts(page);
  await contacts.openPlaygroundPage();

  const playgroundPage = new PlaygroundPage(page);

  // Checking the active one is active.
  await playgroundPage.activeSwitch.click();
  await expect(playgroundPage.activeSwitch).not.toBeChecked();

  // Checking the inactive one is inactive and thus cannot be clicked
  try {
    await playgroundPage.inactiveSwitch.click({ timeout: 1000 });
  } catch (e) {}
  await expect(playgroundPage.inactiveSwitch).not.toBeChecked();
});

const openTabTest = reactAppTest.extend({});

openTabTest("Open Tab Test", async ({ page, context }): Promise<void> => {
  const contacts = new Contacts(page);
  await contacts.openPlaygroundPage();

  const playgroundPage = new PlaygroundPage(page);
  const pagePromise = context.waitForEvent("page");
  await playgroundPage.openTabLink.click();

  const newTab = await pagePromise;

  const newTabConacts = new Contacts(newTab);
  newTabConacts.verifyContactsPage();
  await newTabConacts.openAddContactPage();

  const newTabAddContacts = new AddContactPage(newTab);
  newTabAddContacts.verifyPageUri();
});

const openWindowTest = reactAppTest.extend({});
openWindowTest("Open Window Test", async ({ page, context }): Promise<void> => {
  const contacts = new Contacts(page);
  await contacts.openPlaygroundPage();

  const playgroundPage = new PlaygroundPage(page);
  const pagePromise = context.waitForEvent("page");
  await playgroundPage.openWindowLink.click();

  const newWindow = await pagePromise;

  const newWindowConacts = new Contacts(newWindow);
  newWindowConacts.verifyContactsPage();
  await newWindowConacts.openAddContactPage();

  const newWindowAddContacts = new AddContactPage(newWindow);
  newWindowAddContacts.verifyPageUri();
});

const IframeTest = reactAppTest.extend({});
IframeTest("IFrame Test", async ({ page, context }): Promise<void> => {
  const contacts = new Contacts(page);
  await contacts.openPlaygroundPage();

  const playgroundPage = new PlaygroundPage(page);
  const iframeContactsPage = new ContactsIFrame(playgroundPage.iframe);
  await iframeContactsPage.verifyContactsPage();
  await iframeContactsPage.openAddContactPage();
  await iframeContactsPage.verifyAddContactsPage();
});
