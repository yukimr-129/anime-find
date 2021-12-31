import { atom } from "recoil";
import { FavoriteType } from "types/FavoriteAnime/FavoriteAnimeType";

export const FavoriteAnimeLists = atom<FavoriteType[]>({
    key: 'FavoriteAnimeLists',
    default: []
})