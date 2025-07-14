import { Gender } from "../Enums/Gender"
import { Contact } from "../Interfaces/Contact"

export const newContact: Contact = {
    name: "nameTest",
    gender: Gender.male,
    phone: 972512345678,
    street: "streetTest",
    city: "cityTest"
}

export const createContactPageKey: string = "createContact"
export const pageName: string = "createContact"

// Elements' keys
export const elementsKeys = {
    saveButton: "saveButton",
    error: "error",
    contactName: "contactName",
    cancelButton: "cancelButton"
}

export const getExpectedError = (testCase: string): string => {
    return `Error: The "${testCase}" field can't be empty.`
}