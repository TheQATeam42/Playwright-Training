import { FrameLocator, Locator, Page } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import MovieAutocompleteComponent from "../components/movieAutocomplete.component";
import SwitchGroupComponent from "../components/switchGroup.component";
import DessertTableComponent from "../components/dessertTable.component";
import NewWindowComponent from "../components/newWindow.component";
import PlaygroundIframeComponent from "../components/playgroundIframe.component";

/**
 * Page object for the Playground page.
 *
 * Composes all playground UI sections as dedicated child components,
 * keeping the page object slim and each element group self-contained.
 *
 * @property movieAutocomplete - Movie search autocomplete widget
 * @property switchGroup       - Toggle switches (switch-one / switch-two)
 * @property dessertTable      - Nutrition data table with row-read helpers
 * @property newWindow         - Button that opens an external URL in a new tab
 * @property iframeSection     - Embedded iframe with its own contacts mini-app
 *
 * @extends BasePage
 */
export default class PlaygroundPage extends BasePage {
  /**
   * Navigation button (visible in the app header) that navigates to this Playground page.
   * Accessed before the playground page is loaded, e.g. from the contacts list.
   */
  public readonly playgroundButton: Locator;
  /** Movie search autocomplete widget */
  public readonly movieAutocomplete: MovieAutocompleteComponent;
  /** Toggle switches section */
  public readonly switchGroup: SwitchGroupComponent;
  /** Nutrition/dessert data table with row-read helpers */
  public readonly dessertTable: DessertTableComponent;
  /** Button that opens an external URL in a new tab */
  public readonly newWindow: NewWindowComponent;
  /** Embedded iframe containing a mini contacts application */
  public readonly iframeSection: PlaygroundIframeComponent;

  constructor(page: Page) {
    super(page);
    this.playgroundButton = page.getByTestId("playground-button");
    const frame: FrameLocator = page.frameLocator("#basic-iframe");
    this.movieAutocomplete = new MovieAutocompleteComponent(page);
    this.switchGroup = new SwitchGroupComponent(page);
    this.dessertTable = new DessertTableComponent(page);
    this.newWindow = new NewWindowComponent(page);
    this.iframeSection = new PlaygroundIframeComponent(page, frame);
  }
}
