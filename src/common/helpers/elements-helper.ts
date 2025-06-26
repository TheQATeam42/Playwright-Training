import { Page, Locator } from "playwright";
import { GlobalConfig } from "../../env/types";
import { getElement } from "../../support/elements-helper";

/**
 * Handles JavaScript dialogs (alert, confirm, prompt) by automatically accepting them
 * @param page The Playwright page object
 */
export const acceptDialog = async (page: Page): Promise<void> => {
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
}

/**
 * Fills a specified input field on the page with the provided value using the field's name and global configuration.
 * @param page The Playwright page object
 * @param fieldName The name/key of the field to fill
 * @param value The value to input into the field
 * @param globalConfig The global configuration containing element mappings
 */
export const fillField = async (
    page: Page,
    fieldName: string,
    value: string,
    globalConfig: GlobalConfig
  ) => {
    const fieldInput: Locator = await getElement(page, fieldName, globalConfig);
    await fieldInput.fill(value);
  };