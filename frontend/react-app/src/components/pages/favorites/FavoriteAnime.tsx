import { useEffect, VFC } from "react";

import { Box, Center, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { FavoriteAnimeLists } from "store/FavoriteAnimeList";
import { IsFavoriteLike } from "store/IsFavoriteLike";
import { Loding } from "store/loding/Loding";
import { DefaultSpiner } from "util/DefaultSpiner";
import FavoriteAnimeCard from "./FavoriteAnimeCard";
import { getFavorite } from "lib/api/favorite/favorite";
import { FavoriteType } from "types/favoriteAnime/FavoriteAnimeType";
import Head from "meta/Head";

const FavoriteAnime: VFC = () => {
    const [ loding, setLoding ] = useRecoilState(Loding)
    const [ favoriteAnimeLists, setFavoriteAnimeList ] = useRecoilState(FavoriteAnimeLists)
    const [ isFavoriteLike, setIsFavoriteLike ] = useRecoilState(IsFavoriteLike)

    useEffect(() => {
        let isMounted = true
        isMounted && setLoding(true)
        const getFavoriteAnime = async() => {
            try {
                const res = await getFavorite()
                if(res.status === 200) {
                    const favoriteAnimeData: FavoriteType[] = res.data

                    setFavoriteAnimeList(favoriteAnimeData)
                    setIsFavoriteLike(true)
                    setLoding(false)
                } else {
                    console.error('status error')
                }
            } catch (error) {
                console.error(error)
            }
        }
        isMounted && getFavoriteAnime()

        return () => {
            isMounted = false
        }
    }, [isFavoriteLike])

    return (
        <>
            <Head title='anime-find | お気に入りアニメ'/>
            <Box w={{base: '90%', md: '70%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'>
                <Box justify='center' align='center' m='30px 10px 0'>
                    <Text fontWeight='700' fontSize='1.17em' pt='30px'>
                        ー　お気に入りアニメ　ー
                    </Text>
                </Box>
                {loding ? (
                    <Center p='100px 0 100px 0'>
                        <DefaultSpiner />
                    </Center>
                ) : (
                    <Wrap p={{base: 3, md: 4}} w='100%' spacing={5} justify='center' align='center'>
                        {favoriteAnimeLists.map((favoriteAnime, index) => (
                            <WrapItem key={index} >
                                <FavoriteAnimeCard favoriteAnime={favoriteAnime}/>
                            </WrapItem>
                        ))}
                    </Wrap>
                )}
            </Box>
        </>
    )
}

export default FavoriteAnime