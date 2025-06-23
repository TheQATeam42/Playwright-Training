import type { WebDriver } from 'selenium-webdriver'
import { By } from 'selenium-webdriver'
import { popAlertTreatment } from './popAlertTreatment'


/**
 * Clicks the delete button for the contact with the given name
 * @param driver - Selenium WebDriver instance
 * @param listItemSelector - CSS selector for each contact list item
 * @param deleteButtonSelector - CSS selector for delete buttons inside a contact item
 * @param contactName - The name of the contact to delete
 */
export const deleteContact = async (
    driver: WebDriver,
    listItemSelector: string,
    deleteButtonSelector: string,
    contactName: string,
): Promise<void> => {
    const items = await driver.findElements(By.css(listItemSelector))

    for (const item of items) {
        const text = await item.getText()
        if (text.includes(contactName)) {
            const deleteBtn = await item.findElement(By.css(deleteButtonSelector))
            await deleteBtn.click()
            await popAlertTreatment(driver, true);

            return
        }
    }

    throw new Error(`Delete button for contact "${contactName}" not found.`)
}

