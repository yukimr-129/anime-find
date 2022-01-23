import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

import { getReviewsList } from "lib/api/review/review"
import { AnimeReviewList } from "store/AnimeReviewList"
import { useMessage } from "./message/useMessage"
import { AnimeReviewType } from "types/review/AnimeReviewType"

type AnimeApiReview = (id: string) => {
    reviewsList: AnimeReviewType[];
    listCount: number;
    loadFlag: boolean;
}

export const useGetAnimeReviews: AnimeApiReview = (id: string) => {
    const [ reviewsList, setReviewsList ] = useRecoilState(AnimeReviewList)
    const [ loadFlag, setLoadFlag ] = useState(false)
    const [ listCount, setListCount] = useState(0);
    const { showMessage } = useMessage()

    
    useEffect(() => {
        let isMounted = true
        const getReviews = async(id: string) => {
            try {
                const res = await getReviewsList(id)
                if (res.status === 200) {
                    const reviewsData : AnimeReviewType[] = res.data

                    setReviewsList(reviewsData)
                    setListCount(reviewsData.length)
                    setLoadFlag(true)
                } else {
                    console.error('status error')
                }            
            } catch (error) {
                showMessage({title: 'アニメ一覧の取得に失敗しました', status: "error"})
            }
        }

        isMounted && getReviews(id)

        return () => { isMounted = false }
    }, [])

    return { reviewsList, listCount, loadFlag }
}