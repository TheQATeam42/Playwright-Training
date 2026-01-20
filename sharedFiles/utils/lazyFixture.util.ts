import { Page } from "playwright";

/**
 * Creates a lazy-loaded fixture for Playwright tests.
 *
 * @template T - The type of the page object class instance.
 * @param pageClass - A constructor function that creates an instance of type T, accepting a Playwright Page object.
 * @returns A fixture function compatible with Playwright's test framework that lazily initializes the page class instance on first access.
 *
 * @remarks
 * The fixture uses lazy initialization to defer instantiation of the page class until it's actually accessed.
 * This can improve test performance by avoiding unnecessary object creation.
 */
function lazyFixture<T>(
  pageClass: new (page: Page) => T
): ({ page }: { page: Page }, use: (getter: () => T) => void) => void {
  return ({ page }, use) => {
    let instance: T | null = null;

    const lazyInstance = () => {
      if (!instance) {
        instance = new pageClass(page);
      }
      return instance;
    };

    use(lazyInstance);
  };
}

export default lazyFixture;
