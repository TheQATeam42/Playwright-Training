import { expect } from "playwright/test"
import { test } from "../setup/hooks"
import { countContacts, fillSearchBar, getContactNames } from "../steps/contact-steps"


/*
    Here you write all the scenarios of the homePage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/
test("Check and delete existing contact", async ({ page }): Promise<void> => {
    const contactName: string = "Alea Nieves"
    await fillSearchBar(page, contactName)
    expect(await countContacts(page)).toEqual(1)
    expect(await getContactNames(page)).toContain(contactName)

    // Confirm the delete confirmation dialog
    page.on("dialog", async (page) => {
        await page.accept()
    })

    await page.getByRole("button", { name: "Delete" }).click()
    await fillSearchBar(page, "")
    expect(await getContactNames(page)).not.toContain(contactName)
})