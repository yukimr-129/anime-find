import { atom } from "recoil";
import { User } from "types/auth/authTypes";

export const IsSignedIn = atom<boolean>({
    key: 'IsSignedIn',
    default: false
})

export const CurrentUser = atom<User | undefined>({
    key: 'CurrentUser',
    default: undefined
})