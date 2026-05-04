import { ContactData, Gender } from "../../sharedFiles/modals/contact.model";

/**
 * Shared base fields used by all phone-validation tests.
 * Only the `phone` field changes between those tests.
 */
const basePhoneTestData: Omit<ContactData, "phone"> = {
  name: "TestName",
  gender: Gender.Male,
  street: "test street",
  city: "test city",
};

/**
 * Test data for each new-contact test scenario.
 */
export const newContactData = {
  /** Valid contact — used for the happy-path create/search/delete test */
  valid: (name: string): ContactData => ({
    name,
    gender: Gender.Male,
    phone: "123456789",
    street: "test street",
    city: "test city",
  }),
};

/**
 * Base data with all valid fields — used to build empty-field test cases.
 * Only one field is overridden to "" per entry.
 */
const baseValidData: ContactData = {
  name: "TestName",
  gender: Gender.Male,
  phone: "123456789",
  street: "test street",
  city: "test city",
};

/**
 * Empty-field test cases — one per required text field.
 * Each entry leaves only that field blank; all others are valid.
 */
export const emptyFieldTestCases: Array<{
  description: string;
  data: ContactData;
  errorMessage: string;
}> = [
  {
    description: "empty name",
    data: { ...baseValidData, name: "" },
    errorMessage: 'Error: The "name" field can\'t be empty.',
  },
  {
    description: "empty phone",
    data: { ...baseValidData, phone: "" },
    errorMessage: 'Error: The "phone" field can\'t be empty.',
  },
  {
    description: "empty street",
    data: { ...baseValidData, street: "" },
    errorMessage: 'Error: The "street" field can\'t be empty.',
  },
  {
    description: "empty city",
    data: { ...baseValidData, city: "" },
    errorMessage: 'Error: The "city" field can\'t be empty.',
  },
];

/**
 * Negative phone-field test cases.
 * Each entry has a human-readable description and invalid ContactData.
 */
export const invalidPhoneTestCases: Array<{
  description: string;
  data: ContactData;
}> = [
  {
    description: "alphabetic characters",
    data: { ...basePhoneTestData, phone: "wer" },
  },
  {
    description: "negative number",
    data: { ...basePhoneTestData, phone: "-1244334323" },
  },
  {
    description: "special characters",
    data: { ...basePhoneTestData, phone: "!@######$%$#@!$%$" },
  },
];
