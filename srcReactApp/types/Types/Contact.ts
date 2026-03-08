import Gender from "../Enums/Gender";
import IAddress from "../Interfaces/IAddress";
import Address from "./Address";
import JsonContact from "./DTOs/JsonContact";
import PhoneNumber from "./PhoneNumber";

class Contact {
  name: string;
  gender: Gender;
  address: Address;
  phone?: PhoneNumber;

  constructor(
    name: string,
    gender: Gender,
    address: IAddress | string,
    phoneNumber?: PhoneNumber
  ) {
    this.name = name;
    this.gender = gender;
    this.address =
      typeof address !== "string"
        ? Address.fromIAddress(address)
        : new Address(address);
    if (phoneNumber) {
      this.phone = phoneNumber;
    }
  }

  public static fromJsonContact(jsonContact: JsonContact): Contact {
    return new Contact(
      jsonContact.name,
      jsonContact.gender,
      jsonContact.address,
      jsonContact.phone
    );
  }
}

export default Contact;
