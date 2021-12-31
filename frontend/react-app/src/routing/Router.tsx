import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"

import TopPage from "../components/pages/TopPage"
import SignUpForm from '../components/pages/auth/SignUpForm'
import SigninForm from '../components/pages/auth/SigninForm'
import { AuthLoding } from "store/loding/AuthLoding"
import { CurrentUser, IsSignedIn } from "store/auth/Auth"
import { useRecoilState } from "recoil"
import { getCurrentUser } from "lib/api/auth/auth"
import CommonLayout from 'components/templates/CommonLayout'
import FavoriteAnime from 'components/pages/favorites/FavoriteAnime'
import UserProfile from 'components/pages/auth/UserProfile'
import EditPassword from 'components/pages/auth/EditPassword'

const Router = () => {
    const [ loding, setLoding ] = useState(true)
    const [ authLoding, setAuthLoding] = useRecoilState(AuthLoding)
    const [ isSignedIn, setIsSignedIn ] = useRecoilState(IsSignedIn)
    const [ currentUser, setCurrentUser ] = useRecoilState(CurrentUser)

    // 認証済みのユーザーがいるかどうかチェック
    // 確認できた場合はそのユーザーの情報を取得
    const handleGetCurrentUser = async () => {
        try {
        const res = await getCurrentUser()
        console.log(res);
            
            if (res?.data.is_login === true) {
                setIsSignedIn(true)
                setCurrentUser(res?.data.data)
                console.log(currentUser)
            } else {
                setIsSignedIn(false)
                setCurrentUser(undefined)
                console.log("No current user")
            }
        } catch (err) {
            console.log(err)
        }
        
        setAuthLoding(false)
        console.log(authLoding);
        console.log(isSignedIn);
    }

    useEffect(() => {
        handleGetCurrentUser()
    }, [isSignedIn])

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
                        <Route exact path='/' render={() => (
                            <TopPage />
                        )} />
                        <Route path='/like/:user_id' render={() => (
                            <FavoriteAnime />
                        )} />
                        <Route path='/profile/:user_id' render={() => (
                            <UserProfile />
                        )} />
                        <Route path='/edit-password/:user_id' render={() => (
                            <EditPassword />
                        )} />
                    </>
                ) : (
                    <Redirect to="/signin" />
                )}

                {/* <Route path='' render={() => (
                    <Login />
                )} /> */}
                {/* <Route path='' render={() => (
                    <MyAccount />
                )} /> */}

            </Switch>
        </CommonLayout>
    )
}

export default Router