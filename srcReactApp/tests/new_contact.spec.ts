import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";


/** 
 * crate a new contact, search for it, edit it, search for the edited name, delete it and check if it is deleted
**/
const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({
        contacts,page
  }): Promise<void> => {
    // Write here the test steps
    await contacts().createContactButtonClick();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await contacts().createContactTitle.textContent()).toBe("Create Contact");
    const randomName = 'TestName' + Math.floor(Math.random() * 1000);
    await contacts().fillContactForm(randomName,"Male","123456789","test street","test city");
    await contacts().saveContact();
    expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
    await contacts().searchContacts(randomName);   
    expect(await contacts().issearchResultEmpty()).toBeFalsy();
    expect(await contacts().getContactNameByIndex(0)).toBe(randomName);
    await page.reload();
    await contacts().searchContacts(randomName);
    expect(await contacts().isContactInList(randomName)).toBeFalsy();
  });

  contactsListTest(
  "brake the app",
  async ({contacts,page }): Promise<void> => {
    // Write here the test steps

     expect(await contacts().issherachbarVisible()).toBeTruthy();
     await contacts().createContactButtonClick();
     expect(page.url()).toContain(ReactAppEndpoints.createContact);
     expect(await contacts().createContactTitle.textContent()).toBe("Create Contact");
     const brakingchars = "r a".repeat(5666666) + "ra";   
     await contacts().fillContactForm(brakingchars, "Male", "123456789", "test street", "test city");
     await contacts().saveContact();
     expect(page.url()).not.toContain(ReactAppEndpoints.createContact);
     await contacts().searchContacts("TestName");
     expect(await contacts().issearchResultEmpty()).toBeFalsy();
  });
   contactsListTest(
  "brake the string empty",
  async ({contacts,page }): Promise<void> => {
    // Write here the test steps

     expect(await contacts().issherachbarVisible()).toBeTruthy();
     await contacts().createContactButtonClick();
     expect(page.url()).toContain(ReactAppEndpoints.createContact);
     expect(await contacts().createContactTitle.textContent()).toBe("Create Contact")
     await contacts().fillContactForm("", "Male", "123456789", "test street", "test city");
     await contacts().saveContact();
     expect(page.url()).toContain(ReactAppEndpoints.createContact);
     expect(await contacts().getErrorMessageText()).toBe("Error: The \"name\" field can't be empty.");






  });
 contactsListTest(
 "brake the phone field",
 async ({contacts,page }): Promise<void> => {
   // Write here the test steps
    expect(await contacts().issherachbarVisible()).toBeTruthy();
    await contacts().createContactButtonClick();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await contacts().createContactTitle.textContent()).toBe("Create Contact")
    await contacts().fillContactForm("TestName", "Male", "wer", "test street", "test city");
    await contacts().saveContact();
    expect(page.url()).toContain(ReactAppEndpoints.createContact);
    expect(await contacts().getErrorMessageText()).toBe("Error: The \"phone\" field should be a valid phone number.");


 } );
