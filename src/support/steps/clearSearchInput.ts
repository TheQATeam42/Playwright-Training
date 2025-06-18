import type { WebDriver } from 'selenium-webdriver'
import { By, until } from 'selenium-webdriver'

/**
 * Clears the search input field using Selenium WebDriver
 * @param driver - Selenium WebDriver instance
 * @param searchInputSelector - CSS selector for the input
 */
export const clearSearchInput = async (
    driver: WebDriver,
    searchInputSelector: string
): Promise<void> => {
    const input = await driver.wait(until.elementLocated(By.css(searchInputSelector)), 5000)
    await input.clear()
}
