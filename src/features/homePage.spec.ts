import { test } from '@playwright/test'
import { Builder, WebDriver } from 'selenium-webdriver'
import { performContactDeletionFlow } from '../support/actions/HomePageDeletion'
import { globalConfig } from '../env/globalConfig'


test('Contact deletion flow in home page', async () => {
  const driver: WebDriver = await new Builder().forBrowser('chrome').build()

  try {
    await performContactDeletionFlow(driver, globalConfig)
  } finally {
    await driver.quit()
  }
})
