import {expect, Locator} from "playwright/test"
import {test} from "../setup/hooks"
import {navigateToPage} from "../support/navigation-behavior"
import {globalConfig} from ".."
import {getElement} from "../support/elements-helper"
import {selectMoviesComboBoxOption, selectRandomMoviesComboBoxOption} from "../steps/combobox-steps"
import {checkSwitchDisabledByClick} from "../steps/switch-steps"
import {checkTableDataRows, checkTableHeaderRow, checkTableRowsCount} from "../steps/table-steps"


test.beforeEach(async ({page}) => {
    await navigateToPage(page, "playground", globalConfig)
})

test("Movies Comboboox", async ({page}): Promise<void> => {
    const comboBox: Locator = await getElement(page, "movies combobox", globalConfig)
    await comboBox.fill("pu")
    await selectMoviesComboBoxOption(page, 0)
    expect(await comboBox.inputValue()).toBe("Pulp Fiction")

    await comboBox.fill("")
    await comboBox.click()  // Click on input so options are rendered
    const selectedOption: string = await selectRandomMoviesComboBoxOption(page)
    expect(await comboBox.inputValue()).toBe(selectedOption)
})

test("Colored Checkboxes", async ({page}): Promise<void> => {
    const checkboxes: Locator[] = await (await getElement(page, "checkbox", globalConfig)).all()

    for (const checkbox of checkboxes) {
        await checkbox.check()
    }

    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeChecked()
    }
})

test("Switches", async ({page}): Promise<void> => {
    const switch1: Locator = await getElement(page, "switch one", globalConfig)
    const switch2: Locator = await getElement(page, "switch two", globalConfig)

    // Check disabled property
    await expect(switch1).not.toBeDisabled()
    await expect(switch2).toBeDisabled()

    // Check by clicking
    expect(await checkSwitchDisabledByClick(switch1)).toBe(false)
    expect(await checkSwitchDisabledByClick(switch2)).toBe(true)
})

test("Table", async ({page}): Promise<void> => {
    const observedTable: Locator = await getElement(page, "basic table", globalConfig)

    checkTableRowsCount(observedTable)
    await checkTableHeaderRow(observedTable)
    await checkTableDataRows(observedTable)
})
