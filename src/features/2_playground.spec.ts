import { expect, Locator } from "@playwright/test";
import { globalConfig } from "..";
import { test } from "../setup/hooks";
import { clickButton, typeInput } from "../support/helpers";
import { navigateToPage } from "../support/navigation-behavior";
import { getElement } from "../support/elements-helper";

const testedMovieName: string = "The Godfather: Part II"
const pageName: string = "playground"
const checkboxesIndexes: { first: number, last: number } = { first: 2, last: 6 }

test("Search for a movie", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    const searchBar: Locator = await test.step("Search for a movie name", async (): Promise<Locator> => {
        let moviesSearchBar: Locator = await typeInput(page, testedMovieName, "autoCompleteComboBoxInput")
        await page.waitForSelector('.MuiAutocomplete-popper')

        return moviesSearchBar
    })
    await expect(searchBar).toHaveValue(testedMovieName)

    await test.step("Select a movie", async (): Promise<void> => {
        const searchedOption: Locator = page.getByRole("option", { name: testedMovieName })
        await expect(searchedOption).toBeVisible()
        await searchedOption.click()
        await expect(searchBar).toHaveValue(testedMovieName)
    })

    await test.step("Clear search", async (): Promise<void> => {
        await searchBar.click()
        await clickButton(page, "autoCompleteComboBoxCloseIcon")
        await expect(searchBar).toBeEmpty()
    })
})

test("Check checkboxes", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    const checkboxes: Locator[] = await test.step("Get all checkboxes in the given section", async (): Promise<Locator[]> => {
        const allBoxes: Locator = await getElement(page, "checkBox", globalConfig)
        const boxesCount: number = await allBoxes.count()

        expect(boxesCount).toBeGreaterThanOrEqual(checkboxesIndexes.last - checkboxesIndexes.first + 1)

        const testedBoxes: Locator[] = []

        for (let i = checkboxesIndexes.first; i < boxesCount && i <= checkboxesIndexes.last; i++) {
            testedBoxes.push(allBoxes.nth(i))
        }

        return testedBoxes
    })

    for (const [index, checkBox] of checkboxes.entries()) {
        await test.step(`Check checkbox #${index} inputs`, async () => {
            expect(await checkBox.isChecked()).toBeFalsy()
            await checkBox.check();
            expect(await checkBox.isChecked()).toBeTruthy()

        })
    }
})
