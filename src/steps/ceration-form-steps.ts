import {expect, Locator, Page} from "playwright/test"
import {getElement} from "../support/elements-helper"
import {globalConfig} from "../index"
import {Contact} from "../support/character-creation-contact"

/**
 * Fills contact information using the testContact, omitting a field and expects an error message.
 * @param page 
 * @param contact 
 * @param fieldToOmit 
 */
export const checkMissingField = async (page: Page, contact: Contact, fieldToOmit: keyof Contact): Promise<void> => {
    await fillContactInfo(page, omitFieldFromContact(contact, fieldToOmit))
    await page.getByRole("button", {name: "Save"}).click()
    await expectMissingFieldErrorMessage(page, fieldToOmit)
}

/**
 * Fills desired text as input to text field
 * @param page 
 * @param fieldName element key for field
 * @param text text to fill
 */
export const fillTextInput = async (page: Page, fieldName: string, text: string): Promise<void> => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.fill(text)
}

/**
 * Selects option as input to selection field
 * @param page 
 * @param fieldName element key for field
 * @param text Text value of option. Must exist!
 */
export const fillSelectInput = async (page: Page, fieldName: string, text: string): Promise<void> => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.selectOption(text)
}

/**
 * Fills contact infromation to contact creation form. Skips undefined fields.
 * @param page 
 * @param contact 
 */
export const fillContactInfo = async (page: Page, contact: Contact): Promise<void> => {
    if (contact.name) await fillTextInput(page, "contact name field", contact.name)
    if (contact.gender) await fillSelectInput(page, "contact gender field", contact.gender)
    if (contact.phone) await fillTextInput(page, "contact phone field", contact.phone)
    if (contact.street) await fillTextInput(page, "contact street field", contact.street)
    if (contact.city) await fillTextInput(page, "contact city field", contact.city)
}

/**
 * Expects the error message field of contact creation for to display 
 * an empty field error for a field name
 * @param page 
 * @param omittedField 
 */
export const expectMissingFieldErrorMessage = async (page: Page, omittedField: keyof Contact): Promise<void> => {
    const errorMessage: Locator = await getElement(page, "contact error message", globalConfig)
    await expect(errorMessage).toHaveText(`Error: The "${String(omittedField)}" field can't be empty.`)
}

/**
 * Returns a new contact with a field removed
 * @param contact 
 * @param keyToOmit Name of the field to omit
 * @returns 
 */
export const omitFieldFromContact = (contact: Partial<Contact>, keyToOmit: keyof Contact): Partial<Contact> => {
    const partial: Partial<Contact> = {}

    for (const key in contact) {
        if (key === keyToOmit) continue
        partial[key] = contact[key]
    }

    return partial
}
