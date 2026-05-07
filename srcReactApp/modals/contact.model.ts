/**
 * Available gender options for the contact form dropdown.
 */
export enum Gender {
  Male = "Male",
  Female = "Female",
}

/**
 * Represents the data required to fill in the New Contact form.
 */
export interface ContactData {
  name: string;
  gender: Gender;
  phone: string;
  street: string;
  city: string;
}
