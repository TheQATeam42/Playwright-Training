import type { WebDriver } from 'selenium-webdriver'
import type { GlobalConfig } from '../../env/types'
import {
  enterSearchText,
  isContactDisplayed,
  isOnlyOneContactDisplayed,
  deleteContact,
  clearSearchInput,
} from '../steps'

/**
 * Executes the full contact deletion flow by orchestrating individual steps:
 * 1. Enter search text
 * 2. Verify the contact appears
 * 3. Verify only one contact appears
 * 4. Delete the contact
 * 5. Clear the search input
 * 6. Verify the contact is no longer present
 * @param driver - Selenium WebDriver instance
 * @param config - Global configuration including page URLs and element mappings
 */
export const performContactDeletionFlow = async (
    driver: WebDriver,
    config: GlobalConfig
): Promise<void> => {
    const pageId: string = 'homePage'
    const mappings = config.pageElementMappings[pageId]
    const contactName: string = 'Alea Nieves'

    await driver.get(config.pagesConfig[pageId])

    await enterSearchText(
        driver,
        mappings.searchInput,
        contactName
    )

    await isContactDisplayed(
        driver,
        contactName,
        mappings.contactNameDisplayId,
        true
    )

    await isOnlyOneContactDisplayed(
        driver,
        mappings.contactListItem
    )

    await deleteContact(
        driver,
        mappings.contactListItem,
        mappings.deleteButton,
        contactName,
    )
    
    await clearSearchInput(
        driver,
        mappings.searchInput
    )

    await isContactDisplayed(
        driver,
        contactName,
        mappings.contactNameDisplayId,
        false
    )
}