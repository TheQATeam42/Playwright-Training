import { expect, Locator } from "@playwright/test";
import { globalConfig } from "..";
import { test } from "../setup/hooks";
import { clickButton, typeInput } from "../support/helpers";
import { navigateToPage } from "../support/navigation-behavior";
import { getElement } from "../support/elements-helper";

const testedMovieName: string = "The Godfather: Part II"
const pageName: string = "playground"

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

    await test.step("Get all checkboxes", async (): Promise<void> => {
        const boxes = await getElement(page, "checkBox", globalConfig)
        console.log(`await boxes.count(): ${await boxes.count()}`)

        const checkBoxes = page.getByRole("checkbox")
        console.log(`await checkBoxes.count(): ${await checkBoxes.count()}`)

        const count: number = await boxes.count()

        for (let i = 0; i < count; i++) {
            const cb = checkBoxes.nth(i);

            const visible = await cb.isVisible();
            const checked = await cb.isChecked?.().catch(() => 'N/A'); // fallback for non-<input>
            const label = await cb.getAttribute("aria-label") ?? "No aria-label";
            const testId = await cb.getAttribute("data-testid");
            const className = await cb.getAttribute("class");

            console.log(`--- Checkbox ${i} ---`);
            console.log(`Visible: ${visible}`);
            console.log(`Checked: ${checked}`);
            console.log(`Aria-label: ${label}`);
            console.log(`data-testid: ${testId}`);
            console.log(`Class: ${className}`);
        }
    })
})