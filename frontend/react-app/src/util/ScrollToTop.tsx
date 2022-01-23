import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation()
    
    //画面遷移した際に、スクロール位置が先頭に戻るよう処理
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return null
}