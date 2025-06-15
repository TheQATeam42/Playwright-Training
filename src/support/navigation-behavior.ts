import {GlobalConfig, PageId} from "../env/types"
import {Page} from "@playwright/test"


/**
 * This function gets the driver and the wanted page id
 * it sends the url to the given chrome driver, so that it loads the wanted page
 * @param page
 * @param pageId
 * @param globalConfig
 */
export const navigateToPage = async (page: Page, pageId: string, globalConfig: GlobalConfig): Promise<void> => {
    const url = new URL("http://localhost:3000")
    url.pathname = globalConfig.pagesConfig[pageId]
    await page.goto(url.href)
}

/**
 * This function returns the current pageId from the pages json file
 * @param page
 * @param globalConfig
 */
export const getCurrentPageId = async (page: Page, globalConfig: GlobalConfig): Promise<PageId> => {
    const {pagesConfig} = globalConfig
    const currentURL: string = page.url()
    // returns the keys from the pages.json file, which are the pageId's
    const pageConfigPageId = Object.keys(pagesConfig)
    // get the current page URL route
    const {pathname: currentPath} = new URL(currentURL)
    // searches for the pageId based on the regex of the url
    let currentPageId = ""
    for (const pageId of pageConfigPageId) {
        if (currentPath === pagesConfig[pageId]) {
            currentPageId = pageId
            break
        }
    }
    if (!currentPageId) {
        throw Error(`Failed to get page name from current route ${currentPath} \
        possible pages: ${JSON.stringify(pagesConfig)}`)
    }
    return currentPageId
}
