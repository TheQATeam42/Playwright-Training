import { expect, Locator, Page } from "playwright/test"
import { test } from "../setup/hooks"
import { navigateToPage } from "../support/navigation-behavior";
import { globalConfig } from "..";
import { getElement } from "../support/elements-helper";

const getAutocompleteComboBoxOptions = async (page: Page): Promise<string[]> => {
    const comboBoxOptionsList: Locator = await getElement(page, "autcomplete combobox options", globalConfig)
    const options: Locator[] = await comboBoxOptionsList.getByRole("option").all()
    const optionNames: string[] = await Promise.all(
        options.map(async (option: Locator) => await option.innerText())
    )
    return optionNames;
}

const selectAutocompleteComboBoxOption = async (page: Page, index: number): Promise<void> => {
    const comboBoxOptionsList: Locator = await getElement(page, "autcomplete combobox options", globalConfig)
    const options: Locator[] = await comboBoxOptionsList.getByRole("option").all()
    await options[index].click();
}

/*
    Here you write all the scenarios of the playgroundPage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/
test("Autocomplete Combo Box, first option", async ({ page }): Promise<void> => {
    await navigateToPage(page, "playground", globalConfig)

    const comboBox: Locator = await getElement(page, "autcomplete combobox", globalConfig)
    await comboBox.fill("pu")
    await selectAutocompleteComboBoxOption(page, 0);
    expect(await comboBox.inputValue()).toBe("Pulp Fiction")

    await comboBox.fill("")
    await comboBox.click()  // click on input so options are rendered
    const options: string[] = await getAutocompleteComboBoxOptions(page)
    const itemIndex: number = Math.floor(Math.random() * options.length)
    await selectAutocompleteComboBoxOption(page, itemIndex)
    expect(await comboBox.inputValue()).toBe(options[itemIndex])
})
