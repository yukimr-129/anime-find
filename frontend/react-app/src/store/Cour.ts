import { atom } from "recoil";

const current_cour = Math.ceil(((new Date()).getMonth() + 1) / 3)
const cours_detail = ['1期（冬期）', '2期（春期）', '3期（夏期）', '4期（秋期）'];

export const Cour = atom<string>({
    key: 'Cour',
    default: cours_detail[current_cour - 1]
})