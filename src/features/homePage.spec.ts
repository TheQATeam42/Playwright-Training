import { Builder, WebDriver } from 'selenium-webdriver'
import { describe, it, before, after } from 'node:test' // or use 'mocha' if preferred
import { performContactDeletionFlow } from '../support/actions/HomePageDeletion'

let driver: WebDriver

describe('Contact deletion flow using Selenium WebDriver', () => {
    before(async () => {
        driver = await new Builder().forBrowser('chrome').build()
    })

    after(async () => {
        if (driver) {
            await driver.quit()
        }
    })

    it('should delete the contact "Alea Nieves" from the list', async () => {
        await performContactDeletionFlow(driver)
    })
})
