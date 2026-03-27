import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

export default class Switch extends BaseComponent {
  readonly switchOne: Locator;
  readonly switchTwo: Locator;

  constructor(page: Page) {
    super(page);
    this.switchOne = page.locator('[data-id="switch-one"]');
    this.switchTwo = page.locator('[data-id="switch-two"]');
  }
}
