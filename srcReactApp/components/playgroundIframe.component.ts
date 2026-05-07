import { FrameLocator, Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the embedded iframe section on the Playground page.
 * Provides locators scoped inside the iframe for searching and creating contacts.
 *
 * @extends BaseComponent
 */
export default class PlaygroundIframeComponent extends BaseComponent {
  /** Search input scoped inside the iframe contacts app */
  public readonly searchInput: Locator;
  /** Contact list container inside the iframe */
  public readonly contactList: Locator;
  /** Heading that confirms the Create Contact form is open inside the iframe */
  public readonly createContactTitle: Locator;
  /** Button that navigates to the Create Contact form inside the iframe */
  public readonly addButton: Locator;

  constructor(page: Page, frame: FrameLocator) {
    super(page);
    this.searchInput = frame.getByTestId("search");
    this.contactList = frame.locator(".ContactList");
    this.createContactTitle = frame.getByTestId("create-contact-header");
    this.addButton = frame.getByTestId("add-button");
  }
}
