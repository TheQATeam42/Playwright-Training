import { WebDriver} from 'selenium-webdriver'
import { By } from 'selenium-webdriver'


/**
 * Checks if a contact with the given name is displayed in the contacts list
 * @param driver - Selenium WebDriver instance
 * @param contactName - The contact name to check for visibility
 * @param contactSelector - A selector that matches contact name elements (usually a shared class)
 * @param expectedVisible - Whether the contact is expected to be visible
 */
export const isContactDisplayed = async (
    driver: WebDriver,
    contactName: string,
    contactSelector: string,
    expectedVisible: boolean = true
): Promise<void> => {
    const contacts = await driver.findElements(By.css(contactSelector))

    let matchCount = 0

    for (const contact of contacts) {
        try {
            const text = await contact.getText()
            if (text.trim() === contactName) {
                matchCount++
            }
        } catch (err) {
            console.log(`Found contact: "${err}"`)
        }
    }

    if (expectedVisible && matchCount === 0) {
        throw new Error(`Expected contact "${contactName}" to be visible, but it was not found.`)
    }

    if (!expectedVisible && matchCount > 0) {
        throw new Error(`Expected contact "${contactName}" to be deleted, but it is still visible.`)
    }
}
