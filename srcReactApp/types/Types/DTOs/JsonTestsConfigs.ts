import JsonContact from "./JsonContact";

type JsonTestsConfigs = {
  Contacts: {
    ToDelete: JsonContact;
    ToCreate: JsonContact;
  };
  Titles: {
    Contacts: string;
    CreateContact: string;
  };
};

export default JsonTestsConfigs;
