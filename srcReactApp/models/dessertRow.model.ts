export class DessertRow {
  constructor(
    public name: string,
    public calories: number,
    public fat: number,
    public carbs: number,
    public protein: number
  ) {}
}

export const expectedTableData: DessertRow[] = [
  new DessertRow("Frozen yoghurt",     159, 6,    24, 4),
  new DessertRow("Ice cream sandwich", 237, 9,    37, 4.3),
  new DessertRow("Eclair",             262, 16,   24, 6),
  new DessertRow("Cupcake",            305, 3.7,  67, 4.3),
  new DessertRow("Gingerbread",        356, 16,   49, 3.9),
];
