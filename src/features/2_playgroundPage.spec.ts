import { expect, Locator, Page } from "playwright/test"
import { test } from "../setup/hooks"
import { navigateToPage } from "../support/navigation-behavior";
import { globalConfig } from "..";
import { getElement } from "../support/elements-helper";
import { getAutocompleteComboBoxOptions, selectAutocompleteComboBoxOption } from "../steps/combobox-steps";
import { checkSwitchDisabledByClick } from "../steps/switch-steps";

/*
    Here you write all the scenarios of the playgroundPage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/
test("Autocomplete Combo Box", async ({ page }): Promise<void> => {
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

test("Checkboxes", async ({ page }): Promise<void> => {
    await navigateToPage(page, "playground", globalConfig)

    const checkboxes: Locator[] = await (await getElement(page, "checkbox", globalConfig)).all()

    for (const checkbox of checkboxes) {
        await checkbox.check()
    }

    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeChecked()
    }
})

test("Switches", async ({ page }): Promise<void> => {
    await navigateToPage(page, "playground", globalConfig)

    const switch1: Locator = await getElement(page, "switch one", globalConfig)
    const switch2: Locator = await getElement(page, "switch two", globalConfig)

    // Check disabled property
    await expect(switch1).not.toBeDisabled()
    await expect(switch2).toBeDisabled()

    // Check by clicking
    expect(await checkSwitchDisabledByClick(switch1)).toBe(false)
    expect(await checkSwitchDisabledByClick(switch2)).toBe(true)
})
