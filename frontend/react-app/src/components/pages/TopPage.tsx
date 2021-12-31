import { Box } from "@chakra-ui/react";
import { VFC, useCallback, useEffect, memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Cour } from "../../store/Cour";
import { Year } from "../../store/Year";
import { ApiKeyValue } from "../../store/ApiKeyValue";
import AnimeCardList from "../organisms/AnimeCardList";
import Search from "../organisms/Search";
import { useCourFactory } from "../../customHooks/useCourFactory";
import { useAnimeApiSearch } from "../../customHooks/useAnimeApiSearch";
import { useLocation } from "react-router-dom";
import { useMessage } from "customHooks/message/useMessage";



const TopPage: VFC = memo(() => {
    const selectYear = useRecoilValue(Year)
    const selectCour = useRecoilValue(Cour)
    const location = useLocation<string>()
    const [ apiKeyValue, setApiKeyValue] = useRecoilState(ApiKeyValue)
    const { select_season } = useCourFactory()
    const { animeLists, getAnimes } = useAnimeApiSearch()
    const { showMessage } = useMessage()

    const onClickAnimeSearch = useCallback(() => {
        const rep = {year: selectYear, cour: select_season}
        setApiKeyValue(rep)  
    }, [selectYear, select_season])

    useEffect(() => {
        getAnimes()        
    }, [apiKeyValue])
    
    
    console.log(animeLists);
    return (
        <>
            {/* <Header /> */}
            <Box w={{base: '90%', md: '70%'}} h='100%' bg='#ffff' m='100px auto 20px auto' borderRadius='10px'>
                <Search onClickAnimeSearch={onClickAnimeSearch}/>
                <AnimeCardList animeLists={animeLists} />
            </Box>
        </>
    )
})

export default TopPage