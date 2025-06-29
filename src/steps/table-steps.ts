import {expect, Locator} from "playwright/test"
import {expectedTable} from "../support/table-helper"
import {sanitizeText} from "../support/text-helper"

export const checkTableRowsCount = (table: Locator): void => {
    const observedRows: Locator = table.locator("tr")
    expect(observedRows).toHaveCount(expectedTable.dataRows.length + 1) // +1 for header row
}

export const checkTableHeaderRow = async (table: Locator): Promise<void> => {
    const observedRows: Locator = table.locator("tr")
    const observedHeaderRow: string[] = (await observedRows.nth(0).locator("th").allInnerTexts())
        .map(k => sanitizeText(k))
    expect(expectedTable.headerRow).toEqual(observedHeaderRow)
}

export const checkTableDataRows = async (table: Locator): Promise<void> => {
    const observedRows: Locator = table.locator("tr")
    
    expectedTable.dataRows.forEach(async (row, index): Promise<void> => {
        const expectedRowHeader: string = row.header
        const tableRow: Locator = observedRows.nth(index + 1)
        
        const observedRowHeader: string = await tableRow.locator("th").innerText()
        expect(observedRowHeader).toBe(expectedRowHeader)

        const observedRowData: string[] = (await tableRow.locator("td").allInnerTexts()).map(k => sanitizeText(k))
        expect(row.data).toEqual(observedRowData)
    })
}
