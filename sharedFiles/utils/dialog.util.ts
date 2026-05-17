import { Page } from "playwright";

/**
 * Expose different ways to handle alerts within a test.
 */
export class DialogUtils {
  /**
   * Sets a listener to approve alerts automatically.
   */
  static async acceptAlerts(page: Page): Promise<void> {
    page.on("dialog", (dialog) => dialog.accept());
  }
}
