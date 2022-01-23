import { User } from "types/auth/authTypes";

export type AnimeReviewType = {
    review: {
        anime_id: number;
        comment: string;
        created_at: Date;
        id: number;
        image: string | null;
        name: string;
        rate: number;
        title: string;
        updated_at: string;
        user_id: number;
    },
    user: User
}