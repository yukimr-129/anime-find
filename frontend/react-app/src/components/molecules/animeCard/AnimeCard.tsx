import { Image } from '@chakra-ui/image'
import { Box, Flex, Link, Text } from '@chakra-ui/layout'
import React, { memo, VFC, useState, useEffect, useRef } from 'react'
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { motion, useAnimation } from 'framer-motion';
import { Icon } from '@chakra-ui/react';

import { AnnictApiType } from '../../../types/api/AnnictApiType';
import { client } from 'lib/api/client';
import { useRecoilValue } from 'recoil';
import { CurrentUser, IsSignedIn } from 'store/auth/Auth';
import { useMessage } from 'customHooks/message/useMessage';
import Cookies from 'js-cookie';
import { FavoriteType } from 'types/FavoriteAnime/FavoriteAnimeType';
import { scale, visible } from 'lib/motionVariants/variants';

type Props = {
    animeList: AnnictApiType;
}

const AnimeCard: VFC<Props> = memo((props) => {
    const { animeList } = props
    const [ isLike, setIsLike ] = useState(false)
    const [ toggleLike, setToggleLike ] = useState(false)
    const currentUser = useRecoilValue(CurrentUser)
    const isSignedIn = useRecoilValue(IsSignedIn)
    const { showMessage } = useMessage()
    const controls = useAnimation()

    const image = animeList.images.recommended_url !== '' ? animeList.images.recommended_url : 'https://lab.esprlog.net/annict/img/no_image.png'

    const toggleSetLike = () => {
        //ログインしているか確認
        if (currentUser && isSignedIn) {
            //お気に入り登録済か
            if (isLike === false) {
                try {
                    const createLike = async() => {
                        const favoriteParams: FavoriteType = {
                            user_id: currentUser.id,
                            title: animeList.title,
                            official_url: animeList.official_site_url,
                            image_url: animeList.images.recommended_url,
                            twitter_username: animeList.twitter_username,
                            season: animeList.season_name_text,
                            api_id: animeList.id,
                        }
            
                        const res = await client.post('/favorites/create', favoriteParams)
                        
                    }
                    createLike()
                    setIsLike(true)
                    controls.start({ scale: [0, 0.5, 1] })
                } catch (error) {
                    showMessage({title: 'お気に入り登録に失敗しました', status: "error"})
                }
            } else {
                try {
                    const deleteLike = async() => {        
                        const res = await client.delete(`/favorites/destroy/${animeList.id}`, { headers: {
                            "access-token": Cookies.get("_access_token"),
                            "client": Cookies.get("_client"),
                            "uid": Cookies.get("_uid")
                          }})
                        console.log(res);
                        
                    }
                    
                    deleteLike()
                    setIsLike(false)
                    controls.start({ translateX: [0, 0, 0, -7, 0, -7, 0, 0] })
                } catch (error) {
                    showMessage({title: 'お気に入り削除に失敗しました', status: "error"})
                }
            }
        } else {
            showMessage({title: 'ログインが必要です', status: "error"})
        }
    }

    ///お気に入り有無反映
    useEffect(() => {
        //メモリリーク対策
        let isMounted = true

        const getLikeAnime = async() => {
            const isLikeData = await client.get(`/favorites/confirm/${animeList.id}`, { headers: {
                "access-token": Cookies.get("_access_token"),
                "client": Cookies.get("_client"),
                "uid": Cookies.get("_uid")
              }})
            let isLike = isLikeData.data
            setIsLike(isLike)
        }
        if(isMounted) getLikeAnime()

        return () => {
            isMounted = false
        }
    }, [isLike])

    return (
        <>
            <Box w={{base: '300px', md: '500px'}} h={{base: '240px', md: '330px'}} bg='white' borderRadius='10px' m='15px 5px' p='0 0 10px 0' border='solid 1px #e0e0e0' position='relative'>
                <Link as='a' href={animeList.official_site_url} target='_blank'>
                    <Box display='block' m='0 0 8px' overflow='hidden' borderRadius='10px 10px 0 0'>
                        <motion.div variants={scale} whileHover='hoverAction' >
                            <Image src={image}  w='calc(100% + 20px)' objectFit='cover' maxH={{base: '200px', md: '260px'}}/>
                            {/* <motion.h1 variants={visible} initial='hidden' whileHover='hoverAction'>
                                View Official Site
                            </motion.h1> */}
                        </motion.div>
                    </Box>
                </Link>
                <Flex align='flex-start' m='10px 15px 0'>
                    <Text as='h1' fontSize="md" fontWeight='800'>{animeList.title}</Text>
                </Flex> 
                <Flex justify='flex-end' w='100%'>
                    <Box position='absolute' bottom='5px' right='5px'>
                        <motion.div
                            onClick={toggleSetLike}
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

export default AnimeCard