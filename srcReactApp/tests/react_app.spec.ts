import { expect } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * Here you write all the tests for the contactsList page.
 * Like Chappell Roan said: `Good luck babe!`
 *
 * Your checklist for this file:
 *
 * TODO: Change the file name
 * TODO: Expand the first test block
 * TODO: Delete this comment when done
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "add to contacts list, search for it, delete it and check if it is deleted",
  async ({
        contacts,page



  }): Promise<void> => {
    // Write here the test steps
      expect(await contacts().issherachbarVisible()).toBeTruthy();
      const randomName = await contacts().getRandomContactName();
      await contacts().searchContacts(randomName);
      expect(await contacts().issearchResultEmpty()).toBeFalsy();
      expect(await contacts().getContactNameByIndex(0)).toBe(randomName);
      const deleteButton = contacts().getContactComponentByIndex(0).deleteButton;
      page.once("dialog", async (dialog) => await dialog.accept());
      await deleteButton.click();
      expect(await contacts().issearchResultEmpty()).toBeFalsy();
      expect(await contacts().isContactInList(randomName)).toBeFalsy();
      await page.reload();
      expect(await contacts().isContactInList(randomName)).toBeTruthy();
  }
);

    