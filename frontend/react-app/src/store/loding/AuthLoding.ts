import { atom } from "recoil";

export const AuthLoding = atom<boolean>({
    key: 'AuthLoding',
    default: true
})