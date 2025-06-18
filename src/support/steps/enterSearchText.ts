import type { WebDriver } from 'selenium-webdriver'
import { By, until } from 'selenium-webdriver'

/**
 * Enters text into the search input using Selenium WebDriver
 * @param driver - Selenium WebDriver instance
 * @param searchInputSelector - CSS selector for the search input
 * @param searchText - The text to type into the input
 */
export const enterSearchText = async (
    driver: WebDriver,
    searchInputSelector: string,
    searchText: string
): Promise<void> => {
    const input = await driver.wait(until.elementLocated(By.css(searchInputSelector)), 5000)
    await input.sendKeys(searchText)
}
