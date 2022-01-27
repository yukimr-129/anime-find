import { memo, VFC } from "react";

import { Avatar, Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import ReactStars from "react-stars";

import { AnimeReviewType } from "types/review/AnimeReviewType";

type Props = {
    review: AnimeReviewType;
}

const ReviewList: VFC<Props> = memo((props) => {
    const { review, user } = props.review

    const dateFactory = (date: Date) => {
        const createDate = new Date(date)
        return `${createDate.getFullYear()}/${createDate.getMonth() % 12 + 1}/${createDate.getDate()}`
    }
    const createdAt = dateFactory(review.created_at)
    
    
    return (
        <Box w='100%'>
            <Divider pt='15px'/>
            <Box mt={5}>
                <VStack spacing={2} align='flex-start'>
                    <Text as='p' fontSize='15px'>{`投稿日: ${createdAt}`}</Text>
                    <Flex align='center'>
                        <Avatar src={user.image?.url || ''} size='sm' mr={2}/>
                        <Text as='p'>{user.name}</Text>
                    </Flex>
                    <Flex align='center'>
                        <Text as='p' mr={2} fontWeight='bold'>{review.title}</Text>
                        <ReactStars edit={false} value={review.rate}/>
                    </Flex>
                    <Text>{review.comment}</Text>
                </VStack>
            </Box>
    </Box>
    )
})

export default ReviewList