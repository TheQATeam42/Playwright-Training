import { expect, Locator } from "@playwright/test";
import { globalConfig } from "..";
import { test } from "../setup/hooks";
import { checkField, clickButton, typeInput } from "../support/actionsHelpers";
import { checkboxesIndexes, elementsKeys, pageName, testedMovieName } from "../support/Configurations/2_playgroundConfig";
import { getElement } from "../support/elements-helper";
import { navigateToPage } from "../support/navigation-behavior";

test("Search for a movie", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    const searchBar: Locator = await test.step("Search for a movie name", async (): Promise<Locator> => {
        let moviesSearchBar: Locator = await typeInput(page, testedMovieName, elementsKeys.autoCompleteComboBoxInput)
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
        await clickButton(page, elementsKeys.autoCompleteComboBoxCloseIcon)
        await expect(searchBar).toBeEmpty()
    })
})

test("Check checkboxes", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    const checkboxes: Locator[] = await test.step("Get all checkboxes in the given section", async (): Promise<Locator[]> => {
        const allBoxes: Locator = await getElement(page, elementsKeys.checkBox, globalConfig)
        const boxesCount: number = await allBoxes.count()

        expect(boxesCount).toBeGreaterThanOrEqual(checkboxesIndexes.lastIndex - checkboxesIndexes.firstIndex + 1)

        const testedBoxes: Locator[] = []

        for (let i = checkboxesIndexes.firstIndex; i < boxesCount && i <= checkboxesIndexes.lastIndex; i++) {
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

test("Test switches", async ({ page }): Promise<void> => {
    await navigateToPage(page, pageName, globalConfig)

    const switches: Locator[] = await test.step("Find all switches", async (): Promise<Locator[]> => {
        const allSwitches: Locator = await getElement(page, elementsKeys.switch, globalConfig)
        const switchesAmount = await allSwitches.count()
        const switches: Locator[] = []

        for (let i = 0; i < switchesAmount; i++) {
            switches.push(allSwitches.nth(i))
        }

        return switches
    })

    for (const [index, currentSwitch] of switches.entries()) {
        await test.step(`Check switch #${index} is enabled/ disabled`, async () => {
            const isCurrentSwitchEnabled: boolean = await currentSwitch?.isEnabled()

            if (!isCurrentSwitchEnabled) {
                expect(currentSwitch).toBeDisabled()
                return
            }

            const originalIsChecked: boolean = await currentSwitch.isChecked()
            await checkField(currentSwitch)

            expect(await currentSwitch.isChecked()).toEqual(!originalIsChecked)
        })
    }
})