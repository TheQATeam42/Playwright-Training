/**
 * In this file, we will be using type aliases, which means that we can name an existing type
 * it makes the code much cleaner when we have complicated type
 * such as the pagesConfig type, which is a Record of a string and a Record
 */
// This type refers to the objects in pages.json
export type PageId = string
export type ElementKey = string
export type ElementLocator = string
// Object for the element, it has the pageId, its name and its locator
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type PagesConfig = Record<PageId, string>

export type GlobalConfig = {
    pagesConfig: PagesConfig
    pageElementMappings: PageElementMappings
}
