import { Locator } from "playwright";

/**
 * Abstract base class for reusable UI components.
 * Holds a root locator to allow locator functionality while enforcing the components scope.
 * @abstract
 * @class BaseComponent
 */
export default abstract class BaseComponent {
  constructor(protected readonly root: Locator) {}
}
