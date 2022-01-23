import Cookies from "js-cookie"
import { client } from "../client"
import { Submitreviews } from "types/form/FormInputs";

export const getReviewsList = (id: string) => {
    return client.get(`/reviews/${id}`, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    })  
}

export const createReview = (params: Submitreviews) => {
    return client.post('/reviews/create', params , {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    })  
}

export const getReviewCount = (id: number) => {
  return client.get(`/reviews/count/${id}`)
} 