import { useEffect, useState } from "react";

type Size = () => {
    partsSize: string
}

export const useGetSize: Size = () => {
    const [ partsSize, setPartsSize ] = useState('xs');
    // //画面幅に応じたモーダルサイズ設定
    const innerWidth = window.innerWidth > 768
    useEffect(() => {
        innerWidth && setPartsSize('md')
    }, [innerWidth])

    return { partsSize }
}