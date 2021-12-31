import { IconButton, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack, Image, Center } from "@chakra-ui/react"
import { VFC, useState, useCallback, ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { MdPhotoCamera, MdCancel } from "react-icons/md";
import { BeatLoader } from "react-spinners"
import { useRecoilState } from "recoil";
import imageCompression from "browser-image-compression";

import { CurrentUser } from "store/auth/Auth";
import { UserProfileUpdate } from "types/form/FormInputs"
import { getCurrentUser, updateUserProfile } from "lib/api/auth/auth";
import { useMessage } from "customHooks/message/useMessage";


const UserProfile: VFC = () => {
    const [ currentUser, setCurrentUser ] = useRecoilState(CurrentUser)
    const [ preview, setPreview ] = useState<string>('')
    const [ userImage, setUserImage ] = useState<string | null>(currentUser?.image?.url ?? null)
    const [ uploadImage, setUploadImage ] = useState<File | null>()
    const { showMessage } = useMessage()
    
    const { register, formState: { errors }, handleSubmit, formState } = useForm<UserProfileUpdate>({
        mode: 'all',
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
        }
    })

    // ダミー画像
    const defaultSrc =　"https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

    const handleUpdateProfile = async(data: UserProfileUpdate) => {
        const { name, email } = data

        const formData = new FormData()
        formData.set("name", name)
        formData.set("email", email)

        //画像ファイルがあれば実行
        if(uploadImage) {
            //ファイル圧縮オプション 3MB以下
            const compressOptions = {
                maxSizeMB: 3,
            }
    
            const imageData = await imageCompression(uploadImage, compressOptions)
            formData.set("image", imageData, uploadImage.name)
            console.log(uploadImage)
        }else if(!uploadImage) {
            formData.set("image", '')
        }

        try {            
            const res = await updateUserProfile(formData)
            if (res.status === 200) {
                const user = await getCurrentUser()
                setCurrentUser(user?.data.data)
                showMessage({title: 'プロフィールを更新しました。', status: 'success'})
            } else {
                showMessage({title: 'プロフィールの更新に失敗しました。', status: 'error'})
            }
        } catch (error) {
            console.log(error)
            showMessage({title: 'プロフィールの更新に失敗しました。', status: 'error'})
        }
    }

    // プレビュー機能
    const previewImage = useCallback((e) => {
        const file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file))
    }, [])

    // アップロード
    const handleUploadImage = useCallback((e) => {
        const file = e.target.files[0]
        setUploadImage(file)
    }, [])

    // アップロード画像削除
    const ImageDelete = useCallback(() => {
        setPreview('')
        setUserImage(null)
        setUploadImage(null)
    }, [])

    return (
        <>
            <Flex justify='center' align='center' h='100%' mt='90px'>
                <Box bg='white' w={{base: '90%', md: '2xl'}} p={4} borderRadius='10px' shadow='md'>
                    <Heading as='h1' size='lg' textAlign='center'>プロフィール編集</Heading>
                    <Divider my={4}/>
                    <form onSubmit={handleSubmit(handleUpdateProfile)}>
                        <VStack spacing={5}>
                            <FormControl id='image' mb='20px'>
                                <Center>
                                    <Flex flexDirection='column' align='center' justify='center' position='relative'>
                                        <Box position='absolute' top='0' left='10px' cursor='pointer' _hover={{bg: 'none'}} onClick={ImageDelete}>
                                            <MdCancel size='25px'/>
                                        </Box>
                                        <Box w='200px' h='200px' borderRadius='999px' mb='20px'>
                                            <Image 
                                                src={preview ? preview : (
                                                    userImage ?? defaultSrc
                                                )} 
                                                alt="preview img" 
                                                w='200px' 
                                                h='200px' 
                                                objectFit='cover' 
                                                borderRadius='999px'
                                            
                                            />
                                        </Box>
                                        <FormLabel htmlFor="avatar">
                                            <Input
                                                display="none"
                                                type="file"
                                                id="avatar"
                                                name="image"
                                                accept="image/*"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    handleUploadImage(e)
                                                    previewImage(e)
                                                }}
                                            />
                                            {/* <IconButton as='span' id="avatar" cursor='pointer' aria-label='upload picture'>
                                                <MdPhotoCamera size='30px'/>
                                            </IconButton> */}
                                            <Button leftIcon={<MdPhotoCamera size='25px'/>} as='span' cursor='pointer' colorScheme="teal" variant="solid">
                                                画像をアップロード
                                            </Button>
                                        </FormLabel>
                                    </Flex>
                                </Center>
                            </FormControl>
                            <FormControl id='name' isRequired isInvalid={errors.name ? true : false}>
                                <FormLabel>ユーザーネーム</FormLabel>
                                <Input 
                                    type='text'
                                    {...register('name', {required: true, maxLength: 10})}
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
                                    // name='email' 
                                    placeholder='test@example.com' 
                                    {...register('email', { required: 'メールアドレスは必須です。', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "メールアドレス形式で入力してください。"}, })}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
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

export default UserProfile