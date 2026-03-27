import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";

export default class Contacts extends BasePage {
  readonly searchBar: Locator;
  readonly contactCards: Locator;
  readonly contact: Contact;
  readonly pageTitle: Locator;
  readonly createButton: Locator;
  readonly emptySearchMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBar = page.locator('[data-id="search"]');
    this.contactCards = page.locator('[data-id="contact"]');
    this.contact = new Contact(page);
    this.createButton = page.locator('[data-id="add-button"]');
    this.pageTitle = page.locator('[data-id="contacts"]');
    this.emptySearchMessage = page.getByText("There are no items to display");
  }
}
