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

  async deleteContact(name: string) {
    const contactRow = this.page.locator('[data-id="contact"]', {
      hasText: name,
    });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await contactRow.locator('[data-id="delete-button"]').click();
  }

  async getElementByDataId(dataID: string, params: object = {}) {
    const element = await this.page.locator(`[data-id="${dataID}"]`, params);

    return (await element.count()) === 0 ? null : element;
  }

  async reload() {
    await this.page.reload();
  }
}
