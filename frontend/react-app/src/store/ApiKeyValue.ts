import { atom } from "recoil";
import { useCourFactory } from "../customHooks/useCourFactory";
import { YearFactory } from "../util/YearFactory";
import { CourFactory } from "../util/CourFactory";

type ApiKeyValue = {
    year: string | undefined;
    cour: string | undefined;
}

//現在の西暦
const current_year_number = (new Date()).getFullYear();
const current_year = String(current_year_number)

//現在のクール
const cours_detail = ['1期（冬期）', '2期（春期）', '3期（夏期）', '4期（秋期）'];
const current_cour = Math.ceil((new Date()).getMonth() / 3)
const defalt_cour = cours_detail[current_cour - 1]

//API用
const season = new Map<string, string>([['1期（冬期）', 'winter'], ['2期（春期）', 'spring'], ['3期（夏期）', 'summer'], ['4期（秋期）', 'autumn']])
const current_season = season.get(defalt_cour)

export const ApiKeyValue = atom<ApiKeyValue>({
    key: 'ApiKeyValue',
    default: {year: current_year, cour: current_season}
})