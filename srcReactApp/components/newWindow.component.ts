import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the New Window button on the Playground page.
 * Provides the locator to trigger opening a new browser window.
 *
 * @extends BaseComponent
 */
export default class NewWindowComponent extends BaseComponent {
  public readonly newWindowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newWindowButton = page.getByTestId("open-window-button");
  }
}
