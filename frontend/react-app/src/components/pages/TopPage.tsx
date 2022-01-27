import { Box } from "@chakra-ui/react";
import { VFC, useCallback, memo } from "react";

import AnimeCardList from "../organisms/AnimeCardList";
import Search from "../organisms/Search";
import { useAnimeApiSearch } from "../../customHooks/useAnimeApiSearch";


const TopPage: VFC = memo(() => {
    const { getAnimes } = useAnimeApiSearch()

    const onClickAnimeSearch = useCallback(() => {        
        getAnimes()
    }, [getAnimes])

    return (
        <>
            <Box w={{base: '90%', md: '70%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'>
                <Search onClickAnimeSearch={onClickAnimeSearch}/>
                <AnimeCardList />
            </Box>
        </>
    )
})

export default TopPage