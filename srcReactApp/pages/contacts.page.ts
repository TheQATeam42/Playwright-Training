import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import UrlHelper from "../../sharedFiles/utils/urlHelper.util";
import ReactAppEndpoints from "../utils/endpoints.util";
import Contact from "../components/contact.component";
import { ContactModel } from "../models/contact.model";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  /**
   * The contact search bar.
   */
  readonly searchInput: Locator;

  /**
   * The list of contact cards showing on the screens.
   */
  readonly contactsCard: Locator;

  /**
   * A button which leads to the create contact form.
   */
  readonly createButton: Locator;

  /**
   * The header of the contacts page.
   */
  readonly contactsPageHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.getByTestId("search");
    this.contactsCard = page.getByTestId("contact");
    this.createButton = page.getByTestId("add-button");
    this.contactsPageHeader = page.getByTestId("contacts");
  }

  /**
   * Search for a certain phrase. Validate that a valid result is found.
   * @param search the phrase to execute the search with.
   * @param expectedResults how many results do I expect to find.
   */
  async search(search: string, expectedResults: number): Promise<void> {
    await this.searchInput.fill("");
    // Fill search bar.
    await expect(this.searchInput).toHaveValue("");
    await this.searchInput.fill(search);

    // Assert expected result.
    await expect(this.contactsCard).toHaveCount(expectedResults);

    if (expectedResults > 0) {
      await expect(this.contactsCard).toContainText(search);
    }
  }

  /**
   * Check that a contact with the full contact details exists on the page.
   * @param expectedContact the contact we want to find on the page.
   */
  async validateContactDetails(expectedContact: ContactModel): Promise<void> {
    const contactsList = await this.createContactsComponents();

    const result = await Promise.all(
      contactsList.map(async (contactInList) => {
        return (
          (await contactInList.name.textContent()) === expectedContact.name &&
          (await contactInList.address.textContent())?.includes(
            expectedContact.street
          ) &&
          (await contactInList.address.textContent())?.includes(
            expectedContact.city
          ) &&
          (await contactInList.gender.textContent()) === expectedContact.gender
        );
      })
    );

    expect(result.some(Boolean)).toBeTruthy();
  }

  /**
   * Delete the nth contact in the contacts list.
   * Validate that it has been deleted successfully.
   */
  async deleteNthContact(contactNumber: number): Promise<void> {
    const amountOfContacts = await this.contactsCard.count();

    // Validate that the contact to be deleted exists.
    expect(amountOfContacts).toBeGreaterThanOrEqual(contactNumber);

    const contactToDelete = new Contact(this.contactsCard.nth(contactNumber));
    await contactToDelete.deleteButton.click();

    await expect(this.contactsCard).toHaveCount(amountOfContacts - 1);
  }

  /**
   * Validate that the contacts page is open.
   */
  async validatePageOpen(): Promise<void> {
    expect(
      await UrlHelper.validateUrl(ReactAppEndpoints.CONTACTS, this.page)
    ).toBeTruthy();

    // Validate that the components exist on the screen.
    await expect(this.contactsPageHeader).toHaveText("Contacts");
    await expect(this.searchInput).toHaveCount(1);
    await expect(this.createButton).toHaveCount(1);
  }

  /**
   * Create contact components according the list which currently appears.
   * Used to access inner contact elements.
   * @returns a list of contact components according to what appears at this moment in the contacts list.
   */
  private async createContactsComponents(): Promise<Contact[]> {
    const contactsCount = await this.contactsCard.count();
    const contacts: Contact[] = [];

    for (let nthContact = 0; nthContact < contactsCount; nthContact++) {
      contacts.push(new Contact(this.contactsCard.nth(nthContact)));
    }

    return contacts;
  }
}
