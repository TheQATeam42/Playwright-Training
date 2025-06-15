import {When} from "@cucumber/cucumber"
import {getElement} from "../../support/web-element-helper"
import {ScenarioWorld} from "../setup/world"


When(/^I click on the element "(.*)"$/, 
    async function (this: ScenarioWorld, elementKey: string) {
        const {screen: {page}, globalConfig} = this

        const element = getElement(page, elementKey, globalConfig)
        await element.click()
    }
)
