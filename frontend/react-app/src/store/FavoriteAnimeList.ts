import { atom } from "recoil";
import { FavoriteType } from "types/favoriteAnime/FavoriteAnimeType";

export const FavoriteAnimeLists = atom<FavoriteType[]>({
    key: 'FavoriteAnimeLists',
    default: []
})