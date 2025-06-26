import { Page, Locator } from "playwright";
import { globalConfig } from "..";
import { getElement } from "../support/elements-helper";
import { fillField, acceptDialog } from "../common/helpers/elements-helper";

/**
 * Searches for a contact by entering the contact name in the search input field.
 * @param page The Playwright page object
 * @param contactName The name of the contact to search for (optional)
 */
export const searchContact = async (page: Page, contactName?: string) => {
    if (contactName != undefined) await fillField(page, "search input", contactName, globalConfig)
}

/**
 * Deletes a contact by verifying the displayed name and clicking the delete button.
 * Throws an error if the displayed name does not match the expected name.
 * @param page The Playwright page object
 * @param expectedUserName The expected name of the contact to delete
 */
export const deleteContact = async (page: Page, expectedUserName: string) => {
    const fullNameElement: Locator = await getElement(page, "full name", globalConfig);
    const displayedName = await fullNameElement.textContent();
    if (!displayedName || displayedName.trim() !== expectedUserName) {
        throw new Error(`Displayed contact name ('${displayedName?.trim()}') does not match expected ('${expectedUserName}')`);
    }
    await acceptDialog(page);
    const deleteButton: Locator = await getElement(page, "delete button", globalConfig);
    await deleteButton.click();
}

export const clearSearch = async (page: Page) => {
    await searchContact(page, "")
}

export const getContactList = async (page: Page) => {
    return await (await getElement(page, "contact info", globalConfig)).all();
}