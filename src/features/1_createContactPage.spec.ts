import {expect, Locator} from "playwright/test"
import {test} from "../setup/hooks"
import {checkMissingField, fillContactInfo} from "../steps/ceration-form-steps"
import {getElement} from "../support/elements-helper"
import {globalConfig} from ".."
import {fieldsToOmit as missingFieldsToTest, testContact} from "../support/character-creation-helper"
import {Contact} from "../support/character-creation-contact"


test("Create new contact", async ({page}): Promise<void> => {
    const contacts: Locator = await getElement(page, "contact item name", globalConfig)
    await page.getByRole("button", {name: "Create"}).click()

    await fillContactInfo(page, testContact)
    await page.getByRole("button", {name: "Save"}).click()
    await expect(contacts.getByText("Genghis Khan")).toHaveCount(1)
})

missingFieldsToTest.forEach((field: keyof Contact) => {
    test(`Negative tests - Create new contact, missing ${field}`, async ({page}): Promise<void> => {
        await page.getByRole("button", {name: "Create"}).click()
        await checkMissingField(page, testContact, field)
    })
})

test("Cancel creation of a new contact", async ({page}): Promise<void> => {
    const contacts: Locator = await getElement(page, "contact item name", globalConfig)
    await page.getByRole("button", {name: "Create"}).click()
    await fillContactInfo(page, testContact)
    await page.getByRole("button", {name: "Cancel"}).click()
    await expect(contacts.getByText("Genghis Khan")).toHaveCount(0)
}) 
