export interface ContactModel {
  name: string;
  phone: string;
  street: string;
  city: string;
  gender?: "Male" | "Female";
}
