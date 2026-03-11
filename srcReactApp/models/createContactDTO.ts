export interface CreateContactDTO {
  name: string;
  gender: "Male" | "Female";
  phone: string;
  street: string;
  city: string;
}