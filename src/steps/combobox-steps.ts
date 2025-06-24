import { Locator, Page } from "playwright/test"
import { getElement } from "../support/elements-helper"
import { globalConfig } from "../index"


export const getAutocompleteComboBoxOptions = async (page: Page): Promise<string[]> => {
    const comboBoxOptionsList: Locator = await getElement(page, "autcomplete combobox options", globalConfig)
    const options: Locator[] = await comboBoxOptionsList.getByRole("option").all()
    const optionNames: string[] = await Promise.all(
        options.map(async (option: Locator) => await option.innerText())
    )
    return optionNames;
}

export const selectAutocompleteComboBoxOption = async (page: Page, index: number): Promise<void> => {
    const comboBoxOptionsList: Locator = await getElement(page, "autcomplete combobox options", globalConfig)
    const options: Locator[] = await comboBoxOptionsList.getByRole("option").all()
    await options[index].click();
}