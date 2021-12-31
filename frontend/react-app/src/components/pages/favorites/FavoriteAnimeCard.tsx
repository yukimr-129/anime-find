import { Box, Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { useMessage } from "customHooks/message/useMessage";
import { motion, useAnimation } from "framer-motion";
import Cookies from "js-cookie";
import { client } from "lib/api/client";
import { useState, useEffect, VFC, memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FavoriteType } from "types/FavoriteAnime/FavoriteAnimeType";
import { IsFavoriteLike } from "store/IsFavoriteLike";

type Props = {
    favoriteAnime: FavoriteType;
}

const FavoriteAnimeCard: VFC<Props> = memo((props) => {
    const { favoriteAnime } = props
    const [ isLike, setIsLike ] = useState(true)
    const [ isFavoriteLike, setIsFavoriteLike ] = useRecoilState(IsFavoriteLike)
    const controls = useAnimation()
    const { showMessage } = useMessage()

    const image = favoriteAnime.image_url !== '' ? favoriteAnime.image_url : 'https://lab.esprlog.net/annict/img/no_image.png'

    const toggleLike = () => {
        // setIsLike(!isLike)
        
        // if(!isLike) {
        //     controls.start({ scale: [0, 0.5, 1] })
        // }else {
        //     controls.start({ translateX: [0, 0, 0, -7, 0, -7, 0, 0] })
        // }

        try {
            const deleteLike = async() => {
                const res = await client.delete(`/favorites/destroy/${favoriteAnime.api_id}`, { headers: {
                    "access-token": Cookies.get("_access_token"),
                    "client": Cookies.get("_client"),
                    "uid": Cookies.get("_uid")
                  }})
                console.log(res);
            }
            deleteLike()
            setIsFavoriteLike(false)
        } catch (error) {
            showMessage({title: 'お気に入り削除に失敗しました', status: "error"})
        }
    }

    // useEffect(() => {
    //     let isMounted = true
    //     const getLikeAnime = async() => {
    //         const isLikeData = await client.get(`/favorites/confirm/${favoriteAnime.api_id}`, { headers: {
    //             "access-token": Cookies.get("_access_token"),
    //             "client": Cookies.get("_client"),
    //             "uid": Cookies.get("_uid")
    //             }})
    //             console.log(isLikeData.data);
    //             let isLike = isLikeData.data
    //             setIsLike(isLike)
    //     }
    //     if(isMounted) getLikeAnime()

    //     return () => {
    //         isMounted = false
    //     }
    // }, [isLike])

    return (
        <>
            <Box w={{base: '300px', md: '500px'}} h={{base: '240px', md: '330px'}} bg='white' borderRadius='10px' m='15px 5px' p='0 0 10px 0' border='solid 1px #e0e0e0' position='relative'>
                <Link as='a' href={favoriteAnime.official_url} target='_blank'>
                    <Box display='block' m='0 0 8px' overflow='hidden' borderRadius='10px 10px 0 0'>
                        {/* <motion.div  whileHover={{opacity: 1, scale: 1.1, transition: { duration: 0.3 }}} >
                            <Image src={image}  w='calc(100% + 20px)' objectFit='cover' maxH={{base: '200px', md: '260px'}} _hover={{filter: 'blur(3px)'}} />
                        </motion.div> */}
                        <Image src={image} w='calc(100% + 20px)' objectFit='cover' maxH={{base: '200px', md: '260px'}} />

                        <Box>
                            <Text opacity='0'color='red' fontWeight='700' fontSize='25px' position='absolute' top='40%' right='30%'>View Official Site</Text>
                        </Box>
                    </Box>
                </Link>
                <Flex align='flex-start' m='10px 15px 0'>
                    <Text as='h1' fontSize="md" fontWeight='800'>{favoriteAnime.title}</Text>
                </Flex> 
                <Flex justify='flex-end' w='100%'>
                    <Box position='absolute' bottom='5px' right='5px'>
                        <motion.div
                            onClick={toggleLike}
                            animate={controls}
                            transition={!isLike ? { duration: 0.2 , ease: "easeIn"} : { duration: 0.6 , ease: "easeIn"}}
                        >
                            <Icon
                                as={isLike ? BsHeartFill : BsHeart }
                                fontSize='20px' 
                                color={isLike ? '#FF1493': ''}
                                cursor='pointer'
                            />
                        </motion.div>
                    </Box>
                </Flex>
            </Box>
        </>
    )
})

export default FavoriteAnimeCard