import {Then} from "@cucumber/cucumber"
import {ElementKey, Negate} from "../../env/global-types"
import {ScenarioWorld} from "../setup/world"
import {getElement} from "../../support/web-element-helper"
import {expect} from "playwright/test"


Then(/^the element "(.*)" should( not)? contain the text "(.*)"$/, 
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: Negate, expectedText: string) {
        const {screen: {page}, globalConfig} = this

        const element = getElement(page, elementKey, globalConfig)

        if (negate) {
            await expect(element).not.toContainText(expectedText)
        } else {
            await expect(element).toContainText(expectedText)
        }
    }
)
