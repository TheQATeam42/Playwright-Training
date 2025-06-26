import { Locator, Page } from "playwright";
import { globalConfig } from "..";
import { fillField } from "../common/helpers/elements-helper";
import { getElement } from "../support/elements-helper";
import { UserToCreate } from "../common/models/user-to-create";
import { verifyContactDetails } from "../common/helpers/contact-verification-helper";
import { convertUserToCreateToUser } from "../common/helpers/userConverter";

/**
 * Fills the contact form fields with the provided user data.
 * Only fills fields that are defined in the user object.
 * @param page The Playwright page object
 * @param user Partial user data to fill in the form
 */
export const fillContactForm = async (
  page: Page,
  user: Partial<UserToCreate>
) => {
  if (user.name !== undefined) await fillName(page, user.name);
  if (user.gender !== undefined)
    await selectGender(page, user.gender.toString());
  if (user.phone !== undefined) await fillPhone(page, user.phone);
  if (user.street !== undefined) await fillStreet(page, user.street);
  if (user.city !== undefined) await fillCity(page, user.city);
};

export const createContact = async (page: Page, user: UserToCreate) => {
  await openCreateDialog(page);
  await fillContactForm(page, user);
  await saveContact(page);
};

/**
 * Opens the create contact dialog by clicking the create button.
 * @param page The Playwright page object
 */
export const openCreateDialog = async (page: Page) => {
  const createButton = await getElement(page, "create button", globalConfig);
  await createButton.click();
};

/**
 * Fills the name field in the contact form.
 * @param page The Playwright page object
 * @param contactName The name to fill in
 */
export const fillName = async (page: Page, contactName: string) => {
  await fillField(page, "name", contactName, globalConfig);
};

/**
 * Selects the gender option in the contact form.
 * @param page The Playwright page object
 * @param gender The gender value to select
 */
export const selectGender = async (page: Page, gender: string) => {
  console.log(`selection option ${gender}`);

  const genderInput: Locator = await getElement(page, "gender", globalConfig);
  await genderInput.selectOption(gender);
};

/**
 * Fills the phone field in the contact form.
 * @param page The Playwright page object
 * @param phoneNumber The phone number to fill in
 */
export const fillPhone = async (page: Page, phoneNumber: string) => {
  await fillField(page, "phone", phoneNumber, globalConfig);
};

/**
 * Fills the street field in the contact form.
 * @param page The Playwright page object
 * @param street The street value to fill in
 */
export const fillStreet = async (page: Page, street: string) => {
  await fillField(page, "street", street, globalConfig);
};

/**
 * Fills the city field in the contact form.
 * @param page The Playwright page object
 * @param city The city value to fill in
 */
export const fillCity = async (page: Page, city: string) => {
  await fillField(page, "city", city, globalConfig);
};

/**
 * Clicks the save button to save the contact.
 * @param page The Playwright page object
 */
export const saveContact = async (page: Page) => {
  const saveButton = await getElement(page, "save", globalConfig);
  await saveButton.click();
};

/**
 * Verifies that the contact was created by checking the details on the page.
 * @param page The Playwright page object
 * @param user The user data to verify
 * @returns True if the contact details match, false otherwise
 */
export const verifyContactCreation = async (page: Page, user: UserToCreate) => {
  const isVerified = await verifyContactDetails(
    page,
    convertUserToCreateToUser(user)
  );
  return isVerified;
};

/**
 * Retrieves the error message displayed on the page.
 * @param page The Playwright page object
 * @returns The error message text
 */
export const getErrorMessage = async (page: Page): Promise<string> => {
  const errorMessage: Locator = await getElement(
    page,
    "error message",
    globalConfig
  );
  return await errorMessage.innerText();
};

/**
 * Returns a copy of the user object with the specified field omitted.
 * @param user The user object to copy
 * @param keyToOmit The key of the field to omit
 * @returns A new user object without the omitted field
 */
export const removeFieldFromUser = (
  user: Partial<UserToCreate>,
  keyToOmit: keyof UserToCreate
): Partial<UserToCreate> => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== keyToOmit)
  ) as Partial<UserToCreate>;
};
