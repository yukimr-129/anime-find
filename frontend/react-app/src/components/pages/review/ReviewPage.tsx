import { memo, useState, VFC, useEffect, useCallback, useRef } from "react";

import { Box, Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

import ReviewList from "components/organisms/ReviewList";
import { useGetAnimeReviews } from "customHooks/useGetAnimeReviews";

const ReviewPage: VFC = memo(() => {
    const [ loadIndex, setLoadIndex ] = useState(4)
    const [ isEmpty, setIsEmpty ] = useState(true);
    const { state } = useLocation<string>()
    const { anime_id } = useParams<{anime_id: string}>()
    const { reviewsList, listCount, loadFlag } = useGetAnimeReviews(anime_id)

    const image = state ? state : `${process.env.PUBLIC_URL}/no_image.png`
    
    //「さらに表示」ボタンの制御
    const displayMore = () => {
        if(loadIndex < listCount) {
            setLoadIndex((prevState) => prevState + 4);
        }
    }

    //初回レンダリング時のdisabledの値設定
    //非同期処理でリスト取得後
    useEffect(() => {
        let isMounted = true 
        
        if(loadFlag){
            const checkLodaList = () => {
                loadIndex < listCount && setIsEmpty(false)
            }
            isMounted && checkLodaList()
        }
        return () => { isMounted = false }
    }, [ loadFlag ])

    //レビューリストを全て表示したらボタンを非活性
    useEffect(() => {
        let isMounted = true 

        if(loadFlag){            
            const checkLodaList = () => {
                loadIndex > listCount ? setIsEmpty(true) : setIsEmpty(false)
            }
            isMounted && checkLodaList()
        }
        return () => { isMounted = false }
    }, [ loadIndex ])


    return (
        <Box w={{base: '80%', md: '60%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'>
            <Box w='100%'>
                <Image src={image} borderRadius='10px 10px 0 0' w='100%' objectFit='cover'/>
            </Box>

            <Box p={3}>
                <Text as='h2' fontWeight='bold'>レビュー一覧</Text>
                <VStack spacing={5} align='start'>
                    {reviewsList ? (
                        reviewsList.slice(0, loadIndex).map((review, key) => (
                            <ReviewList key={key} review={review}/>
                        ))
                        ) : null }
                </VStack>
                <Center mt={10}>
                    <Button
                    colorScheme='teal'
                    disabled={isEmpty}
                    onClick={displayMore}
                    variant="solid"
                    >
                        さらに表示
                    </Button>
                </Center>
            </Box>
        </Box>
    )
})

export default ReviewPage