import { Page, Locator } from "@playwright/test";
import { globalConfig } from "../../index";
import { getElement } from "../../support/elements-helper";
import { User } from "../models/user";

type ContactField = keyof User;

/**
 * Verifies a specific field of a contact matches the expected value on the page.
 * @param page The Playwright page object
 * @param fieldName The name of the contact field to verify
 * @param expectedValue The expected value to match
 * @param elementKey The key for the element to check (defaults to fieldName)
 * @returns True if the field matches the expected value, false otherwise
 */
export const verifyContactField = async (
  page: Page,
  fieldName: ContactField,
  expectedValue: string,
  elementKey: string = fieldName // Default to using the field name as the element key
): Promise<boolean> => {
  const element: Locator = await getElement(page, elementKey, globalConfig);
  const textContent = await element.textContent();
  if (textContent === null) {
    console.error(
      `Field '${fieldName}' with element key '${elementKey}' not found or has no text.`
    );
    return false;
  }
  return textContent.includes(expectedValue);
};

/**
 * Verifies all fields of a contact match the expected user data on the page.
 * @param page The Playwright page object
 * @param user The user data to verify
 * @param fieldMappings Optional mapping of contact fields to element keys
 * @returns True if all fields match, false otherwise
 */
export const verifyContactDetails = async (
  page: Page,
  user: User,
  fieldMappings: Record<ContactField, string> = {
    name: "full name",
    gender: "gender",
    address: "address",
  }
): Promise<boolean> => {
  const fields: ContactField[] = Object.keys(user) as ContactField[];

  for (const field of fields) {
    const isVerified = await verifyContactField(
      page,
      field,
      user[field],
      fieldMappings[field]
    );
    if (!isVerified) {
      const element: Locator = await getElement(page, fieldMappings[field], globalConfig);
      const actualValue = await element.textContent();
      console.error(`Verification failed for field: ${field}. Expected to find "${user[field]}", but found "${actualValue}"`);
      return false;
    }
  }
  return true;
}; 