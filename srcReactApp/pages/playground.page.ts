import { Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the playground page of the application.
 * This class provides methods and properties to interact with the playground elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Playground extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  playGroundURL: string = "https://hub.testingtalks.com.au/playground"

  async getElementByCss(parameter: string, value: string, params: object = {}) {
    const element = this.page.locator(`[${parameter}="${value}"]`, params);

    return element;
  }

  async searchSelectByLabel(label: string, text: string) {
    await this.page.getByLabel(label).fill(text);
    await this.page.getByRole('option').first().click();
  }

  async goto(url: string = this.playGroundURL) {
    await this.page.goto(url)
  }


}
