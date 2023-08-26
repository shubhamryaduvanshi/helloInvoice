import { useContext } from 'react';
import { Box, Container, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, forwardRef } from '@chakra-ui/react'
import { BsBrowserChrome } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
// import { UserContext } from '../../core/context/UserContext';
import { formatMobileNumber, getFormattedAmount } from '../../core/utility';
import { useMerchantContext } from '../../core/contexts/merchantContext';
import { useCustomerContext } from '../../core/contexts/customerContext';
import { ProductListItemType } from '../../core/commonTypes';

interface FooterComponentProps {
    mobileNumber: string,
    webSite: string,
    signature: string
}

interface TotalAndOtherInfoComponentProps {
    subTotalAmt: number;
    ownerFootNote: string;
    taxPercentage: number;
    totalAmount: number
}

const Template1 = forwardRef((props, ref) => {
    // const { state.merchant_companyName, state.merchant_logo, state.merchant_address, state.merchant_mobile, state.merchant_website, state.merchant_signUrl, state.merchant_footNote }: MerchantContextValueType = useContext(UserContext);
    const { state } = useMerchantContext();
    const { customerState } = useCustomerContext();
    return (
        <>
            <Container ref={ref} mt={4} maxW={'container.sm'} shadow={'lg'} id='template-printable-content' bgColor={'white'} >
                {/* Header starts here */}
                <Flex alignItems={'center'} gap={4} px='8' pt='4' pb='8' bgColor={'white'}>
                    <Box h={12} w={12}>
                        <Image src={state.merchant_logo} alt='companyLogo' height={'100%'} width={'100%'} objectFit={'contain'} />
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'} fontSize={'2xl'}>{state.merchant_companyName}</Text>
                        <Text w={72}> {state.merchant_address}</Text>
                    </Box>
                </Flex>

                {/* Yellow Big Border Starts here */}
                <Box w='full' bg={'yellow.400'} h='14' pr='12'>
                    <Text bg={'white'} w='fit-content' ml='auto' px='4' fontSize={'6xl'}
                        textTransform={'uppercase'}
                        pos={'relative'}
                        top={-4}
                    >
                        Invoice
                    </Text>
                </Box>

                {/* Invoice Basic Info Starts here */}
                <Box pt='10' px='8' bg={'white'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>
                        Invoice To:
                    </Text>
                    <Flex justifyContent={'space-between'}>
                        <Box w='54'>
                            <Flex fontWeight={'semibold'} alignItems={'center'} gap={2}><FaUser /> <Text>{customerState.customer_fullName}</Text></Flex>
                            <Flex alignItems={'center'} gap={2}><MdLocationOn /> <Text>{customerState.customer_address}</Text></Flex>
                            <Flex alignItems={'center'} gap={2}><AiFillPhone /> <Text>+91 {formatMobileNumber(customerState.customer_mobile)}</Text></Flex>
                        </Box>
                        <Box>
                            <Flex w='full'>
                                <Text fontWeight={'semibold'} mr='2'>Invoice # </Text>
                                <Text> {customerState.customer_inv_no}</Text>
                            </Flex>
                            <Flex w='full'>
                                <Text fontWeight={'semibold'} mr='2'> Date</Text>
                                <Text>{customerState.customer_inv_date}</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                {/* Invoice Item Table Starts here */}
                <Box px={'8'} mx='auto' pt='10' pb='8' bg={'white'}>
                    <ItemTable customerProductList={customerState.customer_product_list_items} />
                </Box>

                {/* Invoice Final Price and Other Info Starts here */}
                <Box pl='8' mx='auto' pt='10' bg={'white'} pb={'20'}>
                    <TotalAndOtherInfo
                        subTotalAmt={customerState.customer_sub_total_amt}
                        ownerFootNote={state.merchant_footNote}
                        taxPercentage={customerState.customer_tax_percent}
                        totalAmount={customerState.customer_total_amt}
                    />
                </Box>

                {/* Footer starts here */}
                <Box bg={'white'} borderTop={'5px solid #ECC94B'} pos={'relative'}>
                    <Footer
                        mobileNumber={state.merchant_mobile}
                        webSite={state.merchant_website}
                        signature={state.merchant_signUrl}
                    />
                </Box>

            </Container >
        </>
    )
})

const ItemTable = ({ customerProductList }: ProductListItemType[] | [] | any) => {
    return (
        <TableContainer >
            <Table variant='striped'>
                <Thead bg={'gray.700'}>
                    <Tr>
                        <Th color={'white'} fontSize={'sm'} fontWeight={'medium'}>Sr No.</Th>
                        <Th color={'white'} fontSize={'sm'} fontWeight={'medium'}>Item Description</Th>
                        <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Price</Th>
                        <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Qty</Th>
                        <Th isNumeric color={'white'} fontSize={'sm'} fontWeight={'medium'}>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        customerProductList && customerProductList.map((item: ProductListItemType, index: number) => (
                            <Tr key={item.id}>
                                <Td>{index + 1}</Td>
                                <Td textTransform={'capitalize'}>{item.title}</Td>
                                <Td isNumeric>{getFormattedAmount(item.price)}</Td>
                                <Td isNumeric>{item.quantity}</Td>
                                <Td isNumeric>{getFormattedAmount(item.totalPrice)}</Td>
                            </Tr>
                        ))
                    }
                    {/* <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td ></Td>
                    </Tr> */}
                    {/* <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td ></Td>
                    </Tr> */}

                </Tbody>
                {/* <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot> */}
            </Table>
        </TableContainer>
    )
}

const TotalAndOtherInfo = ({ ownerFootNote, subTotalAmt, taxPercentage, totalAmount }: TotalAndOtherInfoComponentProps) => {
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
                    <Text>{getFormattedAmount(subTotalAmt)}</Text>
                </Flex>
                <Flex fontWeight={'medium'} my='1' pr='8' alignItems={'center'} pl='4'>
                    <Text w='24'>Tax :</Text>
                    <Text>{taxPercentage}%</Text>
                </Flex>
                <Flex mt='4' gap={12} bg={'yellow.400'} fontWeight={'bold'} py='3' pr='20' pl='4'>
                    Total: <Text>{getFormattedAmount(totalAmount)}</Text>
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