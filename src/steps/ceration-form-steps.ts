import { Locator, Page } from "playwright/test"
import { getElement } from "../support/elements-helper"
import { globalConfig } from "../index"


export const fillTextInput = async (page: Page, fieldName: string, text: string) => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.fill(text)
}

export const fillSelectInput = async (page: Page, fieldName: string, text: string) => {
    const nameField: Locator = await getElement(page, fieldName, globalConfig)
    await nameField.selectOption(text)
}

export const fillContactInfo = async (page: Page, name: string, gender: string,
    phone: string, street: string, city: string) => {
    await fillTextInput(page, "name field", name)
    await fillSelectInput(page, 'gender field', gender)
    await fillTextInput(page, 'phone field', phone)
    await fillTextInput(page, 'street field', street)
    await fillTextInput(page, 'city field', city)
}