import { Page } from "playwright/test";

export const setupOnDialog = (page: Page): void => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
};
