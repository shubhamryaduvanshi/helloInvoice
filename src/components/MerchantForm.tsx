import { useMerchantContext } from '../core/contexts/merchantContext'
import { Box, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, Text } from '@chakra-ui/react';
import { MERCHANT_ACTIONS } from '../core/enums';
import { BsTelephoneFill } from 'react-icons/bs';
import UplaodImage from './UplaodImage';


const MerchantForm = () => {
    const { state, dispatch } = useMerchantContext();

    const onImageUpload = (type: string, blobURI: string) => {
        if (!type && !blobURI) {
            throw new Error("Please add image to uplaod")
        }
        console.log(type, blobURI);

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

    return (
        <Box maxW={'sm'} m={'auto'} pt={'20'}>
            <Text fontSize={'2xl'} px={2} m={'auto'} mb={8} borderBottom={'1px'} w={'fit-content'}>
                Merchant Info Form
            </Text>
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
                    <Input size={'sm'} type='text' placeholder='Phone number'
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
            </form>
        </Box >
    )
}

export default MerchantForm