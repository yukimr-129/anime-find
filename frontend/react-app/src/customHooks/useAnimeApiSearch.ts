import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { client } from "../lib/api/client"
import { ApiKeyValue } from '../store/ApiKeyValue'
import { useMessage } from './message/useMessage'
import { AnnictApiType } from '../types/api/AnnictApiType'
import { AnimeLists } from '../store/AnimeLists'
import { HasMore } from 'store/loding/HasMore'
import { LoadPage } from 'store/LoadPage'

type AnimeApiSearch = () => {
        getAnimes: () => void;
}

export const useAnimeApiSearch: AnimeApiSearch = () => {
    const setHasMore = useSetRecoilState(HasMore)
    const setLoadPage = useSetRecoilState(LoadPage)
    const setAnimeLists = useSetRecoilState(AnimeLists)
    const apiKeyValue = useRecoilValue(ApiKeyValue)
    const { showMessage } = useMessage()
        
        //検索結果最初のリスト取得
        const getAnimes = useCallback(async() => {
            try {
                const filter_season = `${apiKeyValue.year}-${apiKeyValue.cour}`
                const res = await client.get('/annicts/search', {
                    params: {
                        filter_season,
                        page: 1
                    }
                })

                if (res.status === 200) {
                    const animeDate: AnnictApiType[] = res.data.works 
            
                    setAnimeLists(animeDate)
    
                    //検索でリスト再取得時にInfiniteScrollの値初期化
                    setHasMore(true)
                    setLoadPage(1)  
                } else {
                    console.error('status error')
                }
                
            } catch (error) {
                showMessage({title: 'アニメ一覧の取得に失敗しました', status: "error"})
            } 
        }, [apiKeyValue])

    return { getAnimes }
}