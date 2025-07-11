import { expect, Locator, Page } from "@playwright/test";
import { getElement } from "./elements-helper";
import { globalConfig } from "..";

export const typeInput = async (page: Page, input: string, inputFieldKey: string): Promise<Locator> => {
    const inputField: Locator = await getElement(page, inputFieldKey, globalConfig)
    await inputField.fill(input)

    return inputField;
};

export const clickButton = async (page: Page, buttonKey: string): Promise<void> => {
    const button: Locator = await getElement(page, buttonKey, globalConfig)
    await button.click();
}

export const clearInput = async (page: Page, inputFieldKey: string): Promise<Locator> => {
    const inputField: Locator = await getElement(page, inputFieldKey, globalConfig)
    inputField.clear();

    return inputField
}

export const getElementTag = async (page: Page, elementKey: string): Promise<string> => {
    const field: Locator = await getElement(page, elementKey, globalConfig)
    const tagName = await field.evaluate(el => el.tagName.toLowerCase());

    return tagName
}

export const fillForm = async (page: Page, data: Record<any, any>): Promise<void> => {
    for (const [fieldName, value] of Object.entries(data)) {
        const field: Locator = await getElement(page, fieldName, globalConfig)
        const tagName = await getElementTag(page, fieldName)

        switch (tagName) {
            case "input": await field.fill(value.toString()); break;
            case "select": await field.selectOption(value.toString()); break;
            default: break
        }
    }
}

export const formSubmission = async (
    page: Page,
    formData: Record<any, any>,
    submitButtonKey: string,
) => {
    // Fills form with given info
    await fillForm(page, formData)

    // Submits form
    await clickButton(page, submitButtonKey)
}

// Helper function to omit a dynamic key
export const omit = (obj: Record<any, any>, keyToRemove: string): Record<any, any> => {
    const { [keyToRemove]: _, ...rest } = obj;

    return rest;
}

// Creates all different versions of the object 
// full, and missing each one of it's properties- one at a time
export const createPartialObjectVersions = (obj: Record<any, any>)
    : { missing: string, data: { [x: string]: any }, isFullInfo: boolean }[] => {
    let versions: {
        missing: string,
        data: { [x: string]: any },
        isFullInfo: boolean
    }[] = [{
        missing: "none",
        data: obj,
        isFullInfo: true
    }];

    for (const field of Object.keys(obj)) {
        versions.push({
            missing: field,
            data: omit(obj, field),
            isFullInfo: false
        });
    }

    return versions
}