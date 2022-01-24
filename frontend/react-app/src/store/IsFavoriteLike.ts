import { atom } from "recoil";

export const IsFavoriteLike = atom<boolean>({
    key: 'IsFavoriteLike',
    default: true
})