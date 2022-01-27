import { memo, VFC } from "react"

import { Box, Flex, Heading,  VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Divider } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { useSetRecoilState } from "recoil"

import { useMessage } from "customHooks/message/useMessage"
import { signUp } from "lib/api/auth/auth"
import { CurrentUser, IsSignedIn } from "store/auth/Auth"
import { SignUpFormInputs } from "types/form/FormInputs"
import Head from "meta/Head"

const SignUpForm: VFC = memo(() => {
    const setIsSignedIn = useSetRecoilState(IsSignedIn)
    const setCurrentUser = useSetRecoilState(CurrentUser)
    const history = useHistory()
    const { showMessage } = useMessage()

    const { register, formState: { errors }, handleSubmit, formState, getValues } = useForm<SignUpFormInputs>({
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          }
    })

    const handleOnSubmit = async(data: SignUpFormInputs) => {
        const params: SignUpFormInputs = {
            name:data.name,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
        }

        try {
            const res = await signUp(params)

            if (res.status === 200) {
                // ログインに成功した場合はCookieに各値を格納
                Cookies.set("_access_token", res.headers["access-token"])
                Cookies.set("_client", res.headers["client"])
                Cookies.set("_uid", res.headers["uid"])
                
                setIsSignedIn(true)
                setCurrentUser(res.data.data)
                history.push({pathname: '/'})
            } else {
                showMessage({title: '新規登録に失敗しました。', status: 'error'})
            }
        } catch (error) {
            showMessage({title: '新規登録に失敗しました。', status: 'error'})
        }
    }

    return (
        <>
            <Head title='anime-find | 新規登録'/>
            <Flex justify='center' align='center' h='100%' mt='90px'>
                <Box bg='white' w={{base: '90%', md: '2xl'}} p={4} borderRadius='10px' shadow='md'>
                    <Heading as='h1' size='lg' textAlign='center'>新規登録</Heading>
                    <Divider my={4}/>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <VStack spacing={5}>
                            <FormControl id='name' isRequired isInvalid={errors.name ? true : false}>
                                <FormLabel>ユーザーネーム</FormLabel>
                                <Input 
                                    type='text'
                                    {...register('name', { required: true, maxLength: 10})}
                                />
                                <FormErrorMessage>
                                    {errors.name?.type === 'required' && 'ユーザーネームは必須です。' }
                                    {errors.name?.type === 'maxLength' && 'ユーザーネームは10文字以内で設定してください。' }
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id='email' isRequired isInvalid={errors.email ? true : false}>
                                <FormLabel>メールアドレス</FormLabel>
                                <Input 
                                    type='email'
                                    placeholder='test@example.com' 
                                    {...register('email', { required: 'メールアドレスは必須です。', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'メールアドレス形式で入力してください。'}, })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id='password' isRequired isInvalid={errors.password ? true : false}>
                                <FormLabel>パスワード</FormLabel>
                                <Input 
                                    type='password' 
                                    {...register('password', {required: 'パスワードは必須です。', pattern: {value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/, message: '半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上で設定してください。'}})}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id='passwordConfirmation' isRequired isInvalid={errors.passwordConfirmation ? true : false}>
                                <FormLabel>確認用パスワード</FormLabel>
                                <Input 
                                    type='password' 
                                    {...register('passwordConfirmation', {required: true, validate: value => value === getValues('password')})}
                                />
                                <FormErrorMessage>
                                    {errors.passwordConfirmation?.type === 'required' && '確認用パスワードは必須です。'}
                                    {errors.passwordConfirmation?.type === 'validate' && "確認用パスワードが一致しません。"}
                                </FormErrorMessage>
                            </FormControl>
                            <Button type="submit" disabled={!formState.isValid} isLoading={formState.isSubmitting} w='100%' color='white' bg='blue.400' _hover={{opacity: 0.8}} spinner={<BeatLoader size={8} color="white" />}>新規登録</Button>
                        </VStack>
                    </form>    
                </Box>
            </Flex>  
        </>
    )
})

export default SignUpForm