import { expect } from "playwright/test";
import { globalConfig } from "../index";
import { Locator } from "@playwright/test";
import { test } from "../setup/hooks";
import getUserByName from "../data-sources/services/usersFetcher";
import { User } from "../common/models/user";
import {
  searchContact,
  getContactList,
  deleteContact,
  clearSearch,
} from "../steps/contact-steps";
import { verifyContactDetails } from "../common/helpers/contact-verification-helper";

const user: User = getUserByName("Alea Nieves");

test.describe("Home Page - Contact Details", () => {
  test.beforeEach(async ({ page }) => {
    await searchContact(page, user.name);
  });

  test("should display correct contact details", async ({ page }) => {
    const isVerified: boolean = await verifyContactDetails(page, user)
    expect(isVerified).toBeTruthy();
  });

  test("should display only one contact", async ({ page }) => {
    const contactList = await getContactList(page);
    expect(
      contactList.length,
      "Contact list should contain only one contact"
    ).toBe(1);
  });

  test("delete contact", async ({ page }) => {
    await deleteContact(page, user.name);
    await clearSearch(page);
    await searchContact(page, user.name);

    const contactList = await getContactList(page);
    expect(contactList.length, "Contact list should be empty").toBe(0);
  });
});
