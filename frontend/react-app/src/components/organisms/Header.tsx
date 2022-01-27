import { memo, VFC } from "react"

import { Flex, Box, Button, HStack } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"

import Logo from "../atoms/header/Logo"
import MenuBar from "../atoms/header/MenuBar"
import { CurrentUser, IsSignedIn } from "store/auth/Auth"
import { useHistory } from "react-router-dom"
import { useMessage } from "customHooks/message/useMessage"
import { useSignOut } from "customHooks/auth/useSignOut"

const Header: VFC = memo(() => {
    const history = useHistory()
    const isSignedIn = useRecoilValue(IsSignedIn)
    const currentUser = useRecoilValue(CurrentUser)
    const { executionSignOut } = useSignOut('ログアウトしました')
    const { showMessage } = useMessage()

    //ログアウト
    const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            // const res = await signOut()
            
            // if (res.data.success === true){
            //      // サインアウト時には各Cookieを削除
            //     Cookies.remove("_access_token")
            //     Cookies.remove("_client")
            //     Cookies.remove("_uid")

            //     setIsSignedIn(false)
            //     setAuthLoding(true)
                
            //     setCurrentUser(undefined)
            //     history.push('/signin')

            //     showMessage({title: 'ログアウトしました', status: 'info'})
            // }
            await executionSignOut()
            
        } catch (error) {
            showMessage({title: 'ログアウトに失敗しました', status: 'error'})
        }
    }

    //ログイン
    const signInHistory = () => {
        history.push('/signin')
    }

    //新規登録
    const signUpHistory = () => {
        history.push('/signup')
    }

    return (
        <>
        <Box as='header' h='70px' w='100%' bg='rgba(256,256,256,.75)' borderBottom='solid 4px rgba(26,187,154,.3)' boxShadow='0 1px 4px rgb(0 0 0 / 30%)' position='fixed' top='0' zIndex='999'>
            <Flex align='center' justify='space-between' h='70px' padding={{ base: 3, md: 5 }}>
                <Box ml='20px'>
                    <Logo />    
                </Box>
                <Flex justify='space-between' align='center'>
                    <HStack spacing={5}>
                        { isSignedIn && currentUser ? (
                            <>
                                <HStack>
                                    <Button size='xs' p={{base: 2, md: 4}} colorScheme="red" onClick={handleSignOut}>ログアウト</Button>
                                    <MenuBar />
                                </HStack>
                            </>
                        ) : (
                            <>
                                <Button size='xs' p={{base: 2, md: 4}} colorScheme="blue" onClick={signInHistory}>ログイン</Button>
                                <Button size='xs' p={{base: 2, md: 4}} colorScheme="teal" onClick={signUpHistory}>新規登録</Button>
                            </>
                        )}
                    </HStack>
                </Flex>
            </Flex>
            <Box position='absolute' bottom='-4px' h='4px' bg='#1abb9a'></Box>
        </Box>
        </>
    )
})

export default Header