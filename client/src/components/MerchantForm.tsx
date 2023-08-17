import { useMerchantContext } from '../core/contexts/merchantContext'
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { MERCHANT_ACTIONS } from '../core/enums';
import { BsTelephoneFill } from 'react-icons/bs';
import UplaodImage from './UplaodImage';
import { isLoggedIn, updateMerchantConfiguration } from '../core/commonServices';
import { useState } from "react";
import { AuthComponent } from './LoginComponent';

const MerchantForm = () => {
    const { state, dispatch } = useMerchantContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const onImageUpload = (type: string, blobURI: string) => {
        if (!type && !blobURI) {
            throw new Error("Please add image to uplaod")
        }
        switch (type) {
            case "logo":
                dispatch({
                    type: MERCHANT_ACTIONS.SET_LOGO_URL,
                    payload: blobURI
                })
                break;
            case "signature":
                dispatch({
                    type: MERCHANT_ACTIONS.SET_SIGNATURE_URL,
                    payload: blobURI
                })
                break;

            default:
                break;
        }
    }

    const handleSave = () => {
        // Todo: Optimise this method
        if (!isLoggedIn()) {
            onOpen();
            return;
        }
        // state.merchant_companyName;
        // postData.logo = state.merchant_logo
        // postData.mobile = state.merchant_mobile;
        // postData.website = state.merchant_website;
        // postData.address = state.merchant_address;
        // postData.footNote = state.merchant_footNote;
        // postData.signature = state.merchant_signUrl;

        const paylaod = {
            brandName: state.merchant_companyName,
            logo: state.merchant_logo,
            mobile: state.merchant_mobile,
            website: state.merchant_website,
            address: state.merchant_address,
            footnote: state.merchant_footNote,
            signature: state.merchant_signUrl
        }
        updateMerchantConfiguration(paylaod).then(res => {
            toast({
                title: 'Success.',
                description: "Configuration added successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch(err => {
            console.error(err);
            toast({
                title: 'Failed.',
                description: "Some error occured in updating configurations",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }


    return (
        <>  {
            onOpen &&
            <AuthComponent onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
        }
            <Box maxW={'sm'} m={'auto'} pt={'10'}>
                {/* <Text fontSize={'2xl'} px={2} m={'auto'} mb={8} borderBottom={'1px'} w={'fit-content'}>
                    Merchant Info Form
                </Text> */}
                <form>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Upload Logo:</Text>
                        <UplaodImage
                            defaultLogoUrl={state.merchant_logo}
                            onChange={(blob: string) => {
                                onImageUpload('logo', blob)
                            }} />
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Company/Store Name:</Text>
                        <Input
                            size={'sm'}
                            type='text' value={state.merchant_companyName} onChange={(e) => {
                                dispatch({
                                    type: MERCHANT_ACTIONS.SET_COMPANY_NAME,
                                    payload: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Address:</Text>
                        <Input
                            size={'sm'}
                            type='text' value={state.merchant_address} onChange={(e) => {
                                dispatch({
                                    type: MERCHANT_ACTIONS.SET_ADDRESS,
                                    payload: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Mobile No:</Text>
                        <InputGroup>
                            <InputLeftAddon children={"+91"} h={'auto'} fontSize={'sm'} />
                            <Input size={'sm'} type='tel' placeholder='Phone number'
                                value={state.merchant_mobile} onChange={(e) => {
                                    dispatch({
                                        type: MERCHANT_ACTIONS.SET_MOBILE_NUMBER,
                                        payload: e.target.value
                                    })
                                }}
                            />
                        </InputGroup>
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Website URL:</Text>
                        <Input size={'sm'} type='text' placeholder='www.google.com'
                            value={state.merchant_website} onChange={(e) => {
                                dispatch({
                                    type: MERCHANT_ACTIONS.SET_WEBSITE_URL,
                                    payload: e.target.value
                                })
                            }}
                        />

                    </Box>
                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Footnote:</Text>
                        <Input size={'sm'} type='text' placeholder='Phone number'
                            value={state.merchant_footNote} onChange={(e) => {
                                dispatch({
                                    type: MERCHANT_ACTIONS.SET_FOOTNOTE,
                                    payload: e.target.value
                                })
                            }}
                        />

                    </Box>

                    <Box my={2}>
                        <Text fontSize={'sm'} mb='0.5'>Upload Signature:</Text>
                        <UplaodImage
                            defaultLogoUrl={state.merchant_signUrl}
                            onChange={(blob: string) => {
                                onImageUpload('signature', blob)
                            }} />
                    </Box>

                    <Flex w={'full'} justifyContent={'flex-end'}>
                        <Tooltip label='Save merchant details for future use.' hasArrow arrowSize={10}>
                            <Button px='8' mt={10} size={'sm'} colorScheme='teal' variant='solid' onClick={handleSave}>Save</Button>
                        </Tooltip>
                    </Flex>
                </form>
            </Box >
        </>
    )
}


export default MerchantForm