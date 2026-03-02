import { Locator, Page } from "playwright/test";

export const getSearchBarLocator = (page: Page): Locator => {
  return page.getByTestId("search");
};

export const clearSearchBar = async (
  searchBarLocator: Locator
): Promise<void> => {
  await searchBarLocator.fill("");
};

export const getAllContactsLocator = (page: Page): Locator => {
  return page.getByTestId("contact");
};

export const getSpecificContactLocatorFromAllContacts = (
  allContactsLocator: Locator,
  nameOfUser: string
): Locator => {
  return allContactsLocator.filter({
    hasText: nameOfUser,
  });
};

export const getSpecificContactLocator = (
  page: Page,
  nameOfUser: string
): Locator => {
  const allContacts: Locator = getAllContactsLocator(page);
  return getSpecificContactLocatorFromAllContacts(allContacts, nameOfUser);
};
