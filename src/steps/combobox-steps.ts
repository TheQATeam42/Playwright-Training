import {Locator, Page} from "playwright/test"
import {getElement} from "../support/elements-helper"
import {globalConfig} from "../index"

/**
 * Returns all option names from movies combobox
 * @param page 
 * @returns 
 */
export const getMoviesComboBoxOptions = async (page: Page): Promise<string[]> => {
    const comboBoxOptionsList: Locator = await getElement(page, "movies combobox options", globalConfig)
    const options: Locator[] = await comboBoxOptionsList.getByRole("option").all()
    const optionNames: string[] = await Promise.all(
        options.map(async (option: Locator) => await option.innerText())
    )

    return optionNames
}

/**
 * Selects option option of movies combobox using index
 * @param page 
 * @param index 
 * @returns 
 */
export const selectMoviesComboBoxOption = async (page: Page, index: number): Promise<string> => {
    const comboBoxOptionsList: Locator = await getElement(page, "movies combobox options", globalConfig)
    const option: Locator = comboBoxOptionsList.getByRole("option").nth(index)
    const selectedOption: string =  await option.innerText()
    await option.click()
    
    
    return selectedOption
}

/**
 * Selects random option from movies combobox
 * @param page 
 * @returns 
 */
export const selectRandomMoviesComboBoxOption = async (page: Page): Promise<string> => {
    const comboBoxOptionsList: Locator = await getElement(page, "movies combobox options", globalConfig)
    const numberOfOptions: number = await comboBoxOptionsList.getByRole("option").count()
    const itemIndex: number = Math.floor(Math.random() * numberOfOptions)
    const selectedOption: string = await selectMoviesComboBoxOption(page, itemIndex)
    
    return selectedOption
}
