import {ElementKey, ElementLocator, GlobalConfig} from "../env/global-types"
import {Page} from "playwright"
import {Locator} from "@playwright/test"
import {getCurrentPageId} from "./navigation-behavior"


/**
 * Getting the locator of an element from the json file it belongs to, by the pageId we are in
 * All the mappings are in the config/mappings dir, each locator has an element key
 * The element key is what the user writes in the feature file, It's much more clean to write a name than the actual locator
 * @param page
 * @param elementKey
 * @param globalConfig
 */
export const getElementIdentifier = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): ElementLocator => {
    const {pageElementMappings} = globalConfig
    const currentPage = getCurrentPageId(page, globalConfig)

    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]

    if (!elementIdentifier) {
        throw Error(`unable to find the '${elementKey}' mapping`)
    }

    return elementIdentifier
}

/**
 * Getting an element object by passing an element key
 * @param page
 * @param elementKey
 * @param globalConfig
 */
export const getElement = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): Locator => {
    return page.locator(getElementIdentifier(page, elementKey, globalConfig))
}
