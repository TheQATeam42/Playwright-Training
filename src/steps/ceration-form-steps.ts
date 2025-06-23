import { Locator, Page } from "playwright/test"
import { getElement } from "../support/elements-helper"
import { globalConfig } from "../index"

export type Contact = {
    name?: string,
    gender?: string,
    phone?: string,
    street?: string,
    city?: string
}

export const fillTextInput = async (page: Page, fieldName: string, text: string): Promise<void> => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.fill(text)
}

export const fillSelectInput = async (page: Page, fieldName: string, text: string): Promise<void> => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.selectOption(text)
}

export const fillContactInfo = async (page: Page, contact: Contact): Promise<void> => {
    if (contact.name) await fillTextInput(page, "name field", contact.name)
    if (contact.gender) await fillSelectInput(page, 'gender field', contact.gender)
    if (contact.phone) await fillTextInput(page, 'phone field', contact.phone)
    if (contact.street) await fillTextInput(page, 'street field', contact.street)
    if (contact.city) await fillTextInput(page, 'city field', contact.city)
}

export const getErrorMessage = async (page: Page): Promise<string> => {
    const errorMessage: Locator = await getElement(page, "error message", globalConfig)
    return await errorMessage.innerText()
}

export const omitFieldFromContact = (contact: Partial<Contact>, keyToOmit: keyof Contact): Partial<Contact> => {
    let partial: Partial<Contact> = {}

    for (const key in contact) {
        if (key === keyToOmit) continue;
        partial[key] = contact[key]
    }

    return partial;
}