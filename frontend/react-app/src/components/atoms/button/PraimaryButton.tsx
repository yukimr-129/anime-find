import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout';
import { memo, VFC } from 'react'

type Props = {
    onClickAnimeSearch: () => void
}

const PraimaryButton: VFC<Props> = memo((props) => {
    const { onClickAnimeSearch } = props
    return (
        <Button onClick={onClickAnimeSearch} leftIcon={<SearchIcon color="white" />} iconSpacing='5px' colorScheme="pink" variant="solid" _hover={{opacity: 0.7}}>
            <Text as='p' lineHeight='40px'>
                アニメを検索
            </Text>
        </Button>
    )
})

export default PraimaryButton