import { atom } from "recoil";

export const LoadPage = atom<number>({
    key: 'LoadPage',
    default: 1,
})