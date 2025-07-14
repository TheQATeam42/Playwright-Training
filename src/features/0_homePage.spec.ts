import { Locator } from "@playwright/test"
import { expect } from "playwright/test"
import { globalConfig } from "../index"
import { test } from "../setup/hooks"
import { clearInput, clickButton, typeInput } from "../support/actionsHelpers"
import { contactsResultAmountOnSearch, contactTitleContains, elementsKeys, testedContactName, testedSearchbar } from "../support/Configurations/0_homePageConfig"
import { getElement } from "../support/elements-helper"

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

    await test.step("Test the home page title", async (): Promise<void> => {
        const contractsTitle: Locator = await getElement(page, elementsKeys.contactsTitle, globalConfig)
        await expect(contractsTitle).toHaveText(contactTitleContains);
    })

    let searchBar: Locator = await test.step("Search a name out of the contacts list", async (): Promise<Locator> => {
        let searchBar: Locator = await typeInput(page, testedContactName, testedSearchbar)
        await expect(searchBar).toHaveValue(testedContactName)

        return searchBar
    })

    let contactNameField: Locator = await test.step("Check tested name is found", async (): Promise<Locator> => {
        let contactNameField: Locator = await getElement(page, elementsKeys.contactName, globalConfig)
        await expect(contactNameField).toHaveText(testedContactName);

        return contactNameField
    })

    await test.step("Checks the there is an only result for the searched name", async (): Promise<void> => {
        const contacts: Locator = await getElement(page, elementsKeys.singleContact, globalConfig)
        await expect(contacts).toHaveCount(contactsResultAmountOnSearch)
    })

    await test.step("Deletes the searched contact", async (): Promise<void> => {
        await clickButton(page, elementsKeys.deleteContactButton)
    })

    await test.step("Clears the search bar", async (): Promise<void> => {
        searchBar = await clearInput(page, testedSearchbar)
        await expect(searchBar).toHaveValue("");
    })

    await test.step("Checks the name was deleted successfully", async (): Promise<void> => {
        contactNameField = await getElement(page, elementsKeys.contactName, globalConfig)
        expect(await contactNameField.allTextContents()).not.toContain(testedContactName);
    })
})
