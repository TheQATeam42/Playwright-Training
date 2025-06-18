import type { WebDriver } from 'selenium-webdriver'
import { By } from 'selenium-webdriver'

/**
 * Verifies that exactly one contact item is displayed
 * @param driver - Selenium WebDriver instance
 * @param contactListSelector - CSS selector for all contact items
 */
export const isOnlyOneContactDisplayed = async (
    driver: WebDriver,
    contactListSelector: string
): Promise<void> => {
    const contacts = await driver.findElements(By.css(contactListSelector))
    if (contacts.length !== 1) {
        throw new Error(`Expected exactly 1 contact, but found ${contacts.length}`)
    }
}
