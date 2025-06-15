import {Given} from "@cucumber/cucumber"
import {ScenarioWorld} from "../setup/world"
import {PageId} from "../../env/global-types"
import {currentPathMatchesPageId, navigateToPage} from "../../support/navigation-behavior"
import {expect} from "playwright/test"


Given(/^i go to the page "(.*)"$/,
    async function (this: ScenarioWorld, pageId: PageId) {
        const {screen: {page}, globalConfig} = this

        await navigateToPage(page, pageId, globalConfig)
        // Click the link here to understand more about auto-wait assertions
        // https://playwright.dev/docs/test-assertions
        await expect(async () => {
            expect(currentPathMatchesPageId(page, pageId, globalConfig)).toBeTruthy()
        }).toPass()
    }
)
