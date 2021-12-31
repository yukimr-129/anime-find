import { Heading } from "@chakra-ui/react"
import { VFC } from "react"
import { Link } from "react-router-dom"

const Logo: VFC = () => {
    return (
        <>
        <Link to='/'>
            <Heading as='h1' fontSize={{base: 'xl', md: '2xl'}}>
                AnimeFind
            </Heading>
        </Link>
        </>
    )
}

export default Logo