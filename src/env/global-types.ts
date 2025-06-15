// Carries the name of the page, from the url json file
export type PageId = string
// Types for element use
export type ElementKey = string
export type ElementLocator = string
// Useful for assertion steps - validate if something should/should not be
export type Negate = boolean
// Contains the names of the page, with the route and the regex of the page
export type PagesConfig = Record<PageId, Record<string, string>>
// Contains all the pages names, and the mappings of each page, by ElementKey - ElementLocator
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type ConstParametersConfig = Record<string, string>
export type GlobalVariables = {[key: string]: string | number | string[] | number[]}

export type GlobalConfig = {
    pagesConfig: PagesConfig
    pageElementMappings: PageElementMappings
    constParametersConfig: ConstParametersConfig
}
