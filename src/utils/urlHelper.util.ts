/**
 * Enumeration of application endpoints.
 * @enum {string}
 */
enum Endpoints {
  INVENTORY = "/inventory.html",
  CART = "/cart.html",
  // TODO: Add here all the endpoints
}

/**
 * Utility class for managing and providing the base URL for API requests.
 * @class
 */
class UrlHelper {
  private static _url: string = process.env.URL || "https://www.saucedemo.com/";

  /**
   * Gets the base URL for the application.
   * @static
   * @returns {string} The base URL
   */
  public static get url(): string {
    return this._url;
  }

  /**
   * Validates that the current URL matches the expected endpoint.
   * @param {Endpoints} endpoint - The endpoint to validate against.
   * @param {import('playwright').Page} page - The Playwright page instance.
   * @returns {Promise<boolean>} True if the current URL matches the endpoint, otherwise false.
   */
  public static async validateUrl(
    endpoint: Endpoints,
    page: import("playwright").Page
  ): Promise<boolean> {
    const currentUrl = page.url();
    const expectedUrl = this._url + endpoint;
    return currentUrl === expectedUrl;
  }
}

export { Endpoints };
export default UrlHelper;
