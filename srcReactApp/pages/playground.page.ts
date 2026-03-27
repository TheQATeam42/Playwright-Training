import { Page, Locator, FrameLocator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Autocomplete from "../components/autocomplete.component";
import Switch from "../components/switch.component";
import Table from "../components/table.component";

export default class Playground extends BasePage {
  readonly autocomplete: Autocomplete;
  readonly switches: Switch;
  readonly table: Table;

  readonly openTabLink: Locator;
  readonly openWindowButton: Locator;
  readonly iframe: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.autocomplete = new Autocomplete(page);
    this.switches = new Switch(page);
    this.table = new Table(page);
    this.openTabLink = page.locator('[data-id="new-tab-button"]');
    this.openWindowButton = page.locator('[data-id="open-window-button"]');
    this.iframe = page.frameLocator("#basic-iframe");
  }
}
