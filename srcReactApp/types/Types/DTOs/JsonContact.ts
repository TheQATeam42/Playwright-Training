import Gender from "../../Enums/Gender";
import IAddress from "../../Interfaces/IAddress";

type JsonContact = {
  name: string;
  gender: Gender;
  address: IAddress | string;
  phone?: string;
};

export default JsonContact;
