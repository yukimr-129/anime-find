import { memo, useEffect, VFC } from 'react'

import { Redirect, Route, Switch } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"

import TopPage from "../components/pages/TopPage"
import SignUpForm from '../components/pages/auth/SignUpForm'
import SigninForm from '../components/pages/auth/SigninForm'
import { AuthLoding } from "store/loding/AuthLoding"
import { CurrentUser, IsSignedIn } from "store/auth/Auth"
import { getCurrentUser } from "lib/api/auth/auth"
import CommonLayout from 'components/templates/CommonLayout'
import FavoriteAnime from 'components/pages/favorites/FavoriteAnime'
import UserProfile from 'components/pages/auth/UserProfile'
import EditPassword from 'components/pages/auth/EditPassword'
import ReviewPage from 'components/pages/review/ReviewPage'
import Page404 from 'components/pages/error/Page404'
import Calendar from 'components/pages/calendar/Calendar'
import { useTracking } from 'customHooks/ga/useTracking'

const Router: VFC = memo(() => {
    const [ authLoding, setAuthLoding] = useRecoilState(AuthLoding)
    const [ isSignedIn, setIsSignedIn ] = useRecoilState(IsSignedIn)
    const setCurrentUser = useSetRecoilState(CurrentUser)
    useTracking('UA-222059306-1')
    useTracking('G-QSQHHDBG86')

    useEffect(() => {
        let isMounted = true
        // 認証済みのユーザーがいるかどうかチェック
        // 確認できた場合はそのユーザーの情報を取得
        const handleGetCurrentUser = async () => {
            try {
            const res = await getCurrentUser()
                
                if (res?.data.is_login === true) {
                    setIsSignedIn(true)
                    setCurrentUser(res?.data.data)
                } else {
                    setIsSignedIn(false)
                    setCurrentUser(undefined)
                }
            } catch (error) {
                console.error(error)
            }
            
            setAuthLoding(false)
        }

        handleGetCurrentUser()

        return () => {
            isMounted = false
        }
    }, [isSignedIn, setCurrentUser])

    return (
        <CommonLayout>
            <Switch>
                <Route exact path="/signup" render={() => (
                    <SignUpForm />
                )} />

                <Route exact path="/signin" render={() => (
                    <SigninForm />
                )} />
                    
                {!authLoding && isSignedIn ? (
                    <>
                        <Switch>
                            <Route exact path='/' render={() => (
                                <TopPage />
                            )} />
                            <Route path='/like/:user_id' render={() => (
                                <FavoriteAnime />
                            )} />
                            <Route path='/review/:anime_id' render={() => (
                                <ReviewPage />
                            )} />
                            <Route path='/profile/:user_id' render={() => (
                                <UserProfile />
                            )} />
                            <Route path='/edit-password/:user_id' render={() => (
                                <EditPassword />
                            )} />
                            <Route path='/calendar/:user_id' render={() => (
                                <Calendar />
                            )} />
                            <Route path='*' render={() => (
                                <Page404 />
                            )} />
                        </Switch>
                    </>
                ) : (
                    <Redirect to="/signin" />
                )}

                <Route path="*" render={() => (
                    <Page404 />
                )} />
            </Switch>
        </CommonLayout>
    )
})

export default Router