import { Locator, Page } from "playwright";
import Contact from "../types/Types/Contact";

class CreateContactPage {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveButton = page.getByRole("button", {
      name: "Save",
    });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
    });
    this.form = page.locator("form");
  }

  async fillForm(contact: Contact): Promise<void> {
    await this.form.getByTestId("name").fill(contact.name);
    await this.form.getByTestId("gender").selectOption(contact.gender);
    await this.form.getByTestId("phone").fill(contact.phone!);
    await this.form.getByTestId("street").fill(contact.address.street);
    await this.form.getByTestId("city").fill(contact.address.city);
  }
}

export default CreateContactPage;
