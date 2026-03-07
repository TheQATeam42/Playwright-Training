import { Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getElementByDataId(dataID: string, params: object = {}) {
    const element = this.page.locator(`[data-id="${dataID}"]`, params);
    console.log(element)
    console.log(await element.count())

    return element;
  }

  async reload() {
    await this.page.reload();
  }

  async checkURL(URL: String) {
    return this.page.url() === URL;
  }

  async deleteContact(name: string) {
    const contactRow = this.page.locator('[data-id="contact"]', {
      hasText: name,
    });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await contactRow.locator('[data-id="delete-button"]').click();
  }

  async createContact(
    Name: string,
    Gender: string,
    Phone: string,
    Street: string,
    City: string
  ) {
    const form = await this.getElementByDataId("contact-form");

    await form?.locator('[data-id="name"]').fill(Name);
    await form?.locator('[data-id="gender"]').selectOption(Gender);
    await form?.locator('[data-id="phone"]').fill(Phone);
    await form?.locator('[data-id="street"]').fill(Street);
    await form?.locator('[data-id="city"]').fill(City);

    await form?.locator('[data-id="save-button"]').click();
  }
}
