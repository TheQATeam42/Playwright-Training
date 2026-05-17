import { Locator } from "playwright";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";
import { DessertModel } from "../models/dessert.model";
import { expect } from "playwright/test";

/**
 * Represents a table row in the dessert table.
 * This component is used to interact with the elements in each row.
 */
export class DessertTableRow extends BaseComponent {
  /**
   * The name of the dessert.
   */
  readonly nameCol: Locator;

  /**
   * The amount of calories in the dessert (in grams).
   */
  readonly caloriesCol: Locator;

  /**
   * The amount of fat in the dessert (in grams).
   */
  readonly fatCol: Locator;

  /**
   * The amount of carbs in the dessert (in grams).
   */
  readonly carbsCol: Locator;

  /**
   * The amount of protein in the dessert (in grams).
   */
  readonly proteinCol: Locator;

  constructor(root: Locator) {
    super(root);

    this.nameCol = root.locator("th");
    this.caloriesCol = root.locator("td").nth(0);
    this.fatCol = root.locator("td").nth(1);
    this.carbsCol = root.locator("td").nth(2);
    this.proteinCol = root.locator("td").nth(3);
  }

  /**
   * Validate that a row contains the data expected.
   * @param expectedDessert the values expected for each element in the row.
   */
  async validateRow(expectedDessert: DessertModel): Promise<void> {
    // Validate that the elements exist.
    expect(this.nameCol).toHaveCount(1);
    expect(this.caloriesCol).toHaveCount(1);
    expect(this.fatCol).toHaveCount(1);
    expect(this.carbsCol).toHaveCount(1);
    expect(this.proteinCol).toHaveCount(1);

    // Validate that the elements have the right values.
    expect(this.nameCol).toHaveText(expectedDessert.name);
    expect(this.caloriesCol).toHaveText(expectedDessert.calories);
    expect(this.fatCol).toHaveText(expectedDessert.fat);
    expect(this.carbsCol).toHaveText(expectedDessert.carbs);
    expect(this.proteinCol).toHaveText(expectedDessert.protein);
  }
}
