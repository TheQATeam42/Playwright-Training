import {expect, Page} from "playwright/test"
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

test.skip("Write here the name of the scenario", async ({page}): Promise<void> => {
    const contractsTitle: Locator = await getElement(page, "contacts title", globalConfig)
    await expect(contractsTitle).toContainText("Contacts")
})

const fillSearchBar = async (page: Page, data: string): Promise<void> => 
{
    const searchBar = await getElement(page, "search bar", globalConfig)
    await searchBar.fill(data)
}

const countContacts =  async (page: Page): Promise<number> => 
{
   const matchingContracts=  (await getElement(page, "contact item", globalConfig))
   return (await matchingContracts.all()).length
}

const getContactNames = async (page: Page): Promise<string[]> => {
    const contactCards =  await getElement(page, "contact item name", globalConfig)
    return await contactCards.allInnerTexts()   
}

/**
 * Beginning of a new journey...
 */
test("Check and delete existing contact", async({page}): Promise<void> =>{
    await fillSearchBar(page, "Alea Nieves")
    expect(await countContacts(page)).toEqual(1)
    expect(await getContactNames(page)).toContain("Alea Nieves")
})