import { useState, useCallback, useEffect } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { client } from "lib/api/client";
import { AnimeLists } from "store/AnimeLists";
import { ApiKeyValue } from "store/ApiKeyValue";
import { HasMore } from "store/loding/HasMore";
import { AnnictApiType } from "types/api/AnnictApiType";
import { useMessage } from "./message/useMessage";
import { LoadPage } from "store/LoadPage";


type NextAnimes = (page: number) => {
    isLoading: boolean;
    animeLists: AnnictApiType[];
}

export const useNextAnimes: NextAnimes = (page: number) => {
    const [ isLoading, setIsLoding ]  = useState(false);
    const [ animeLists, setAnimeLists ] = useRecoilState(AnimeLists)
    const setHasMore = useSetRecoilState(HasMore)
    const apiKeyValue = useRecoilValue(ApiKeyValue)
    const loadPage = useRecoilValue(LoadPage)
    const { showMessage } = useMessage()

    const getNextAnimes = useCallback(async() => {        
        try {
            setIsLoding(true)
            const filter_season = `${apiKeyValue.year}-${apiKeyValue.cour}`
            const res = await client.get('/annicts/search', {
                params: {
                    filter_season,
                    page
                }
            })

            if (res.status === 200) {
                const animeDate: AnnictApiType[] = res.data.works

                //取得できるアニメがなければ続きを読み込むかの判定を変更
                animeDate.length < 1 && setHasMore(false)
                
                //重複データ削除
                const dataList = [...animeLists, ...animeDate]            
                
                let map = new Map(dataList.map<[number, AnnictApiType]>(data => [data.id, data]));
                const distinctDataList = Array.from(map.values())
    
                setAnimeLists(distinctDataList)
                setIsLoding(false) 
            } else {
                console.error('status error')
            }
        } catch (error) {
            showMessage({title: 'アニメ一覧の取得に失敗しました', status: "error"})
        }
    },[loadPage])

    useEffect(() => {
        let isMounted = true
        isMounted && getNextAnimes()
        return () => {
            isMounted = false
        }
    }, [loadPage])

    return { animeLists, isLoading }
}

