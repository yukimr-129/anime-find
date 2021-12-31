import { Box, Center, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { log } from "console";
import Cookies from "js-cookie";
import { client } from "lib/api/client";
import { useEffect, VFC } from "react";
import { useRecoilState } from "recoil";
import { FavoriteAnimeLists } from "store/FavoriteAnimeList";
import { IsFavoriteLike } from "store/IsFavoriteLike";
import { Loding } from "store/loding/Loding";
import { DefaultSpiner } from "util/DefaultSpiner";
import FavoriteAnimeCard from "./FavoriteAnimeCard";

const FavoriteAnime: VFC = () => {
    const [ loding, setLoding ] = useRecoilState(Loding)
    const [ favoriteAnimeLists, setFavoriteAnimeList ] = useRecoilState(FavoriteAnimeLists)
    const [ isFavoriteLike, setIsFavoriteLike ] = useRecoilState(IsFavoriteLike)

    useEffect(() => {
        let isMounted = true
        setLoding(true)
        const getFavoriteAnime = async() => {
            try {
                const FavoriteAnime = await client.get('/favorites', { headers: {
                    "access-token": Cookies.get("_access_token"),
                    "client": Cookies.get("_client"),
                    "uid": Cookies.get("_uid")
                }})
                console.log(FavoriteAnime)
                setFavoriteAnimeList(FavoriteAnime.data)
                setIsFavoriteLike(true)
                setLoding(false)
            } catch (error) {
                throw error
            }
        }
        if(isMounted) getFavoriteAnime()

        return () => {
            isMounted = false
        }
    }, [isFavoriteLike])

    return (
        <>
            <Box w={{base: '90%', md: '70%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'>
                <Box justify='center' align='center' m='30px 10px 0'>
                    <Text fontWeight='700' fontSize='1.17em' pt='30px'>
                        ー　お気に入りアニメ　ー
                    </Text>
                </Box>
                {loding ? (
                    <Center mt='100px'>
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