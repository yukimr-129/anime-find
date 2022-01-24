import { Box } from "@chakra-ui/react";
import { VFC, useCallback, memo } from "react";
import { useRecoilValue } from "recoil";

import { ApiKeyValue } from "../../store/ApiKeyValue";
import AnimeCardList from "../organisms/AnimeCardList";
import Search from "../organisms/Search";
import { useCourFactory } from "../../customHooks/useCourFactory";
import { useAnimeApiSearch } from "../../customHooks/useAnimeApiSearch";


const TopPage: VFC = memo(() => {
    const apiKeyValue = useRecoilValue(ApiKeyValue)
    const { getAnimes } = useAnimeApiSearch()

    const onClickAnimeSearch = useCallback(() => {        
        getAnimes()
    }, [apiKeyValue])

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