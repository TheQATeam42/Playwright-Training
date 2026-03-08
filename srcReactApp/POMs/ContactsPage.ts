import { Locator, Page } from "playwright";

class ContactsPage {
  readonly page: Page;
  readonly searchbar: Locator;
  readonly createButton: Locator;
  readonly allContactItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchbar = page.getByTestId("search");
    this.createButton = page.getByRole("button", {
      name: "Create",
    });
    this.allContactItems = page.getByTestId("contact");
  }

  getSpecificContact(name: string): Locator {
    return this.allContactItems.filter({
      hasText: name,
    });
  }

  async searchContact(name: string): Promise<void> {
    await this.searchbar.fill(name);
  }

  async clearSearchBar(): Promise<void> {
    await this.searchbar.fill("");
  }
}

export default ContactsPage;
