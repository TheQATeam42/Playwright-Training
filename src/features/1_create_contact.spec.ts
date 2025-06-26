import { User } from "../common/models/user";
import { UserToCreate } from "../common/models/user-to-create";
import { Gender } from "../common/models/gender";
import {
  createContact,
  verifyContactCreation,
  fillContactForm,
  openCreateDialog,
  saveContact,
  getErrorMessage,
  removeFieldFromUser,
} from "../steps/create-contact-steps";
import { Page } from "playwright";
import { test } from "../setup/hooks";
import { getContactList, searchContact } from "../steps/contact-steps";
import { expect } from "playwright/test";
import { getElement } from "../support/elements-helper";
import { globalConfig } from "..";

const user: UserToCreate = {
  name: "Tomer ginat",
  phone: "0525381648",
  gender: Gender.Male,
  street: "drive in",
  city: "Tel Aviv",
};

const fieldsNotToCheck: string[] = ["gender"];

const checkMissingField = async (
  page: Page,
  fieldToOmit: keyof UserToCreate
): Promise<void> => {
  await fillContactForm(page, removeFieldFromUser(user, fieldToOmit));
  await saveContact(page);

  const errorMessage: string = await getErrorMessage(page);
  expect(errorMessage).toBe(
    `Error: The "${fieldToOmit}" field can't be empty.`
  );
};

test.describe("create contact", async () => {
  test("should create a new contact with all required fields", async ({
    page,
  }) => {
    await createContact(page, user);
    await searchContact(page, user.name);
    const isVerified = await verifyContactCreation(page, user);
    expect(isVerified).toBeTruthy();
  });
});

test.describe("Negative Tests", () => {
  (Object.keys(user) as (keyof UserToCreate)[])
    .filter((key) => !fieldsNotToCheck.includes(key))
    .forEach((key) => {
      test(`fill contact without ${key}`, async ({ page }) => {
        await openCreateDialog(page);
        await checkMissingField(page, key);
      });
    });

  test("should not create a contact when cancel is clicked", async ({
    page,
  }) => {
    await openCreateDialog(page);
    await fillContactForm(page, user);

    const cancelButton = await getElement(page, "cancel", globalConfig);
    await cancelButton.click();

    await searchContact(page, user.name);
    expect((await getContactList(page)).length).toBe(0);
  });
});
