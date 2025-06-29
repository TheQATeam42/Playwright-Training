import {Contact} from "./character-creation-contact"

/**
 * A valid sample contact assumed not to already exist prior to testing
 */
export const testContact: Contact = {
    name: "Genghis Khan",
    gender: "Male",
    phone: "(577) 385-0576",
    street: "Ap #826-8849 Vulputate Street",
    city: "Temüjin"
}

/**
 * These fields will be tested when testing missing fields during character creation.
 */
export const fieldsToOmit: Array<keyof Contact> = ["name", "phone", "street", "city"]
