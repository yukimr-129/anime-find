import { atom } from "recoil";
import { AnnictApiType } from '../types/api/AnnictApiType'

export const AnimeLists = atom<AnnictApiType[]>({
    key: 'AnimeLists',
    default: []
})