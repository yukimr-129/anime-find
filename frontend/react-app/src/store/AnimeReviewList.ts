import { atom } from "recoil";
import { AnimeReviewType } from "types/review/AnimeReviewType";

export const AnimeReviewList = atom<AnimeReviewType[]>({
    key: 'AnimeReviewList',
    default: []
})