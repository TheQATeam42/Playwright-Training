import {Locator, Page} from "playwright/test"
import {getElement} from "../support/elements-helper"
import {globalConfig} from "../index"

/**
 * Fills the search bar with text
 * @param page 
 * @param data 
 */
export const fillSearchBar = async (page: Page, data: string): Promise<void> => {
    const searchBar: Locator = await getElement(page, "search bar", globalConfig)
    await searchBar.fill(data)
}
