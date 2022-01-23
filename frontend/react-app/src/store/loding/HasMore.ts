import { atom } from "recoil";

export const HasMore = atom<boolean>({
    key: 'HasMore',
    default: true
})