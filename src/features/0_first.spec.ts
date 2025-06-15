import {expect} from "playwright/test"
import {globalConfig} from "../index"
import {getElement} from "../support/elements-helper"
import {Locator} from "@playwright/test"
import {test} from "../setup/hooks"


/*
    Here you write all the scenarios of the homePage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/

test("Write here the name of the scenario", async ({page}): Promise<void> => {
    const contractsTitle: Locator = await getElement(page, "contacts title", globalConfig)
    await expect(contractsTitle).toContainText("Contacts")
})

/**
 * Beginning of a new journey...
 */
