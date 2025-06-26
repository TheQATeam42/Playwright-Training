import { Page, Locator } from "playwright";
import { globalConfig } from "../..";
import { getElement } from "../../support/elements-helper";

export const selectAutocompleteComboBoxOptionByIndex = async (
  page: Page,
  comboboxIdentifier: string,
  index: number
) => {
  const comboBoxOptionsList: Locator = await getElement(
    page,
    comboboxIdentifier,
    globalConfig
  );

  const options: Locator[] = await comboBoxOptionsList
    .getByRole("option")
    .all();
  await options[index].click();
};

export const selectAutocompleteComboBoxOption = async (
    page: Page,
    comboboxIdentifier: string,
    option: string
  ) => {
    const comboBoxOptionsList = await getElement(page, comboboxIdentifier, globalConfig);
    const options = await comboBoxOptionsList.getByRole("option").all();
  
    for (const loc of options) {
      const text = await loc.innerText();
      if (text === option) {
        await loc.click();
        return;
      }
    }
  
    throw new Error(`Option "${option}" not found in combobox "${comboboxIdentifier}"`);
  };
  
