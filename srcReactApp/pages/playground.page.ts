import { Page, Locator, FrameLocator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";

export default class PlaygroundPage extends BasePage {
  public readonly movieInput: Locator;
  public readonly movieDropdown: Locator;
  public readonly clearButton: Locator;
  public readonly switchOne: Locator;
  public readonly switchTwo: Locator;
  public readonly tableRows: Locator;
  public readonly newWindowButton: Locator;
  public readonly iframe: FrameLocator;
  public readonly iframeSearchInput: Locator;
  public readonly iframeContactList: Locator;
  public readonly iframeCreateContactTitle: Locator;
  public readonly iframeAddButton: Locator;

  constructor(page: Page) {
    super(page);
    this.movieInput            = page.locator('#movies-input');
    this.movieDropdown         = page.locator('[title="Open"]');
    this.clearButton           = page.locator('[title="Clear"]');
    this.switchOne             = page.getByTestId("switch-one");
    this.switchTwo             = page.getByTestId("switch-two");
    this.tableRows             = page.getByTestId("basic-table").locator("tbody tr");
    this.newWindowButton       = page.getByTestId("open-window-button");
    this.iframe                = page.frameLocator("#basic-iframe");
    this.iframeSearchInput     = this.iframe.getByTestId("search");
    this.iframeContactList     = this.iframe.locator(".ContactList");
    this.iframeCreateContactTitle = this.iframe.getByTestId("create-contact-header");
    this.iframeAddButton       = this.iframe.getByTestId("add-button");
  }

  async selectMovie(movie: string): Promise<void> {
    await this.movieInput.fill(movie);
    await this.page.getByRole("option", { name: movie, exact: true }).click();
  }
  async selectMovieByIndex(index: number): Promise<void> {
    await this.movieDropdown.click();
    await this.page.getByRole('option').nth(index).click();
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
}
