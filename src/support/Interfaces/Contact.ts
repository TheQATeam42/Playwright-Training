import { Gender } from "../Enums/Gender";

export interface Contact {
    name: string,
    gender: Gender,
    phone: number,
    street: string,
    city: string,
}