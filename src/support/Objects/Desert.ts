export class Desert {
  private name: string
  private calories: number
  private fat: number // g
  private carbs: number // g
  private protein: number // g

  public constructor(name: string, calories: number, fat: number, carbs: number, protein: number) {
    this.name = name
    this.calories = calories
    this.fat = fat
    this.carbs = carbs
    this.protein = protein
  }

  public getName(): string {
    return this.name;
  }

  public getCalories(): number {
    return this.calories;
  }

  public getFat(): number {
    return this.fat;
  }

  public getCarbs(): number {
    return this.carbs;
  }

  public getProtein(): number {
    return this.protein;
  }

}
