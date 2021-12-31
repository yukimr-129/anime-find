import { Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import { useMessage } from "customHooks/message/useMessage"
import { getCurrentUser, updatePassword } from "lib/api/auth/auth"
import { useForm } from "react-hook-form"
import { BeatLoader } from "react-spinners"
import { useRecoilState } from "recoil"
import { CurrentUser } from "store/auth/Auth"
import { EditPasswordUpdate } from "types/form/FormInputs"

const EditPassword = () => {
    const [ currentUser, setCurrentUser ] = useRecoilState(CurrentUser)
    const { register, handleSubmit, formState: {errors}, formState, getValues } = useForm<EditPasswordUpdate>({
        mode: 'all',
        defaultValues: {
            password: '',
            passwordConfirmation: ''
        }
    })

    const { showMessage } = useMessage()

    const handleUpdatePassword = async(data: EditPasswordUpdate) => {
        const params: EditPasswordUpdate = {
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        }
        const { password, passwordConfirmation } = data
        const formData = new FormData()
        formData.set('password', password)
        formData.set('password_confirmation', passwordConfirmation)
        try {
            const res = await updatePassword(formData)
            console.log(res);
            
            // if () {
                const user = await getCurrentUser()
                setCurrentUser(user?.data.data)
                showMessage({title: 'パスワードを更新しました。再度ログインしてください', status: 'success'})
            // } else {
            // }
        } catch (error) {
            console.log(error)
            showMessage({title: 'プロフィールの更新に失敗しました。', status: 'error'})
        }
        
    }
    return (
        <>
            <Flex justify='center' align='center' h='100%' mt='90px'>
                <Box bg='white' w={{base: '90%', md: '2xl'}} p={4} borderRadius='10px' shadow='md'>
                    <Heading as='h1' size='lg' textAlign='center'>パスワード変更</Heading>
                    <Divider my={4}/>
                    <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <VStack spacing={5}>
                            <FormControl id='password' isRequired isInvalid={errors.password ? true : false}>
                                <FormLabel>新しいパスワード</FormLabel>
                                <Input 
                                    type='password'
                                    {...register('password', {required: 'パスワードは必須です。', pattern: {value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/, message: '半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上で設定してください。'}})}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id='passwordConfirmation' isRequired isInvalid={errors.passwordConfirmation ? true : false}>
                                <FormLabel>新しいパスワード確認用</FormLabel>
                                <Input 
                                   type='password'
                                   {...register('passwordConfirmation', {required: true, validate: value => value === getValues('password')})}
                                   />
                                <FormErrorMessage>
                                    {errors.passwordConfirmation?.type === 'required' && '確認用パスワードは必須です。'}
                                    {errors.passwordConfirmation?.type === 'validate' && "確認用パスワードが一致しません。"}
                                </FormErrorMessage>
                            </FormControl>
                            <Button type="submit" disabled={!formState.isValid} isLoading={formState.isSubmitting} w='100%' color='white' bg='blue.400' _hover={{opacity: 0.8}} spinner={<BeatLoader size={8} color="white" />}>更新</Button>
                        </VStack>
                    </form>
                </Box>
            </Flex>

        </>
    )
}

export default EditPassword