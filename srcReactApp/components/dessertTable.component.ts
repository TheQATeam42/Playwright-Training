import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";
import { Dessert } from "../../sharedFiles/modals/dessert.model";

/**
 * Represents the Dessert/Nutrition Table on the Playground page.
 * Provides locators and a helper to read row data as a Dessert object.
 *
 * @extends BaseComponent
 */
export default class DessertTableComponent extends BaseComponent {
  /** All `<tbody>` row locators of the nutrition table */
  public readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.tableRows = page.getByTestId("basic-table").locator("tbody tr");
  }

  /**
   * Reads all cells from the row at the given index and returns a {@link Dessert}.
   * @param index - Zero-based row index
   * @returns A Dessert object populated with the row's name, calories, fat, carbs, and protein
   */
  async getTableRowData(index: number): Promise<Dessert> {
    const row = this.tableRows.nth(index);
    const name = (await row.locator("th").textContent()) ?? "";
    const calories = parseFloat(
      (await row.locator("td").nth(0).textContent()) ?? "0"
    );
    const fat = parseFloat(
      (await row.locator("td").nth(1).textContent()) ?? "0"
    );
    const carbs = parseFloat(
      (await row.locator("td").nth(2).textContent()) ?? "0"
    );
    const protein = parseFloat(
      (await row.locator("td").nth(3).textContent()) ?? "0"
    );
    return new Dessert(name, calories, fat, carbs, protein);
  }
}
