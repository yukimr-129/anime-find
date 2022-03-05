import React, { memo, VFC, useState, useEffect, useMemo } from 'react'

import { Image } from '@chakra-ui/image'
import { Box, Flex, Link, Text } from '@chakra-ui/layout'
import { CalendarIcon, ChevronDownIcon} from '@chakra-ui/icons';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { motion, useAnimation } from 'framer-motion';
import { Icon, Menu, MenuButton, MenuItem, MenuList, Tag, Button } from '@chakra-ui/react';
import { Link as RouteLink } from "react-router-dom"
import { FaTwitter } from "react-icons/fa";

import { AnnictApiType } from '../../../types/api/AnnictApiType';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CurrentUser } from 'store/auth/Auth';
import { useMessage } from 'customHooks/message/useMessage';
import { FavoriteType } from 'types/favoriteAnime/FavoriteAnimeType';
import ReviewModal from '../reviewModal/ReviewModal';
import ReactStars from 'react-stars';
import { useGetReviewCount } from 'customHooks/useGetReviewCount';
import { IconContext } from 'react-icons/lib';
import { cleateFavorite, confirmFavorite, deleteFavorite } from 'lib/api/favorite/favorite';
import Head from 'meta/Head';
import { calendarEvent } from 'store/calendar/calendarEvent';

type Props = {
    animeList: AnnictApiType;
}

const AnimeCard: VFC<Props> = memo((props) => {
    const { animeList } = props
    const [ isLike, setIsLike ] = useState(false)
    const currentUser = useRecoilValue(CurrentUser)
    const [ calendarEventList, setCalendarEvent ] = useRecoilState(calendarEvent)
    const controls = useAnimation()
    const { showMessage } = useMessage()
    const { count, rate } = useGetReviewCount(animeList.id)
    
    const imageUrl = animeList.images.recommended_url
    
    const image = imageUrl !== '' && imageUrl.match(/https/) ? imageUrl : `${process.env.PUBLIC_URL}/no_image.png`
    
    const like = useMemo(() => isLike, [isLike])
    
    const toggleLike = () => {
        //お気に入り登録済か
        if (!like) {
            try {
                const createLike = async() => {
                    const favoriteParams: FavoriteType = {
                        user_id: currentUser?.id,
                        title: animeList.title,
                        official_url: animeList.official_site_url,
                        image_url: animeList.images.recommended_url,
                        twitter_username: animeList.twitter_username,
                        season: animeList.season_name_text,
                        api_id: animeList.id,
                        media_text: animeList.media_text,
                    }
        
                    await cleateFavorite(favoriteParams)
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
                    await deleteFavorite(animeList.id)  
                }   
                deleteLike()
                setIsLike(false)
            } catch (error) {
                showMessage({title: 'お気に入り削除に失敗しました', status: "error"})
            }
        }
    }

    const handleOfficialSite = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        if(animeList.official_site_url) {
            window.open(animeList.official_site_url, '_blank')
        } else {
            showMessage({title: '公式URLが存在しません', status: 'warning'})
        }
    }

    const handleCreateEvent = () => {
        const lists = [...calendarEventList, {id: String(animeList.id), title: animeList.title, event: animeList.released_on || animeList.released_on_about}]
        const distinctList = new Map(lists.map((list) => [list.id, list]))
        // setCalendarEvent(Array.from(disitictList.values()))
        if (animeList.released_on || animeList.released_on_about){ 
            setCalendarEvent(Array.from(distinctList.values()))
        }else {
            showMessage({title: '放送日の情報がないため登録できません', status: 'warning'})
        }

    }

    //お気に入り確認反映(初回、再レンダリング時)
    useEffect(() => {
        //メモリリーク対策
        let isMounted = true
        const getLikeAnime = async() => {
            try {
                const res = await confirmFavorite(animeList.id)
                setIsLike(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        isMounted && getLikeAnime()

        return () => {
            isMounted = false
        }
    }, [animeList.id])

    return (
        <>
            <Head title='anime-find | アニメの検索アプリ'/>
            <Box w={{base: '300px', md: '500px'}} h={{base: '270px', md: '360px'}} bg='white' borderRadius='10px' m='15px 5px' p='0 0 10px 0' border='solid 1px #e0e0e0' position='relative'>
                <Box position='absolute' top='10px' right='10px' _hover={{opacity: 0.9}} >
                    <Link as='a' href={`${process.env.REACT_APP_TWITTER_URL}${animeList.twitter_username}`} target='_blank'>
                        <IconContext.Provider value={{ color: '#1DA1F2', size: '30px' }}>
                            <FaTwitter />
                        </IconContext.Provider>
                    </Link>
                </Box>
                <Link as='a' onClick={handleOfficialSite} >
                    <Box display='block' m='0 0 8px' overflow='hidden' borderRadius='10px 10px 0 0'>
                        <Image src={image}  w='calc(100% + 20px)' objectFit='cover' maxH={{base: '200px', md: '260px'}}/>
                    </Box>
                </Link>
                <Box>
                    <Flex align='center' m='10px 15px 0'>
                        <Tag size='sm' variant='solid' colorScheme='teal' mr={2}>
                            {animeList.media_text}
                        </Tag>
                        <Text as='h1' fontSize={{base: 'xs', md: 'md'}} fontWeight='800'>{animeList.title}</Text>
                    </Flex>
                    <Flex justify='space-between' w='100%'>
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
                        <Box position='absolute' bottom='5px' left='15px'>
                            <RouteLink to={{pathname: `/review/${animeList.id}`, state: animeList.images.recommended_url}}>
                                    <Box>
                                        <Flex align='center' _hover={{cursor: 'pointer'}}>
                                            <ReactStars edit={false} value={rate}/>
                                            <Text as='p' fontWeight='bold' ml={1} fontSize={{base: '3px', md: '4px'}}>{`(レビュー件数：${count}件)`}</Text>
                                        </Flex>
                                    </Box>
                            </RouteLink>
                            {/* <Menu>
                                <MenuButton
                                    as={Button}
                                    size='xs' 
                                    p={{base: 2, md: 3}} 
                                    color="Gray 300"
                                >
                                    メニュー <ChevronDownIcon />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem >
                                        <ReviewModal id={animeList.id} />
                                    </MenuItem>
                                    <MenuItem>
                                        <Button pl={0} size='xs' leftIcon={<CalendarIcon />} variant='none' onClick={handleCreateEvent}>放映日登録</Button>
                                    </MenuItem>
                                </MenuList>
                            </Menu> */}
                            <ReviewModal id={animeList.id} />
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    )
})

export default AnimeCard