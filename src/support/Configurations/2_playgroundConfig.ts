import { Range } from "../Interfaces/Range"
import { Desert } from "../Objects/Desert"

// Buttons' or elements' keys
export const elementsKeys = {
    autoCompleteComboBoxInput: "autoCompleteComboBoxInput",
    autoCompleteComboBoxCloseIcon: "autoCompleteComboBoxCloseIcon",
    checkBox: "checkBox",
    switch: "switch",
    table: "table",
    tableRow: "tableRow",
    tableCell: "tableCell"
}

export const testedMovieName: string = "The Godfather: Part II"
export const pageName: string = "playground"
export const checkboxesIndexes: Range = { firstIndex: 2, lastIndex: 6 }

const frozenYoghurt: Desert = new Desert("Frozen yoghurt", 159, 16, 24, 4);
const iceCreamSandwich: Desert = new Desert("Ice cream sandwich", 237, 9, 37, 4.3)
const eclair: Desert = new Desert("Eclair", 262, 16, 24, 6)
const cupcake: Desert = new Desert("Cupcake", 305, 3.7, 67, 4.3)
const gingerbread: Desert = new Desert("Gingerbread", 356, 16, 49, 3.9)

export const tableContent: Desert[] = [frozenYoghurt, iceCreamSandwich, eclair, cupcake, gingerbread]
