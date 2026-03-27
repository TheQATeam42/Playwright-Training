import { Page, Locator } from "@playwright/test";
import BaseComponent from "../../sharedFiles/components/baseComponent.component";

export default class Table extends BaseComponent {
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    super(page);
    this.table = page.locator('[data-id="basic-table"]');
    this.rows = page.locator('[data-id="basic-table"] tbody tr');
  }
}
