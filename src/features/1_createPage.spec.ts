import {expect, Page} from "playwright/test"
import {test} from "../setup/hooks"
import {Contact, fillContactInfo, getErrorMessage, omitFieldFromContact} from "../steps/ceration-form-steps"
import {getContactNames} from "../steps/contact-steps"

const contact: Contact = {
    name: "Genghis Khan",
    gender: "Male",
    phone: "(577) 385-0576",
    street: "Ap #826-8849 Vulputate Street",
    city: "Temüjin"
}

const checkMissingField = async (page: Page, fieldToOmit: keyof Contact): Promise<void> => {
    await fillContactInfo(page, omitFieldFromContact(contact, fieldToOmit))

    await page.getByRole("button", {name: "Save"}).click()

    const errorMessage: string = await getErrorMessage(page)
    expect(errorMessage).toBe(`Error: The "${fieldToOmit}" field can't be empty.`)
}

/*
    Here you write all the scenarios of the createPage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/
test("Create new contact", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()

    await fillContactInfo(page, contact)
    await page.getByRole("button", {name: "Save"}).click()
    expect(await getContactNames(page)).toContain("Genghis Khan")
})

test("Create new contact, missing name", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()
    await checkMissingField(page, "name")
})

test("Create new contact, missing phone", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()
    await checkMissingField(page, "phone")
})

test("Create new contact, missing street", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()
    await checkMissingField(page, "street")
})

test("Create new contact, missing city", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()
    await checkMissingField(page, "city")
})

test("Fill new contact, but cancel", async ({page}): Promise<void> => {
    await page.getByRole("button", {name: "Create"}).click()

    await fillContactInfo(page, contact)
    await page.getByRole("button", {name: "Cancel"}).click()
    expect(await getContactNames(page)).not.toContain("Genghis Khan")
})
