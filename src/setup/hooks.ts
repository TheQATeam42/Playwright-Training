import {navigateToPage} from "../support/navigation-behavior"
import {globalConfig} from "../index"
import {test as baseTest} from "@playwright/test"


export const test = baseTest.extend({})

test.beforeEach(async ({page}) => {
    await navigateToPage(page, "home", globalConfig)
})

test.afterEach(async ({page}) => {
    await page.close()
})
