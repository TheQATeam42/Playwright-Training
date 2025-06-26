import { readFileSync } from "fs"
import { join } from "path"
import { User } from "../../common/models/user"

/**
 * Retrieves a user object from the users.json file by matching the provided name.
 * @param name - The name of the user to find.
 * @returns The User object with the matching name, or undefined if not found.
 */
const getUser = (name:string) : User => {
    const users = JSON.parse(readFileSync(join(__dirname, "..", "data", "users.json"), "utf-8"))
    return users.find((user:any) => user.name === name)
}

export default getUser