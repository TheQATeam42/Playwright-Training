import { expect, Locator } from "@playwright/test"
import { globalConfig } from ".."
import { test } from "../setup/hooks"
import { getElement } from "../support/elements-helper"
import { createPartialObjectVersions, formSubmission } from "../support/helpers"
import { getCurrentPageId, navigateToPage } from "../support/navigation-behavior"
import { env, getJsonFromFile } from "../env/parseEnv"
import pages from '../../config/pages.json';
import { PageId } from "../env/types"


// const pagesConfig: Record<string, string> = getJsonFromFile(env('PAGES_URLS_PATH'))

enum Gender {
    male = "Male",
    female = "Female",
    other = "Other"
}

export interface Contact {
    name: string,
    gender: Gender,
    phone: number,
    street: string,
    city: string,
}

const newContact: Contact = {
    name: "nameTest",
    gender: Gender.male,
    phone: 972512345678,
    street: "streetTest",
    city: "cityTest"
}

let testCases: {
    missing: string,
    data: { [x: string]: Contact },
    isFullInfo: boolean
}[] = createPartialObjectVersions(newContact)

const createContactPageKey: string = "createContact"

testCases.forEach(({ missing: testCase, data, isFullInfo }) => {
    test(`Create new contact (missing ${testCase}) and checks it was created successfully`, async ({ page }): Promise<void> => {
        await navigateToPage(page, "createContact", globalConfig)

        // Fills and submits form with new contact's info
        await formSubmission(page, data, "saveButton")
        const currentPage: PageId = await getCurrentPageId(page, globalConfig);

        if (!isFullInfo && currentPage === createContactPageKey) {
            // Checks the expected error was occurred
            const error: Locator = await getElement(page, "error", globalConfig)
            await expect(error).toHaveText(`Error: The "${testCase}" field can't be empty.`)
        } else {
            // Checks the new contact was created successfully
            const contactNameField: Locator = await getElement(page, "contactName", globalConfig)
            expect(await contactNameField.allTextContents()).toContain(newContact.name);
        }
    })
});

test("Test clicking on 'cancel' instead of 'create' after filling a new contact info", async ({ page }): Promise<void> => {
    await navigateToPage(page, "createContact", globalConfig)

    // Fills and submits form with new contact's info
    await formSubmission(page, newContact, "cancelButton")

    // Checks the contact was not created
    const contactNameField = await getElement(page, "contactName", globalConfig)
    expect(await contactNameField.allTextContents()).not.toContain(newContact.name);
})