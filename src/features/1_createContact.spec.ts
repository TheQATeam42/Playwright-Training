import { expect, Locator } from "@playwright/test"
import { globalConfig } from ".."
import { PageId } from "../env/types"
import { test } from "../setup/hooks"
import { createPartialObjectVersions, formSubmission } from "../support/actionsHelpers"
import { createContactPageKey, elementsKeys, getExpectedError, newContact, pageName } from "../support/Configurations/1_createContactConfig"
import { getElement } from "../support/elements-helper"
import { Contact } from "../support/Interfaces/Contact"
import { getCurrentPageId, navigateToPage } from "../support/navigation-behavior"

let testCases: {
    missing: string,
    data: { [x: string]: Contact },
    isFullInfo: boolean
}[] = createPartialObjectVersions(newContact)

testCases.forEach(({ missing: testCase, data, isFullInfo }) => {
    test(`Create new contact (missing ${testCase}) and checks it was created successfully`, async ({ page }): Promise<void> => {
        await navigateToPage(page, pageName, globalConfig)

        // Fills and submits form with new contact's info
        await formSubmission(page, data, elementsKeys.saveButton)
        const currentPage: PageId = await getCurrentPageId(page, globalConfig);

        if (!isFullInfo && currentPage === createContactPageKey) {
            // Checks the expected error was occurred
            const error: Locator = await getElement(page, elementsKeys.error, globalConfig)
            await expect(error).toHaveText(getExpectedError(testCase))
        } else {
            // Checks the new contact was created successfully
            const contactNameField: Locator = await getElement(page, elementsKeys.contactName, globalConfig)
            expect(await contactNameField.allTextContents()).toContain(newContact.name);
        }
    })
});

test("Test clicking on 'cancel' instead of 'create' after filling a new contact info", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    // Fills and submits form with new contact's info
    await formSubmission(page, newContact, elementsKeys.cancelButton)

    // Checks the contact was not created
    const contactNameField = await getElement(page, elementsKeys.contactName, globalConfig)
    expect(await contactNameField.allTextContents()).not.toContain(newContact.name);
})