import { Dialog, expect, Locator } from "@playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

/**
 * Contact List - Search & Delete Behavior
 */

const contactsListTest = reactAppTest.extend({});

contactsListTest(
  "Search contact, delete it, verify removal and restore after refresh",
  async ({ page }): Promise<void> => {
    // ---------------------------
    // 1️⃣ Make sure search bar is visible
    // ---------------------------
    const searchBar: Locator = page.locator('[data-id="search"]');
    await expect(searchBar).toBeVisible();

    // ---------------------------
    // 2️⃣ Get random existing contact
    // ---------------------------
    const contactCards: Locator = page.locator('[data-id="contact"]');
    const totalContacts: number = await contactCards.count();

    expect(totalContacts).toBeGreaterThan(0);

    const randomIndex: number = Math.floor(Math.random() * totalContacts);
    const randomContact: Locator = contactCards.nth(randomIndex);

    const fullName: string = await randomContact
      .locator('[data-id="name"]')
      .innerText();

    const gender: string = await randomContact
      .locator('[data-id="gender"]')
      .innerText();

    const address: string = await randomContact
      .locator('[data-id="address"]')
      .innerText();

    // ---------------------------
    // 3️⃣ Search for that contact
    // ---------------------------
    await searchBar.fill(fullName);

    // After filtering only 1 contact should remain
    await expect(contactCards).toHaveCount(1);

    const filteredCard: Locator = contactCards.first();

    // ---------------------------
    // 4️⃣ Validate contact details
    // ---------------------------
    await expect(filteredCard.locator('[data-id="name"]')).toHaveText(fullName);

    await expect(filteredCard.locator('[data-id="gender"]')).toHaveText(gender);

    await expect(filteredCard.locator('[data-id="address"]')).toHaveText(
      address
    );

    // ---------------------------
    // 5️⃣ Delete the contact (handle native alert)
    // ---------------------------
    page.once("dialog", async (dialog: Dialog): Promise<void> => {
      await dialog.accept();
    });

    await filteredCard.locator('[data-id="delete-button"]').click();

    // ---------------------------
    // 6️⃣ Verify contact removed from UI
    // ---------------------------
    await expect(page.locator('[data-id="contact"]')).toHaveCount(0);

    // ---------------------------
    // 7️⃣ Refresh page
    // ---------------------------
    await page.reload();

    // ---------------------------
    // 8️⃣ Verify contact appears again
    // ---------------------------
    const restoredContact: Locator = page
      .locator('[data-id="contact"]')
      .filter({
        has: page.locator('[data-id="name"]', { hasText: fullName }),
      });

    await expect(restoredContact).toHaveCount(1);
  }
);
