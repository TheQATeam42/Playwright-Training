import { expect, Locator } from "playwright/test";
import Contact from "../../types/Types/Contact";

export const expectContactToBe = async (
  contactLocator: Locator,
  expectedContact: Contact
): Promise<void> => {
  await expect(contactLocator.getByTestId("name")).toHaveText(
    expectedContact.name
  );
  await expect(contactLocator.getByTestId("gender")).toHaveText(
    expectedContact.gender
  );
  await expect(contactLocator.getByTestId("address")).toHaveText(
    expectedContact.address.ToString()
  );
};
