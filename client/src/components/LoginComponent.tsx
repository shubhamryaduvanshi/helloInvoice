import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Box, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react"
import { useState } from 'react';
import { postApi } from "../core/genericAPI";
import { merchantLogin, merchantRegister } from "../core/commonServices";
import { useMerchantContext } from "../core/contexts/merchantContext";
interface LoginComponentType {
    onOpen: any,
    isOpen: any,
    onClose: any
}

export const AuthComponent = ({ onOpen, isOpen, onClose }: LoginComponentType) => {

    const [isRegister, setIsRegister] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const { state, dispatch } = useMerchantContext();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const postData: any = {
            username: userName,
            password
        };
        if (isRegister) {
            postData.brandName = state.merchant_companyName;
            postData.logo = state.merchant_logo
            postData.mobile = state.merchant_mobile;
            postData.website = state.merchant_website;
            postData.address = state.merchant_address;
            postData.footNote = state.merchant_footNote;
            postData.signature = state.merchant_signUrl;
            onRegisterMerchant(postData);
            return;
        }
        onLoginMerchant(postData);
    }

    const onLoginMerchant = (payload: { username: string, password: string }) => {
        merchantLogin(payload).then(res => {
            storeAccessToken('accessToken', res.accessToken);
            storeAccessToken('merchantId', res.merchant.id);
            toast({
                title: 'Success.',
                description: "Logged in successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            resetFields();
            onClose();
        }).catch(error => {
            toast({
                title: 'Failed.',
                description: "Invalid Credetials",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.log(error);
        })
    }

    const onRegisterMerchant = (payload: { username: string, password: string, brandName: string, }) => {
        merchantRegister(payload).then(res => {
            storeAccessToken('accessToken', res.accessToken);
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            resetFields();
            setIsRegister(false);
        }).catch(error => {
            toast({
                title: 'Failed.',
                description: "Some error occured while adding merchant",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.log(error);
        })
    }

    const storeAccessToken = (key: string, token: string) => {
        window.localStorage.setItem(key, token);
    }

    const resetFields = () => {
        setUserName("");
        setPassword("");
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            minH={'50vh'}
                            align={'center'}
                            justify={'center'}
                        >
                            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        {isRegister ? "Create a new account" : "Sign in to your account"}</Heading>
                                    <Text fontSize={'lg'} color={'gray.600'}>
                                        to enjoy all of our cool <Text as={'span'} color={'blue.400'}>features</Text> ✌️
                                    </Text>
                                </Stack>
                                <Box>
                                    <Stack spacing={4}>
                                        <FormControl id="username">
                                            <FormLabel>Username</FormLabel>
                                            <Input name="username" type="text" value={userName} onChange={(e) => {
                                                setUserName(e.target.value)
                                            }} />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel>Password</FormLabel>
                                            <Input type="password" name="password" value={password} onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} />
                                        </FormControl>
                                        <Stack spacing={10}>
                                            <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}>
                                                <Text cursor={'pointer'} onClick={() => {
                                                    setIsRegister(!isRegister)
                                                }}>{isRegister ? "Sign in to account" : "Create new account"}</Text>
                                                <Text color={'blue.400'}>Forgot password?</Text>
                                            </Stack>
                                            <Button
                                                onClick={handleSubmit}
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                {isRegister ? "Register" : "Sign in"}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Flex>

                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}