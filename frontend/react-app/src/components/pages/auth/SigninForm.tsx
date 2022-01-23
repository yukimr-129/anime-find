import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useMessage } from "customHooks/message/useMessage";
import Cookies from "js-cookie";
import { signIn } from "lib/api/auth/auth";
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners"
import { useSetRecoilState } from "recoil";
import { memo, useCallback, VFC } from "react";

import { CurrentUser, IsSignedIn } from "store/auth/Auth";
import { SignInFormInputs } from "types/form/FormInputs";


const SigninForm: VFC = memo(() => {
    const setIsSignedIn = useSetRecoilState(IsSignedIn)
    const setCurrentUser = useSetRecoilState(CurrentUser)
    const history = useHistory()
    const { showMessage } = useMessage()

    const { register, formState: { errors }, handleSubmit, formState } = useForm<SignInFormInputs>({
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
          }
    })

    const handleOnSubmit = async(data: SignInFormInputs) => {
        const params: SignInFormInputs = {
            email: data.email,
            password: data.password
        }

        try {
            const res = await signIn(params)

            if (res.status === 200) {
                // ログインに成功した場合はCookieに各値を格納
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])
                
                setIsSignedIn(true)
                setCurrentUser(res.data.data)
                history.push({pathname: '/', state: 'signin'})

                showMessage({title: 'ログインしました', status: 'success'})
            } else {
                // showMessage({title: 'メールアドレスまたはパスワードが違います。', status: 'error'})
                showMessage({title: 'ログインに失敗しました。', status: 'error'})
            }
        } catch (error) {
            // showMessage({title: 'ログインに失敗しました。', status: 'error'})
            showMessage({title: 'メールアドレスまたはパスワードが違います。', status: 'error'})
        }
    }

    return (
        <>
            <Flex justify='center' align='center' h='100%' mt='90px'>
                <Box bg='white' w={{base: '90%', md: '2xl'}} p={4} borderRadius='10px' shadow='md'>
                    <Heading as='h1' size='lg' textAlign='center'>ログイン</Heading>
                    <Divider my={4}/>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <VStack spacing={5}>
                            <FormControl id='email' isRequired isInvalid={errors.email ? true : false}>
                                <FormLabel>メールアドレス</FormLabel>
                                <Input 
                                    type='email'
                                    placeholder='test@example.com' 
                                    {...register('email', { required: 'メールアドレスは必須です。', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "メールアドレス形式で入力してください。"}, })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id='password' isRequired isInvalid={errors.password ? true : false}>
                                <FormLabel>パスワード</FormLabel>
                                <Input 
                                    type='password' 
                                    {...register('password', {required: 'パスワードは必須です。'})}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button type="submit" disabled={!formState.isValid} isLoading={formState.isSubmitting} w='100%' color='white' bg='blue.400' _hover={{opacity: 0.8}} spinner={<BeatLoader size={8} color="white" />}>ログイン</Button>
                        </VStack>
                    </form>
                    
                </Box>
            </Flex>  
        </>
    )
})

export default SigninForm