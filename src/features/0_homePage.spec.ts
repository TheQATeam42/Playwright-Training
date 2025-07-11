import { expect } from "playwright/test"
import { globalConfig } from "../index"
import { getElement } from "../support/elements-helper"
import { Locator } from "@playwright/test"
import { test } from "../setup/hooks"
import { clearInput, clickButton, typeInput } from "../support/helpers"


const testedContactName: string = "Alea Nieves"
const testedSearchbar: string = "searchBarSelector"
/*
    Here you write all the scenarios of the homePage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/

test("Full home page test", async ({ page }): Promise<void> => {
    // Listener for dialogs, will pop up on delete
    page.once('dialog', async dialog => {
        await dialog.accept(); // Accepts the alert
    })

    // Checks the home page title
    const contractsTitle: Locator = await getElement(page, "contacts title", globalConfig)
    await expect(contractsTitle).toHaveText("Contacts");

    // Searches a name out of the contacts list
    let searchBar: Locator = await typeInput(page, testedContactName, testedSearchbar)
    await expect(searchBar).toHaveValue(testedContactName)

    // Checks tested name is found
    let contactNameField: Locator = await getElement(page, "contactName", globalConfig)
    await expect(contactNameField).toHaveText(testedContactName);

    // Checks the there is an only result for the searched name
    const contacts: Locator = await getElement(page, "singleContact", globalConfig)
    await expect(contacts).toHaveCount(1)

    // Deletes the searched contact
    await clickButton(page, "deleteContactButton")

    // Clears the search bar
    searchBar = await clearInput(page, testedSearchbar)
    await expect(searchBar).toHaveValue("");

    // Checks the name was deleted successfully
    contactNameField = await getElement(page, "contactName", globalConfig)
    await expect(await contactNameField.allTextContents()).not.toContain(testedContactName);

})
