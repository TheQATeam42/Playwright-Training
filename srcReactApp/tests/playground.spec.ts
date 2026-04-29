import { expect} from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";
import ReactAppEndpoints from "../utils/endpoints.util";
import { Dessert } from "../../sharedFiles/modals/dessert.model";
import Contacts from "../pages/contacts.page";

const playgroundTest = reactAppTest.extend({});
const expectedDesserts: Dessert[] = [
  new Dessert("Frozen yoghurt",      159, 6,   24, 4  ),
  new Dessert("Ice cream sandwich",  237, 9,   37, 4.3),
  new Dessert("Eclair",              262, 16,  24, 6  ),
  new Dessert("Cupcake",             305, 3.7, 67, 4.3),
  new Dessert("Gingerbread",         356, 16,  49, 3.9),
];

playgroundTest(
    "playground test",async ({contacts,page}): Promise<void> => {
        // Write here the test steps
        expect(await contacts().issherachbarVisible()).toBeTruthy();
        await contacts().clickPlaygroundButton();
        expect(page.url()).toContain(ReactAppEndpoints.playgroundend);
        const movieName = "The Godfather";
        await contacts().selectMovie(movieName);
        expect(await contacts().AutocompleteComboBoxid.inputValue()).toBe(movieName);
        await contacts().clearSearch();
        expect(await contacts().AutocompleteComboBoxid.inputValue()).toBe("");
        await contacts().selectMovieByIndex(0);
        expect(await contacts().isswichon()).toBeTruthy();
        await contacts().clickswich();
        expect(await contacts().isswichon()).toBeFalsy();
        expect(await contacts().swich2.isDisabled()).toBeTruthy(); 
        const rowCount = await contacts().tableRows.count();

// Loop through each row
for (let i = 0; i < rowCount; i++) {
  const actual = await contacts().getTableRowData(i);
  const expected = expectedDesserts[i];

  expect(actual.name).toBe(expected.name);
  expect(actual.calories).toBe(expected.calories);
  expect(actual.fat).toBe(expected.fat);
  expect(actual.carbs).toBe(expected.carbs);
  expect(actual.protein).toBe(expected.protein);
}
await contacts().windowbutton();
const [newPage] = await Promise.all([
  page.context().waitForEvent("page"),
]);
await newPage.waitForLoadState();
expect(newPage.url()).toBe("https://hub.testingtalks.com.au/");        
const newWindowContacts = new Contacts(newPage);
expect(await newWindowContacts.issherachbarVisible()).toBeTruthy();
const newcontactbutton =  newPage.getByTestId("add-button");
await newcontactbutton.click();
expect(newPage.url()).toBe("https://hub.testingtalks.com.au/tasks/create");
await contacts().newcontactbottonclick();
expect(await contacts().iframeCreateContactTitle.textContent()).toBe("Create Contact");
});
