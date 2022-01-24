import { atom } from "recoil";

const current_year_number = (new Date()).getFullYear();
const current_year = String(current_year_number)

export const Year = atom<string>({
    key: 'Year',
    default: current_year
})

