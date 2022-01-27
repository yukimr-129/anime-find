import { memo, useRef, useState, VFC, useEffect } from "react";

import { Box, Button, Text, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, VStack, FormErrorMessage } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import ReactStars from 'react-stars'
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useGetSize } from "customHooks/useGetSize";
import { createReview } from "lib/api/review/review";
import { useMessage } from "customHooks/message/useMessage";
import { CurrentUser, IsSignedIn } from "store/auth/Auth";
import { Submitreview } from "types/form/FormInputs";
import { ReviewReflection } from "store/ReviewReflection";

type  Props = {
    id: number
}

const ReviewModal: VFC<Props> = memo((props) => {
    const { id } = props
    const [ rating, setRating ] = useState(0)
    const [ errorMessage, setErrorMessage ] = useState('')
    const setReviewReflection = useSetRecoilState(ReviewReflection)
    const currentUser = useRecoilValue(CurrentUser)
    const isSignedIn = useRecoilValue(IsSignedIn)
    const initialRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const { partsSize } = useGetSize()
    const { showMessage } = useMessage()
    const { register, reset, formState: { errors }, handleSubmit, formState } = useForm<Submitreview>({
        mode: 'all',
        defaultValues: {
            title: '',
            comment: '',
        }
    })    
    

    //レビュー初期値
    const getRating = (rate: number) => {        
        setRating(rate)       
    }

    //レビュー送信
    const isEmptyError = rating === 0
    const onSubmitReview = async(data: Submitreview) => {
        if (currentUser && isSignedIn) {
            //星レビュー必須
            if (isEmptyError){
                setErrorMessage('評価を選択してください')
                return;
            } 
            const { title, comment } = data
            const params = {
                title: title,
                comment: comment,
                rate: rating,
                anime_id: id,
                user_id: currentUser.id
            }
    
            try {
                const res = await createReview(params)
                
                if(res.status === 200){
                    const { confirm } = res.data                    
                    confirm ? showMessage({title: 'レビューを投稿しました。', status: 'success'}) : showMessage({title: 'このアニメには既にレビューを投稿しています。', status: 'error'})
                    setReviewReflection((prevState) => !prevState)
                }else {
                    showMessage({title: 'レビュー投稿に失敗しました。', status: 'error'})
                }
                onClose()
            } catch (error) {
                showMessage({title: 'レビュー投稿に失敗しました。', status: 'error'})
                onClose()
            }
        }
        
    }
    
    //モーダルを閉じた場合、評価を初期化
    useEffect(() => {
        let isMounted = true
        if(!isOpen){
            isMounted && setRating(0)
            isMounted && setErrorMessage('')
            reset()
        }
        return () => { isMounted = false }
    }, [isOpen])

    return (
        <>
            <Button pl={0} size='xs' leftIcon={<EditIcon />} variant='none' onClick={onOpen}>レビューを書く</Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                size={partsSize}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>アニメレビュー</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmitReview)}>
                    <ModalBody pb={6}>
                        <Box>
                            <VStack align='left'>
                                <Text>レビュー評価</Text>
                                <ReactStars value={rating} size={30} half={false} onChange={getRating}/>
                                { isEmptyError && <Text color='#E53E3E' fontSize='0.875rem'>{errorMessage}</Text>}
                            </VStack>
                        </Box>

                        <FormControl mt={4} id='reviewArea' isRequired isInvalid={errors.title ? true : false}>
                            <FormLabel>タイトル</FormLabel>
                            <Input {...register('title', {required: 'タイトルを入力してください', maxLength: {value: 20, message: '20文字以下で入力してください'}})}/>
                            <FormErrorMessage>
                                {errors.title && errors.title.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl mt={4} id='reviewArea' isRequired isInvalid={errors.comment ? true : false}>
                            <FormLabel>レビューコメント</FormLabel>
                            <Textarea 
                                // name='reviewArea'
                                {...register('comment', {required: 'レビューコメントを入力してください', maxLength: {value: 500, message: '500文字以下で入力してください'}})}
                            />
                            <FormErrorMessage>
                                {errors.comment && errors.comment.message}
                            </FormErrorMessage>
                            </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' colorScheme='blue' mr={3} disabled={!formState.isValid} isLoading={formState.isSubmitting}　spinner={<BeatLoader size={8} color="white" />}　_hover={{opacity: 0.8}}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
                </ModalContent>
            </Modal>
        </>
    )
})

export default ReviewModal