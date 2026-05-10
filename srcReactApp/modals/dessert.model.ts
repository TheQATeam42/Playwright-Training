/**
 * Represents a single dessert row in the Nutrition table on the Playground page.
 */
export class Dessert {
  /**
   * @param name     - Display name of the dessert (e.g. "Cupcake")
   * @param calories - Calorie count
   * @param fat      - Fat content in grams
   * @param carbs    - Carbohydrate content in grams
   * @param protein  - Protein content in grams
   */
  constructor(
    public name: string,
    public calories: number,
    public fat: number,
    public carbs: number,
    public protein: number
  ) {}
}
