import {Locator} from "playwright/test"

/**
 * Checks whether a switch is functionally disabled by clicking on it.
 * @param switchToCheck 
 * @returns false if swicth changed state after clinking, true otherwise
 */
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
