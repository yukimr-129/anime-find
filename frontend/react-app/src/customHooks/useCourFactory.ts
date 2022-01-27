import { useRecoilValue } from "recoil"

import { Cour } from '../store/Cour'

type CourFactory = () => {
    current_cour: number;
    select_cour: string;
    select_season: string | undefined;
    current_season: string | undefined;
    cours: string[];
}

export const useCourFactory: CourFactory = () => {
    const selectCour = useRecoilValue(Cour)
    const cours_detail = ['1期（冬期）', '2期（春期）', '3期（夏期）', '4期（秋期）'];
    const cours_detail_month = ['冬：1～3月', '春：4～6月', '夏：7～9月', '秋：10～12月'];


    //現在のクール
    const current_cour = Math.ceil(((new Date()).getMonth() + 1) / 3)
    const defalt_cour = cours_detail[current_cour - 1]

    //選択したクール
    const cour_index = cours_detail.indexOf(selectCour)
    const select_cour = cours_detail_month[cour_index]

    //API用
    const season = new Map<string, string>([['1期（冬期）', 'winter'], ['2期（春期）', 'spring'], ['3期（夏期）', 'summer'], ['4期（秋期）', 'autumn']])
    const select_season = season.get(selectCour)
    const current_season = season.get(defalt_cour)
        
    //セレクト
    const cours: string[] = [];
    for (var i = 0; i < cours_detail.length; i++) {
      cours.push(cours_detail[i]);
    }

    return { current_cour, select_cour, select_season, current_season, cours }
}