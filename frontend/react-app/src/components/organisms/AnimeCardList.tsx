import { memo, useCallback, useRef } from "react"

import { Box, Center, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { VFC } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

import { useCourFactory } from "../../customHooks/useCourFactory"
import { Year } from "../../store/Year"
import AnimeCard from "../molecules/animeCard/AnimeCard"
import { BeatLoader } from "react-spinners"
import { HasMore } from "store/loding/HasMore"
import { useNextAnimes } from "customHooks/useNextAnimes"
import { LoadPage } from "store/LoadPage"
import { AnimeLists } from "store/AnimeLists"

const AnimeCardList: VFC = memo(() => {
    const [ loadPage, setLoadPage ] = useRecoilState(LoadPage)
    const year = useRecoilValue(Year)
    const hasMore = useRecoilValue(HasMore)
    const animeLists = useRecoilValue(AnimeLists)
    const { select_cour } = useCourFactory()
    const { isLoading } = useNextAnimes(loadPage)

    // ref対象を監視して表示終わったら、ページ番号を増やす
    const observer: any = useRef()
    const lastMovieElementRef = useCallback((node) => {
        if (isLoading) return
        observer.current && observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            //要素が交差しているかつさらにページを読みこむ場合、ページ番号を増やす
            if(entries[0].isIntersecting && hasMore){
                setLoadPage((prevPage) => prevPage + 1)
            }
        })

        node && observer.current.observe(node)

    }, [hasMore, isLoading, setLoadPage])
    
    return (
        <>
            <Box justify='center' align='center' m='30px 10px 0'>
                <Text fontWeight='700' fontSize='1.17em'>
                    ― {year}{select_cour} ―
                </Text>
            </Box>
            {animeLists ? 
                <>
                    <Wrap p={{base: 3, md: 4}} w='100%' spacing={5} justify='center' align='center'>
                            {animeLists.map((animeList, index) => (
                                animeLists.length === index + 1 ? (
                                    <WrapItem key={index} ref={lastMovieElementRef}>
                                        <AnimeCard animeList={animeList}/>
                                    </WrapItem>
                                ) : (
                                    <WrapItem key={index}>
                                        <AnimeCard animeList={animeList}/>
                                    </WrapItem>
                                )
                            ))}
                    </Wrap>
                    {isLoading && (
                        <Center p='5px 0 30px 0' w='100%' h='100'>
                            <BeatLoader size={10} color="black" />
                        </Center>
                    )}
                </>
            : null }
        </>
    )
})

export default AnimeCardList