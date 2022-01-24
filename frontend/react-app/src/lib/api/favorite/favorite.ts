import Cookies from "js-cookie"
import { FavoriteType } from "types/favoriteAnime/FavoriteAnimeType"
import { client } from "../client"

export const getFavorite = () => {
    return client.get('/favorites', { headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

export const deleteFavorite = (id: number) => {
    return client.delete(`/favorites/destroy/${id}`, { headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})

}

export const cleateFavorite = (params: FavoriteType) => {
    return client.post('/favorites/create', params)
}

export const confirmFavorite = (id: number) => {
    return client.get(`/favorites/confirm/${id}`, { headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}