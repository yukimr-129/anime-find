import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { client } from "../lib/api/client"
import { ApiKeyValue } from '../store/ApiKeyValue'
import { useMessage } from './message/useMessage'
import { AnnictApiType } from '../types/api/AnnictApiType'
import { AnimeLists } from '../store/AnimeLists'

type AnimeApiSearch = () => {
        animeLists: AnnictApiType[];
        getAnimes: () => Promise<void>;
    }

export const useAnimeApiSearch: AnimeApiSearch = () => {
    const [ apiKeyValue, setApiKeyValue ] = useRecoilState(ApiKeyValue)
    const [ animeLists, setAnimeLists ] = useRecoilState(AnimeLists)
    const { showMessage } = useMessage()
    // useEffect(() => {

        const getAnimes = async() => {
            try {
                const filter_season = `${apiKeyValue.year}-${apiKeyValue.cour}`
                const getanime = await client.get('/api/annicts/search', {
                    params: {
                        filter_season,
                    }
                })
                const anime_date: AnnictApiType[] = getanime.data.works
                setAnimeLists(anime_date)
            
            } catch (error) {
                showMessage({title: 'アニメ一覧の取得に失敗しました', status: "error"})
            }
         }

        // return () => {
        // }    
    // }, [apiKeyValue])    


    return { animeLists, getAnimes }
}