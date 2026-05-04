import { FrameLocator, Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the embedded iframe section on the Playground page.
 * Provides locators scoped inside the iframe for searching and creating contacts.
 *
 * @extends BaseComponent
 */
export default class PlaygroundIframeComponent extends BaseComponent {
  public readonly searchInput: Locator;
  public readonly contactList: Locator;
  public readonly createContactTitle: Locator;
  public readonly addButton: Locator;

  constructor(page: Page, frame: FrameLocator) {
    super(page);
    this.searchInput = frame.getByTestId("search");
    this.contactList = frame.locator(".ContactList");
    this.createContactTitle = frame.getByTestId("create-contact-header");
    this.addButton = frame.getByTestId("add-button");
  }
}
