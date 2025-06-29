import {ElementKey, GlobalConfig} from "../env/types"
import {getCurrentPageId} from "./navigation-behavior"
import {Locator, Page} from "@playwright/test"


/**
 * We go to the config/mappings folder, and from the elementKey we want
 * We take the element identifier - which is the element from the web
 * It does it by taking the URL we are in, converting it to the name of the json file
 * From the config/pages.json file
 * Searching for the elementKey we give in the function, and extracting the element identifier
 * We do this to make our code cleaner, elementKey is a way for writing cleaner names
 * @param page
 * @param elementKey
 * @param globalConfig
 * @returns elementIdentifier
 */
export const getElementIdentifier = async (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): Promise<string> => {
    const {pageElementMappings} = globalConfig
    const currentPage = await getCurrentPageId(page, globalConfig)
    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
    if (!elementIdentifier) {
        throw Error(`Error, unable to find the ${elementKey} mappings`)
    }

    return elementIdentifier
}

/**
 * Returning the element by its elementKey, as a Locator object
 * @param page
 * @param elementKey
 * @param globalConfig
 * @returns
 */
export const getElement = async (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): Promise<Locator> => {
    return page.locator(await getElementIdentifier(page, elementKey, globalConfig))
}
