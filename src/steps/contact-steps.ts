import { Locator, Page } from "playwright/test"
import { getElement } from "../support/elements-helper"
import { globalConfig } from "../index"


export const fillSearchBar = async (page: Page, data: string): Promise<void> => {
    const searchBar: Locator = await getElement(page, "search bar", globalConfig)
    await searchBar.fill(data)
}

export const countContacts = async (page: Page): Promise<number> => {
    const matchingContracts: Locator = await getElement(page, "contact item", globalConfig)
    return (await matchingContracts.all()).length
}

export const getContactNames = async (page: Page): Promise<string[]> => {
    const contactCards: Locator = await getElement(page, "contact item name", globalConfig)
    return await contactCards.allInnerTexts()
}