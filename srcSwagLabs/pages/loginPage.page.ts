import { Page, Locator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

/**
 * Represents the login page of the application.
 * This class provides methods and properties to interact with the login form elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class LoginPage extends BasePage {
  /** Input field for entering the username */
  public readonly usernameInput: Locator;
  /** Input field for entering the password */
  public readonly passwordInput: Locator;
  /** Button that submits the login form */
  public readonly loginButton: Locator;
  /** Error message displayed when login fails */
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }
}
