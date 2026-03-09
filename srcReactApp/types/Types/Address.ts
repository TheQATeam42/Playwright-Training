import IAddress from "../Interfaces/IAddress";

class Address implements IAddress {
  public city: string;
  public street: string;

  constructor(city: string, street: string);
  constructor(addressAsString: string);
  constructor(city: string, street?: string) {
    if (street) {
      this.street = street;
      this.city = city;
      return;
    }

    const lastCommaIdx = city.lastIndexOf(",");

    if (lastCommaIdx === -1) {
      this.street = "Unnamed street";
      this.city = city.trim();
      return;
    }

    this.street = city.slice(0, lastCommaIdx).trim();
    this.city = city.slice(lastCommaIdx + 1).trim();
  }

  ToString(): string {
    return `${this.street}, ${this.city}`;
  }

  public static fromIAddress(original: IAddress): Address {
    return new Address(original.city, original.street);
  }
}

export default Address;
