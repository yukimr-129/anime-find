import { useEffect, useState } from 'react'

import { getReviewCount } from 'lib/api/review/review'
import { useRecoilValue } from 'recoil'
import { ReviewReflection } from 'store/ReviewReflection'

type ReviewCount = (id: number) => {
    count: number;
    rate: number;
}

export const useGetReviewCount: ReviewCount = (id: number) => {
    const [ count, setCount ] = useState(0)
    const [ rate, setRate ] = useState(0)
    const reviewReflection = useRecoilValue(ReviewReflection)

    useEffect(() => {
        let isMounted = true

        const getReviewStatus = async() => {
            try {
                const reviewCount = await getReviewCount(id)
                const { review_count, average_rate } = reviewCount.data
    
                review_count && setCount(review_count)
                average_rate && setRate(average_rate)
                
            } catch (error) {
                console.error(error)
            }
        }

        isMounted && getReviewStatus()
        
        return () => {
            isMounted = false
        }
    }, [reviewReflection, id])

    return { count, rate }
}