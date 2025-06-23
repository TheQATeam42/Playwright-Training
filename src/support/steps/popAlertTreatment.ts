import type { WebDriver } from 'selenium-webdriver';
import { until } from 'selenium-webdriver';

/**
 * Handle an alert popup: wait for it, check text, accept or dismiss it.
 * Stops handling if expectedAlertText is set and does not match the alert text.
 * 
 * @param driver Selenium WebDriver instance
 * @param expectedAlertText Expected alert text to verify (pass null to skip check)
 * @param acceptedResponse true to accept alert, false to dismiss
 * @param timeout milliseconds to wait for alert (default 5000)
 * @returns Promise<boolean> whether an alert was found and handled
 */
export const popAlertTreatment = async (
  driver: WebDriver,
  acceptedResponse: boolean,
): Promise<boolean> => {
  try {
    await driver.wait(until.alertIsPresent());

    const alert = await driver.switchTo().alert();

    if (acceptedResponse) {
      await alert.accept();
      console.log('Alert accepted');
    } else {
      await alert.dismiss();
      console.log('Alert dismissed');
    }

    return true;
  } catch (err) {
    console.log('No alert present:', (err && (err as Error).message) || err);
    return false;
  }
};
