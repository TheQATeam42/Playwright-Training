import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

/**
 * Represents the Switch Group on the Playground page.
 * Provides locators for switch-one and switch-two toggle elements.
 *
 * @extends BaseComponent
 */
export default class SwitchGroupComponent extends BaseComponent {
  public readonly switchOne: Locator;
  public readonly switchTwo: Locator;

  constructor(page: Page) {
    super(page);
    this.switchOne = page.getByTestId("switch-one");
    this.switchTwo = page.getByTestId("switch-two");
  }
}
