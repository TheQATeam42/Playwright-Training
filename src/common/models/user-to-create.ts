import { Gender } from "./gender"

export interface UserToCreate {
    name?: string
    gender?: Gender
    phone?: string
    street?: string
    city?: string
}