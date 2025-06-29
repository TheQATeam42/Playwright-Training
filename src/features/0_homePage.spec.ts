import {expect, Locator} from "playwright/test"
import {test} from "../setup/hooks"
import {fillSearchBar} from "../steps/contact-steps"
import {getElement} from "../support/elements-helper"
import {globalConfig} from ".."
import {contactName} from "../support/home-page-helper"


test("Search and delete existing contact", async ({page}): Promise<void> => {
    await fillSearchBar(page, contactName)
    const contacts: Locator = await getElement(page, "contact item name", globalConfig)
    await expect(contacts).toHaveCount(1)
    expect(contacts).toContainText(contactName)
    
    // Confirm the delete confirmation dialog
    page.on("dialog", async (dialog) => {
        await dialog.accept()
    })

    await page.getByRole("button", {name: "Delete"}).click()
    await fillSearchBar(page, "")
    await expect(contacts.getByText(contactName)).toHaveCount(0)
})
