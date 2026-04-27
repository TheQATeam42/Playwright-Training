import { Page, Locator, FrameLocator } from "@playwright/test";
import BasePage from "../../sharedFiles/pages/basePage.page";
import Contact from "../components/contact.component";

/**
 * Represents the contacts list page of the application.
 * This class provides methods and properties to interact with the contacts elements.
 *
 * @extends BasePage
 * @param {Page} page - The Playwright Page object representing the current page.
 */
export default class Contacts extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  get iframe(): FrameLocator {
    return this.page.frameLocator("#basic-iframe");
  }

  get contactList(): Locator {
    return this.page.locator(".ContactList");
  }
  get createContactButton(): Locator {
    return this.page.getByTestId("add-button");
  }

  get contacts(): Locator {
    return this.contactList.locator("[data-id='contact']");
  }

  get nameInput(): Locator {
    return this.page.getByTestId("name");
    
  }
  get createContactTitle(): Locator {
  return this.page.getByTestId("create-contact-header");
}
get phoneInput(): Locator {
  return this.page.getByTestId("phone");
}
get streetInput(): Locator {
  return this.page.getByTestId("street");
}
get cityInput(): Locator {
  return this.page.getByTestId("city");
}
get saveButton(): Locator {
  return this.page.getByTestId("save-button");
}
get genderInput(): Locator {
  return this.page.getByTestId("gender");
}
get errormassge() : Locator {
    return this.page.getByTestId("error-message");
}
get palygroundbutton(): Locator {
  return this.page.getByTestId("playground-button");
}
get AutocompleteComboBoxid(): Locator {
  return this.page.locator('#movies-input');
}
get selectmovie() : Locator {
  return  this.page.locator('[title="Open"]');
}
get swichworks() : Locator {
  return this.page.getByTestId("switch-one");
}
get swich2() : Locator {
  return this.page.getByTestId("switch-two");
}
get tableRows(): Locator {
  return this.page.getByTestId("basic-table").locator("tbody tr");
}
get newwindowbutton(): Locator {
  return this.page.getByTestId("open-window-button");
}
get iframeSearchInput(): Locator {
  return this.iframe.getByTestId("search");
}
get iframeContactList(): Locator {
  return this.iframe.locator(".ContactList");  
}
get iframeCreateContactTitle(): Locator {
  return this.iframe.getByTestId("create-contact-header");  
}
async isIframeSearchBarVisible(): Promise<boolean> {
  return this.iframeSearchInput.isVisible();
}
async  newcontactbottonclick(): Promise<void> {
  await this.iframe.getByTestId("add-button").click();
}


async getErrorMessageText(): Promise<string> {  
  return (await this.errormassge.textContent()) ?? "";
}
  getContactByName(name: string): Locator {
    return this.contacts.filter({ hasText: name });
  }
  isContactInList(name: string): Promise<boolean> {
    return this.getContactByName(name).first().isVisible();
  }
  getContactByIndex(index: number): Locator {
    return this.contacts.nth(index);
  }
  getContactCount(): Promise<number> {
    return this.contacts.count();
  } 
  async getContactNameByIndex(index: number): Promise<string> {
    return (await this.getContactByIndex(index).getByTestId("name").textContent()) ?? "";
  }
  issearchResultEmpty(): Promise<boolean> {
    return this.page.getByTestId("no-search-result").isVisible();
  }
  async searchContacts(query: string): Promise<void> {
    const searchInput = this.page.getByTestId("search");
    await searchInput.fill(query);
  }
  async getRandomContactName(): Promise<string> {
    const count = await this.getContactCount();
    const randomIndex = Math.floor(Math.random() * count);
    return await this.getContactNameByIndex(randomIndex);
  }
  async createContactButtonClick(): Promise<void> {
    await this.createContactButton.click();
  }
  getContactComponentByIndex(index: number): Contact {
    const contactLocator = this.getContactByIndex(index);
    return new Contact(this.page, contactLocator);
  }
  issherachbarVisible(): Promise<boolean> {
    return this.page.getByTestId("search").isVisible();
  }
  async fillContactForm(name: string, gender: string, phone: string, street: string, city: string): Promise<void> {
  await this.nameInput.fill(name);
  await this.genderInput.selectOption(gender);  
  await this.phoneInput.fill(phone);
  await this.streetInput.fill(street);
  await this.cityInput.fill(city);
}
async saveContact(): Promise<void> {
  await this.saveButton.click();
}
async clickPlaygroundButton(): Promise<void> {
  await this.palygroundbutton.click();
}
async selectMovie(movie: string): Promise<void> {
  await this.AutocompleteComboBoxid.fill(movie);
  await this.page.getByRole("option", { name: movie , exact : true }).click();
}
async clearSearch(): Promise<void> {
   await this.page.locator('[title="Clear"]').click();

}
async selectMovieByIndex(index: number): Promise<void> {
  await this.selectmovie.click();
  await this.page.getByRole('option').nth(index).click();
}
async getselectedmovie(): Promise<string> {
       return (await this.AutocompleteComboBoxid.inputValue()) ?? "";

}
async clickswich(): Promise<void> { 
  return this.swichworks.click();
}
isswichon(): Promise<boolean> {
  return this.swichworks.isChecked();
} 
isswichon2() : Promise<boolean>
{
  return this.swich2.isChecked();

}
async getTableRowData(index: number): Promise<{ name: string, calories: number, fat: number, carbs: number, protein: number }> {
  const row = this.tableRows.nth(index);
  const name     = (await row.locator("th").textContent()) ?? "";
  const calories = parseFloat((await row.locator("td").nth(0).textContent()) ?? "0");
  const fat      = parseFloat((await row.locator("td").nth(1).textContent()) ?? "0");
  const carbs    = parseFloat((await row.locator("td").nth(2).textContent()) ?? "0");
  const protein  = parseFloat((await row.locator("td").nth(3).textContent()) ?? "0");
  return { name, calories, fat, carbs, protein };
}
async windowbutton() : Promise<void> {
  await this.newwindowbutton.click();
}

  
}
