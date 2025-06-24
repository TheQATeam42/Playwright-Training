import {Locator} from "playwright/test"

export const checkSwitchDisabledByClick = async (switchToCheck: Locator): Promise<boolean> => {
    const checkedBefore: boolean = await switchToCheck.isChecked()
    try {
        await switchToCheck.click({timeout: 500})
    }
    catch {
        return true
    }
    const checkedAfter: boolean = await switchToCheck.isChecked()

    return checkedBefore === checkedAfter
}
