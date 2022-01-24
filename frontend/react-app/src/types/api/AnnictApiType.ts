export type AnnictApiType = {
    episodes_count: number;
    id: number;
    images: {
        facebook: {
            og_image_url: string;
        },
        recommended_url: string;
        twitter: {
            bigger_avatar_url: string;
            image_url: string;
            mini_avatar_url: string;
            normal_avatar_url: string;
            original_avatar_url: string;
        },
    }
    mal_anime_id: string;
    media: string;
    media_text: string;
    no_episodes: boolean;
    official_site_url: string;
    released_on: string;
    released_on_about: string;
    reviews_count: number;
    season_name: string;
    season_name_text: string;
    syobocal_tid: string;
    title: string;
    title_en: string;
    title_kana: string;
    twitter_hashtag: string;
    twitter_username: string;
    watchers_count: number;
    wikipedia_url:string;
}