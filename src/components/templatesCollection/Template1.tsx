import { useContext } from 'react';
import { Box, Container, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { BsBrowserChrome } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
// import { UserContext } from '../../core/context/UserContext';
import { MerchantContextValueType } from '../../core/commonTypes';
import { formatMobileNumber } from '../../core/utility';
import { useMerchantContext } from '../../core/contexts/merchantContext';

interface FooterComponentProps {
    mobileNumber: string,
    webSite: string,
    signature: string
}

interface TotalAndOtherInfoComponentProps {
    ownerFootNote: string
}

const Template1 = () => {
    // const { state.merchant_companyName, state.merchant_logo, state.merchant_address, state.merchant_mobile, state.merchant_website, state.merchant_signUrl, state.merchant_footNote }: MerchantContextValueType = useContext(UserContext);
    const { state } = useMerchantContext();



    return (
        <>
            <Container maxW={'container.md'} shadow={'lg'} p='0' >
                {/* Header starts here */}
                <Flex alignItems={'center'} gap={4} px='8' pt='12'>
                    <Box h={12} w={12}>
                        <Image src={state.merchant_logo} alt='companyLogo' height={'100%'} width={'100%'} objectFit={'contain'} />
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'} fontSize={'2xl'}>{state.merchant_companyName}</Text>
                        <Text w={72}> {state.merchant_address}</Text>
                    </Box>
                </Flex>

                {/* Yellow Big Border Starts here */}
                <Box w='full' bg={'yellow.400'} h='14' pr='12' mt='8'>
                    <Text bg={'white'} w='fit-content' ml='auto' px='4' fontSize={'6xl'}
                        textTransform={'uppercase'}
                        pos={'relative'}
                        top={-4}
                    >
                        Invoice
                    </Text>
                </Box>

                {/* Invoice Basic Info Starts here */}
                <Box mt='10' px='8'>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                        Invoice To:
                    </Text>
                    <Flex justifyContent={'space-between'}>
                        <Box w='54'>
                            <Flex fontWeight={'semibold'} alignItems={'center'} gap={2}><FaUser /> <Text>Dwayene Clark</Text></Flex>
                            <Flex alignItems={'center'} gap={2}><MdLocationOn /> <Text>4567 Ross Street,
                                Herminie,United States,25656</Text></Flex>
                            <Flex alignItems={'center'} gap={2}><AiFillPhone /> <Text> +91 898565456</Text></Flex>
                        </Box>
                        <Box>
                            <Flex w='full'>
                                <Text fontWeight={'semibold'} mr='2'>Invoice # </Text>
                                <Text> INV2552</Text>
                            </Flex>
                            <Flex w='full'>
                                <Text fontWeight={'semibold'} mr='2'> Date</Text>
                                <Text>12/05/2023</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                {/* Invoice Item Table Starts here */}
                <Box px={'8'} mx='auto' mt='10' pb='8'>
                    {/* <ItemTable /> */}
                </Box>

                {/* Invoice Final Price and Other Info Starts here */}
                <Box pl='8' mx='auto' mt='10'>
                    <TotalAndOtherInfo
                        ownerFootNote={state.merchant_footNote}
                    />
                </Box>

                {/* Footer starts here */}
                <Box mt='20' borderTop={'5px solid #ECC94B'} pos={'relative'}>
                    <Footer
                        mobileNumber={state.merchant_mobile}
                        webSite={state.merchant_website}
                        signature={state.merchant_signUrl}
                    />
                </Box>

            </Container >
        </>
    )
}

// const ItemTable = () => {
//     const itemsInfo = [
//         {
//             sr: 1,
//             itemDescription: "This is a test product",
//             price: 15,
//             quantity: 2,
//             finalPrice: 30
//         },
//         {
//             sr: 2,
//             itemDescription: "Laptop Bag",
//             price: 449,
//             quantity: 1,
//             finalPrice: 449
//         }
//     ]
//     return (
//         <TableContainer >
//             <Table variant='striped'>
//                 <Thead bg={'gray.700'}>
//                     <Tr>
//                         <Th color={'white'} fontSize={'sm'} fontWeight={'medium'}>Sr No.</Th>
//                         <Th color={'white'} fontSize={'sm'} fontWeight={'medium'}>Item Description</Th>
//                         <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Price</Th>
//                         <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Qty</Th>
//                         <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Total</Th>
//                     </Tr>
//                 </Thead>
//                 <Tbody>
//                     {
//                         itemsInfo?.map(item => (
//                             <Tr key={item.sr}>
//                                 <Td>{item.sr}</Td>
//                                 <Td>{item.itemDescription}</Td>
//                                 <Td isNumeric>{item.price}</Td>
//                                 <Td isNumeric>{item.quantity}</Td>
//                                 <Td isNumeric>{item.finalPrice}</Td>
//                             </Tr>
//                         ))
//                     }
//                     <Tr>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td ></Td>
//                     </Tr>
//                     <Tr>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td></Td>
//                         <Td ></Td>
//                     </Tr>

//                 </Tbody>
//                 {/* <Tfoot>
//                     <Tr>
//                         <Th>To convert</Th>
//                         <Th>into</Th>
//                         <Th isNumeric>multiply by</Th>
//                     </Tr>
//                 </Tfoot> */}
//             </Table>
//         </TableContainer>
//     )
// }

const TotalAndOtherInfo = ({ ownerFootNote }: TotalAndOtherInfoComponentProps) => {
    return (
        <Flex justifyContent={'space-between'}>
            {/* Left side content starts here */}
            <Box w='50%'>
                <Text fontSize={'md'} fontWeight={'semibold'}>
                    {ownerFootNote}
                </Text>
                <Box mt='4'>
                    <Text fontSize={'md'} fontWeight={'semibold'}>Terms & Conditions</Text>
                    <Text fontSize={'xs'}>Once your free terms of service policy is generated, you’ll be able to continue customizing and making adjustments until it’s perfect. </Text>
                </Box>
            </Box>
            {/* Right Side Content Starts Here */}
            <Box w='auto'>
                <Flex fontWeight={'medium'} pr='8' alignItems={'center'} pl='4' >
                    <Text w='24'>Sub Total :</Text>
                    <Text>$15454.21</Text>
                </Flex>
                <Flex fontWeight={'medium'} my='1' pr='8' alignItems={'center'} pl='4'>
                    <Text w='24'>Tax :</Text>
                    <Text>0.00%</Text>
                </Flex>
                <Flex mt='4' gap={12} bg={'yellow.400'} fontWeight={'bold'} py='3' pr='20' pl='4'>
                    Total: <Text>$15454.21</Text>
                </Flex>
            </Box>
        </Flex>
    )
}

const Footer = ({ mobileNumber, webSite, signature }: FooterComponentProps) => {
    return (
        <>
            <Flex flexDir={'column'} pos={'absolute'} top={-12} right={12} px='6' bg='white'>
                <Image src={signature} alt='sign' h={'12'} w='24' objectFit={'contain'} mx={'auto'} />
                <Text pos={'relative'} zIndex={'docked'} borderTop={'3px solid'} borderColor={'gray.700'} px='8' bg={'white'} w='fit-content' color={'gray.600'}>Authorised Sign</Text>
            </Flex>
            {/* Bottom infos */}
            <Flex gap={4} pb='2' alignItems={'center'} px='8' pt='2'>
                <Flex alignItems={'center'} gap={2}><AiFillPhone /> <Text> {formatMobileNumber(mobileNumber)}</Text></Flex> |
                <Flex alignItems={'center'} gap={2}><BsBrowserChrome /> <Text> {webSite}</Text></Flex>
            </Flex>

        </>
    )
}

export default Template1