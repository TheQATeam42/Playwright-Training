export interface ContactModel {
  name: string;
  gender?: "Male" | "Female" | "Other";
  phone: string;
  street: string;
  city: string;
}
