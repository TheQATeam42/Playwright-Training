import ReactAppEndpoints from "../../srcReactApp/utils/endpoints.util";
import SwagLabsEndpoints from "../../srcSwagLabs/utils/endpoints.util";

/**
 * Utility class for managing and providing the base URL for API requests.
 * @class
 */
class UrlHelper {
  /**
   * The currently configured base URL (without a trailing slash).
   * @private
   */
  private static _url = "";

  /**
   * Sets the base URL used by the helper.
   * Removes any trailing slashes to keep URL concatenation predictable.
   * If the provided value is falsy, the current base URL is left unchanged.
   *
   * @param url - The base URL to set (e.g. "https://example.com/").
   */
  public static setBaseUrl(url: string) {
    if (!url) return;
    this._url = url.replace(/\/+$/, "");
  }

  /**
   * Returns the currently configured base URL.
   * @returns The base URL string without a trailing slash.
   */
  public static get baseUrl(): string {
    return this._url;
  }

  /**
   * Combines the configured base URL with the provided endpoint.
   * The endpoint is expected to be a path string (from an endpoints enum/utility).
   *
   * @param endpoint - Endpoint path (from SwagLabsEndpoints or ReactAppEndpoints).
   * @returns The full URL string formed by concatenating the base URL and endpoint.
   */
  public static getFullUrl(
    endpoint: SwagLabsEndpoints | ReactAppEndpoints
  ): string {
    return `${this._url}${endpoint}`;
  }

  /**
   * Validates whether the page's current URL matches the expected URL for
   * the provided endpoint. Comparison is done on origin and pathname only.
   *
   * @param endpoint - Endpoint path to validate against.
   * @param page - Playwright Page instance whose URL will be checked.
   * @returns A promise that resolves to true when origin and pathname match,
   *          otherwise false. Returns false on any parsing error.
   */
  public static async validateUrl(
    endpoint: SwagLabsEndpoints | ReactAppEndpoints,
    page: import("playwright").Page
  ): Promise<boolean> {
    try {
      const current = new URL(page.url());
      const expected = new URL(this.getFullUrl(endpoint));
      return (
        current.origin === expected.origin &&
        current.pathname === expected.pathname
      );
    } catch {
      return false;
    }
  }
}

export default UrlHelper;
