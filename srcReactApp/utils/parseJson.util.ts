import fs from "fs";
import { join } from "path";
import Contact from "../types/Types/Contact";
import JsonTestsConfigs from "../types/Types/DTOs/JsonTestsConfigs";

export class TestConfigs {
  public readonly url?: string;
  public readonly contacts: {
    readonly ToDelete: Contact;
    readonly ToCreate: Contact;
  };
  public readonly titles: Record<string, string>;

  constructor(jsonPath: JsonTestsConfigs);
  constructor(jsonPath: string);
  constructor(jsonData: JsonTestsConfigs | string) {
    let rawData: JsonTestsConfigs;
    if (typeof jsonData === "string") {
      this.url = jsonData;
      rawData = JSON.parse(fs.readFileSync(jsonData, "utf-8"));
    } else {
      rawData = jsonData;
    }

    this.contacts = {
      ToDelete: Contact.fromJsonContact(rawData.Contacts.ToDelete),
      ToCreate: Contact.fromJsonContact(rawData.Contacts.ToCreate),
    };
    this.titles = rawData.Titles;
  }
}

export const testConfigs = new TestConfigs(
  join(__dirname, "..", "data", "testsconfigs.json")
);
