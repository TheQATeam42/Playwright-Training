import { User } from "../models/user";
import { UserToCreate } from "../models/user-to-create";

/**
 * Converts a UserToCreate object to a User object by formatting the address and ensuring all fields are strings.
 * @param userToCreate The user data to convert
 * @returns The converted User object
 */
export const convertUserToCreateToUser = (userToCreate: UserToCreate): User => {
    return {
        name: userToCreate?.name ?? "",
        gender: userToCreate?.gender?.toString() ?? "",
        address: `${userToCreate.street}, ${userToCreate.city}`
    }
} 