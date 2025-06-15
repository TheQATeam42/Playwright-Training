import {Page} from "playwright"
import {GlobalConfig, PageId} from "../env/global-types"


/**
 * Navigating to the given page name
 * By extracting the page URL route from the url-pages json file
 * @param page
 * @param pageId
 * @param pagesConfig
 */
export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    {pagesConfig}: GlobalConfig
): Promise<void> => {
    const UI_AUTOMATION_HOST = "https://hub.testingtalks.com.au/"
    const url = new URL(UI_AUTOMATION_HOST)
    url.pathname = pagesConfig[pageId].route

    await page.goto(url.href)
}

/**
 * Validating that the pageId that the user expects to be matches the URL of the current page we are in
 * @param page
 * @param pageId
 * @param globalConfig
 */
export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    // Getting the current path name of the URL based on the current page
    const {pathname: currentPath} = new URL(page.url())

    return pathMatchesPageId(currentPath, pageId, globalConfig)
}

/**
 * Validating through the magic of regex that the regex of the desired pageId matches the regex of the actual URL path
 * @param path
 * @param pageId
 * @param pagesConfig
 */
const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    {pagesConfig}: GlobalConfig
): boolean => {
    const pagePathName = pagesConfig[pageId].regex
    const pageRegex = new RegExp(pagePathName)

    return pageRegex.test(path)
}

/**
 * Extracting the URL of the current page we are in, and getting the name of the page from the json file
 * Useful for getting the mapping of the current page we are in - every json file is a different page
 * @param page
 * @param globalConfig
 */
export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig
): PageId => {
    const {pagesConfig} = globalConfig
    // Getting all the pages names
    const pageConfigPageIds = Object.keys(pagesConfig)
    // Getting the URL of the page the test is in
    const {pathname: currentPath} = new URL(page.url())
    // Getting the pageId by the URL - by the regex of the pageId
    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    )
    // Validating if something went wrong with retrieving the pageId - can be that we didn't write it
    if (!currentPageId) {
        throw new Error(`Failed to get page name from current route ${currentPath} \
        possible pages: ${pageConfigPageIds}`)
    }

    return currentPageId
}
