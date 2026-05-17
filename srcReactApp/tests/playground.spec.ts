import { expect, FrameLocator } from "playwright/test";
import { TestType } from "../../sharedFiles/utils/testTypes.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import reactAppTest from "./setup/testLevelHooks.setup";
import { tableContent } from "../utils/tableContent.util";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import Contacts from "../pages/contacts.page";
import CreateContact from "../pages/createContact.page";
import { log } from "console";

const playgroundTest = reactAppTest.extend({});

playgroundTest.describe("Playground Page Tests", { tag: "@playground" }, () => {
  playgroundTest.beforeEach(async ({ page, playground }) => {
    // Before each test route to playground.
    await page.goto(ReactAppEndpoints.PLAYGROUND);
    // Make sure the page is open and elements are displayed.
    await playground().validatePageOpen();
  });

  /**
   * Check functionality of autocomplete movie box with valid input.
   */
  playgroundTest(
    "Fill autocomplete combo box with valid input.",
    { tag: TestType.Sanity },
    async ({ playground }) => {
      const chosenMovie = "The Shawshank Redemption";

      // Pick the chosen movie.
      await playground().fillAutocompleteBox(chosenMovie);
      await playground().pickNthOptionAutocompleteBox(0);

      // Make sure that the correct movie has been chosen.
      await expect(playground().moviesInput).toHaveValue(chosenMovie);

      // De-select the selected option.
      await playground().moviesInput.fill("");

      // Select the second option in the now complete list.
      // Make sure that option has indeed been selected.
      await playground().moviesInput.click(); // click to open dropdown.
      await playground().pickNthOptionAutocompleteBox(2);
    }
  );

  /**
   * Check an enabled and a disabled switch and validate that their behavior is accordinf to
   * their state.
   */
  playgroundTest(
    "Change switch state",
    { tag: [TestType.Sanity, TestType.Negative] },
    async ({ playground }) => {
      // Toggle enabled switch
      await playground().toggleEnabledSwitch();
      // Make sure that the disabled one cannot be clicked.
      await expect(playground().disabledSwitch).toBeDisabled();
    }
  );

  /**
   * Given the expected content of the table, validate that the content of the table on the
   * page is the same as the expected.
   */
  playgroundTest(
    "Validate table contents",
    { tag: TestType.Sanity },
    async ({ playground }) => {
      // validate length is the same
      // for each i, check table[i] = myTable[i]
      await playground().validateTableContent(tableContent);
    }
  );

  /**
   * Open a new tab and within that tab click the create button.
   */
  playgroundTest(
    "Open new tab and click create",
    { tag: TestType.Sanity },
    async ({ playground, context }) => {
      const newPagePromise = context.waitForEvent("page");
      // Open a new tab using the link.
      await playground().openTabLink.click();

      // Wait for the new page to open.
      const newPage = await newPagePromise;
      const contactsPage = new Contacts(newPage);

      // Make sure a new tab with the contacts page has opened.
      await contactsPage.validatePageOpen();
      await contactsPage.createButton.click();

      await new CreateContact(newPage).validateFormOpen();
    }
  );

  /**
   * Open a new window via the playground and within the new window click create.
   */
  playgroundTest(
    "Open a new window and click create",
    { tag: TestType.Sanity },
    async ({ playground, context }) => {
      const newPagePromise = context.waitForEvent("page");
      // Open a new tab using the link.
      await playground().openWindowButton.click();

      // Wait for the new page to open.
      const newPage = await newPagePromise;
      const contactsPage = new Contacts(newPage);

      // Make sure a new tab with the contacts page has opened.
      await contactsPage.validatePageOpen();
      await contactsPage.createButton.click();

      await new CreateContact(newPage).validateFormOpen();
    }
  );

  /**
   * Click on create within an IFrame.
   */
  playgroundTest(
    "Click create button from within the IFrame",
    { tag: TestType.Sanity },
    async ({ playground }) => {
      // Get the frame object.
      const iframe = await (
        await playground().iframe.elementHandle()
      )?.contentFrame();

      // Click the create button within the iframe.
      await playground()
        .iframe.contentFrame()
        .getByTestId("add-button")
        .click();

      // Validate that the iframe has routed to the create contact form.
      expect(
        iframe?.url() == UrlHelper.getFullUrl(ReactAppEndpoints.CREATE_CONTACT)
      ).toBeTruthy();
    }
  );
});
