import React, { VFC, memo } from "react";

import { Box, Flex, Icon, Image, Link, Tag, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useSetRecoilState } from "recoil";

import { useMessage } from "customHooks/message/useMessage";
import { BsHeartFill } from "react-icons/bs";
import { FavoriteType } from "types/favoriteAnime/FavoriteAnimeType";
import { IsFavoriteLike } from "store/IsFavoriteLike";
import { FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { deleteFavorite } from "lib/api/favorite/favorite";

type Props = {
    favoriteAnime: FavoriteType;
}

const FavoriteAnimeCard: VFC<Props> = memo((props) => {
    const { favoriteAnime } = props
    const setIsFavoriteLike = useSetRecoilState(IsFavoriteLike)
    const controls = useAnimation()
    const { showMessage } = useMessage()

    const image = favoriteAnime.image_url !== '' ? favoriteAnime.image_url : `${process.env.PUBLIC_URL}/no_image.png`
    
    const handleOfficialSite = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        if(favoriteAnime.official_url) {
            window.open(favoriteAnime.official_url, '_blank')
        } else {
            showMessage({title: '公式URLが存在しません', status: 'warning'})
        }
    }

    const toggleLike = () => {

        try {
            const deleteLike = async() => {
                const res = await deleteFavorite(favoriteAnime.api_id)
                res.status === 200 ? setIsFavoriteLike(false) : console.error('status error')
            }
            deleteLike()
            
        } catch (error) {
            showMessage({title: 'お気に入り削除に失敗しました', status: "error"})
        }
    }

    return (
        <>
            <Box w={{base: '300px', md: '500px'}} h={{base: '240px', md: '330px'}} bg='white' borderRadius='10px' m='15px 5px' p='0 0 10px 0' border='solid 1px #e0e0e0' position='relative'>
                <Box position='absolute' top='10px' right='10px' _hover={{opacity: 0.9}} >
                    <Link as='a' href={`${process.env.REACT_APP_TWITTER_URL}${favoriteAnime.twitter_username}`} target='_blank'>
                        <IconContext.Provider value={{ color: '#1DA1F2', size: '30px' }}>
                            <FaTwitter />
                        </IconContext.Provider>
                    </Link>
                </Box>
                <Link as='a' onClick={handleOfficialSite} >
                    <Box display='block' m='0 0 8px' overflow='hidden' borderRadius='10px 10px 0 0'>
                        <Image src={image} w='calc(100% + 20px)' objectFit='cover' maxH={{base: '200px', md: '260px'}} />
                    </Box>
                </Link>
                <Flex align='flex-start' m='10px 15px 0'>
                    <Tag size='sm' variant='solid' colorScheme='teal' mr={2}>
                        {favoriteAnime.media_text}
                    </Tag>
                    <Text as='h1' fontSize="md" fontWeight='800'>{favoriteAnime.title}</Text>
                </Flex> 
                <Flex justify='flex-end' w='100%'>
                    <Box position='absolute' bottom='5px' right='5px'>
                        <motion.div
                            onClick={toggleLike}
                            animate={controls}
                        >
                            <Icon
                                as={BsHeartFill}
                                fontSize='20px' 
                                color='#FF1493'
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