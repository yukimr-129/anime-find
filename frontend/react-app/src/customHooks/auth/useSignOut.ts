import { useCallback } from "react"

import { useMessage } from "customHooks/message/useMessage"
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth/auth"
import { useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil"

import { CurrentUser, IsSignedIn } from "store/auth/Auth"
import { AuthLoding } from "store/loding/AuthLoding"

export const useSignOut = (text: string) => {
    const history = useHistory()
    const setIsSignedIn = useSetRecoilState(IsSignedIn)
    const setAuthLoding = useSetRecoilState(AuthLoding)
    const setCurrentUser = useSetRecoilState(CurrentUser)
    const { showMessage } = useMessage()

    const executionSignOut = useCallback(async() => {
        const res = await signOut()
                
        if (res.data.success === true){
             // サインアウト時には各Cookieを削除
            Cookies.remove("_access_token")
            Cookies.remove("_client")
            Cookies.remove("_uid")
    
            setIsSignedIn(false)
            setAuthLoding(true)
            
            setCurrentUser(undefined)
            history.push('/signin')
    
            showMessage({title: `${text}`, status: 'info'})
        }
    }, [setCurrentUser, setIsSignedIn])
    
    return { executionSignOut }
}