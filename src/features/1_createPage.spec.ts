import { expect } from "playwright/test"
import { test } from "../setup/hooks"
import { fillContactInfo } from "../steps/ceration-form-steps";
import { getContactNames } from "../steps/contact-steps";


/*
    Here you write all the scenarios of the createPage.
    Scenarios are all the actions that you can do in a feature (small titles to big title)
    For Example, in the home page, a scenario would be to search a person.
    in the scenario itself, you write the small steps that do the actual functionality

    So, when writing a scenario here, write the small steps in a scenario function
    and write the scenario function in here
*/
test.only("Create new contact", async ({ page }): Promise<void> => {
    await page.getByRole("button", { name: "Create" }).click();

    await fillContactInfo(page, "Genghis Khan", "Male", "(577) 385-0576",
        "Ap #826-8849 Vulputate Street", "Temüjin")

    await page.getByRole("button", { name: "Save" }).click();

    expect(await getContactNames(page)).toContain("Genghis Khan")
})