import { Page, Locator, FrameLocator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

export default class PlaygroundPage extends BasePage {
  public readonly AutocompleteComboBoxid: Locator;
  public readonly selectmovie: Locator;
  public readonly swichworks: Locator;
  public readonly swich2: Locator;
  public readonly tableRows: Locator;
  public readonly newwindowbutton: Locator;
  public readonly iframe: FrameLocator;
  public readonly iframeSearchInput: Locator;
  public readonly iframeContactList: Locator;
  public readonly iframeCreateContactTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.AutocompleteComboBoxid   = page.locator('#movies-input');
    this.selectmovie              = page.locator('[title="Open"]');
    this.swichworks               = page.getByTestId("switch-one");
    this.swich2                   = page.getByTestId("switch-two");
    this.tableRows                = page.getByTestId("basic-table").locator("tbody tr");
    this.newwindowbutton          = page.getByTestId("open-window-button");
    this.iframe                   = page.frameLocator("#basic-iframe");
    this.iframeSearchInput        = this.iframe.getByTestId("search");
    this.iframeContactList        = this.iframe.locator(".ContactList");
    this.iframeCreateContactTitle = this.iframe.getByTestId("create-contact-header");
  }

  async isIframeSearchBarVisible(): Promise<boolean> {
    return this.iframeSearchInput.isVisible();
  }
  async iframnewcontactbottonclick(): Promise<void> {
    await this.iframe.getByTestId("add-button").click();
  }
  async selectMovie(movie: string): Promise<void> {
    await this.AutocompleteComboBoxid.fill(movie);
    await this.page.getByRole("option", { name: movie, exact: true }).click();
  }
  async clearSearch(): Promise<void> {
    await this.page.locator('[title="Clear"]').click();
  }
  async selectMovieByIndex(index: number): Promise<void> {
    await this.selectmovie.click();
    await this.page.getByRole('option').nth(index).click();
  }
  async getselectedmovie(): Promise<string> {
    return (await this.AutocompleteComboBoxid.inputValue()) ?? "";
  }
  async clickswich(): Promise<void> {
    return this.swichworks.click();
  }
  isswichon(): Promise<boolean> {
    return this.swichworks.isChecked();
  }
  isswichon2(): Promise<boolean> {
    return this.swich2.isChecked();
  }
  async getTableRowData(index: number): Promise<{ name: string, calories: number, fat: number, carbs: number, protein: number }> {
    const row      = this.tableRows.nth(index);
    const name     = (await row.locator("th").textContent()) ?? "";
    const calories = parseFloat((await row.locator("td").nth(0).textContent()) ?? "0");
    const fat      = parseFloat((await row.locator("td").nth(1).textContent()) ?? "0");
    const carbs    = parseFloat((await row.locator("td").nth(2).textContent()) ?? "0");
    const protein  = parseFloat((await row.locator("td").nth(3).textContent()) ?? "0");
    return { name, calories, fat, carbs, protein };
  }
  async windowbutton(): Promise<void> {
    await this.newwindowbutton.click();
  }
}
