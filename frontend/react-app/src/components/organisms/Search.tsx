import { Box, Flex, FormControl, HStack } from "@chakra-ui/react"
import { VFC } from "react"

import PraimaryButton from "../atoms/button/PraimaryButton"
import CourInput from "../atoms/form/CourInput"
import YearInput from "../atoms/form/YearInput"
type Props = {
    onClickAnimeSearch: () => void;
}

const Search: VFC<Props> = (props) => {
    const { onClickAnimeSearch } = props
    return (
        <Box w='100%' pt='40px'>
            <FormControl pb='40px'>
                <Flex justify='center' align='center' >
                    <HStack spacing={4}>
                        <Box>
                            <YearInput />
                        </Box>
                        <Box>
                            <CourInput />
                        </Box>
                    </HStack>
                </Flex>
            </FormControl>

            <Flex justify='center' align='center'>
                <PraimaryButton onClickAnimeSearch={onClickAnimeSearch}/>
            </Flex>
        </Box>
    )
}

export default Search