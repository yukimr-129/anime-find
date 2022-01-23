import React, { memo, VFC } from "react"

import { Drawer, DrawerContent, DrawerOverlay, DrawerHeader, DrawerBody, useDisclosure, Box, Divider, DrawerCloseButton, Flex, IconButton } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";

import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom"
import { CurrentUser } from "store/auth/Auth";

const MenuBar: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const current_user = useRecoilValue(CurrentUser)
    const id = current_user?.id

    return (
        <>
            <Flex w='70px' h='70px' cursor='pointer' align='center' justify='center'>
             <IconButton
                w='40px' 
                h='40px'
                aria-label="メニュー"
                icon={<HamburgerIcon boxSize={8}/>}
                size="xl"
                variant="unstyled"
                display='block'
                onClick={onOpen}
             />
            </Flex>
            <Drawer placement='right' size='xs' onClose={onClose} isOpen={isOpen} motionPreset='none'>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">MENU</DrawerHeader>
                        <DrawerBody p='0'>
                            <Box w="100%" p='16px 24px' _hover={{opacity: 0.8, backgroundColor: '#d7d7d8'}}>
                                <Link to={`/profile/${id}`}  onClick={onClose}>プロフィール</Link>
                            </Box>
                            <Divider />
                            <Box w="100%" p='16px 24px' _hover={{opacity: 0.8, backgroundColor: '#d7d7d8'}}>
                                <Link to={`/edit-password/${id}`} onClick={onClose}>パスワード変更</Link>
                            </Box>
                            <Divider />
                            <Box w="100%" p='16px 24px' _hover={{opacity: 0.8, backgroundColor: '#d7d7d8'}}>
                                <Link to={`/like/${id}`} onClick={onClose}>お気に入りアニメ</Link>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
})

export default MenuBar