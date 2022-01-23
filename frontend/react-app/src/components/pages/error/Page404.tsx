import { Center, VStack, Link, Text } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"

const Page404 = () => {
    const history = useHistory()
    const onClickBackHome = () => {
        history.push({pathname: '/'})
    }

    return (
        <>
            <Center h="400px">
                <VStack spacing={3}>
                    <Text fontSize={{base: 'xl', md: '5xl'}} fontWeight='600'>404 not found</Text>
                    <Text fontSize={{base: 'sm', md: '3xl'}}>お探しのページは見つかりませんでした</Text>
                    <Link as="a" fontSize={{base: 'md', md: '2xl'}} color="linkedin.500" fontWeight='600' onClick={onClickBackHome}>
                        ホームへ
                    </Link>
                </VStack>
            </Center>
        </>
    )
}

export default Page404
