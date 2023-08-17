import { Container, Flex, Image, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { useMerchantContext } from '../../core/contexts/merchantContext';
import { useCustomerContext } from '../../core/contexts/customerContext';
import { FaUser } from 'react-icons/fa';
import { ProductListItemType } from '../../core/commonTypes';
import { formatMobileNumber, getFormattedAmount } from '../../core/utility';


type HeaderProps = {
    merchantLogo: string;
    invoiceNumber: string;
}

type CustomerBillingInfoProps = {
    name: string;
    address: string;
    mobile: string;
}

type TaxAndTotalProps = {
    subTotalAmt: number,
    taxPercentage: number,
    totalAmount: number
}

type FooterProps = {
    footNote: string,
    signUrl: string,
    mobile: string,
    address: string,
    website: string
}

const Template2 = () => {
    const { state } = useMerchantContext();
    const { customerState } = useCustomerContext();

    return (
        <Container textTransform={'uppercase'} w={'full'} maxW={'container.lg'} boxShadow={'lg'} id='template-printable-content' pt={8} >
            <Header
                merchantLogo={state.merchant_logo}
                invoiceNumber='INV45454'
            />
            {/* Merchant Company Name */}
            <Text
                mt={8}
                ml={2}
                fontSize={'xl'}
                borderBottom={'1px solid'}
                w={'fit-content'}
                pr='4'
                pl={16}
                pb={2}>
                {state.merchant_companyName}
            </Text>
            <CustomerBillingInfo
                name={customerState.customer_fullName}
                address={customerState.customer_address}
                mobile={customerState.customer_mobile}
            />
            <ProductListing
                customerProductList={customerState.customer_product_list_items}
            />
            <TaxAndTotal
                subTotalAmt={customerState.customer_sub_total_amt}
                taxPercentage={customerState.customer_tax_percent}
                totalAmount={customerState.customer_total_amt}
            />
            {/* merchant footnote */}
            <Footer
                footNote={state.merchant_footNote}
                signUrl={state.merchant_signUrl}
                address={state.merchant_address}
                mobile={state.merchant_mobile}
                website={state.merchant_website}
            />
        </Container>
    )
}

const Header = ({ merchantLogo, invoiceNumber }: HeaderProps) => {
    return (<>
        < TableContainer>
            <Table w='full'>
                <Tbody>
                    <Tr>
                        <Td w={'45%'} bg={'ActiveCaption'} textTransform={'uppercase'} letterSpacing={'wider'} textAlign={'center'} fontWeight={'semibold'} fontSize={'2xl'} color={'white'}
                        >Invoice</Td>
                        <Td w="25%"></Td>
                        <Td display={'flex'} alignItems={'center'} gap={4}><Text w='24' fontSize={'lg'}># {invoiceNumber}</Text>
                            <Image h={10} src={merchantLogo} alt='companyLogo' />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer >
    </>)
}

const CustomerBillingInfo = ({ name, address, mobile }: CustomerBillingInfoProps) => {
    return (
        <TableContainer mt={6}>
            <Table variant={'unstyled'} maxW={'600px'}>
                <Tr >
                    <Td p={2} fontSize={'lg'} fontWeight={'semibold'}>Billing To :</Td>
                </Tr>
                <Tr><Td>{name}</Td></Tr>
                <Tr><Td pt={0}
                    whiteSpace={'normal'}
                    maxW={'200px'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                >{address}</Td></Tr>
                <Tr><Td pt={0}>+91 {formatMobileNumber(mobile)}</Td></Tr>

            </Table>
        </TableContainer>
    )
}

const ProductListing = ({ customerProductList }: ProductListItemType[] | [] | any) => {

    const NoProductFound = () => {
        return (
            <Flex flexDir={'column'} bg={'teal.50'} borderRadius={5} border={'1px solid teal'} my={8} w='full' p={6} textAlign={'center'} color={'teal'}>
                <Text fontWeight={'medium'}>No Product Found !</Text>
                <Text fontSize={'xs'}>Please add atleast a single product</Text>
            </Flex>
        )
    }

    if (!customerProductList.length) {
        return <NoProductFound />
    }


    return (
        <TableContainer mt='4' mb={8}>
            <Table variant={'simple'} colorScheme='gray'>
                <Thead bg={'black'} color={'white'}>
                    <Tr >
                        <Th color={'inherit'} fontSize={'inherit'}>Product</Th>
                        <Th color={'inherit'} fontSize={'inherit'}>price</Th>
                        <Th color={'inherit'} fontSize={'inherit'}>qty</Th>
                        <Th color={'inherit'} fontSize={'inherit'}>total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        customerProductList && customerProductList.map((item: ProductListItemType, index: number) => (
                            <Tr key={item.id}>
                                <Td whiteSpace={'normal'}
                                    maxW={'250px'}
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}>{item.title}</Td>
                                <Td>{getFormattedAmount(item.price)}</Td>
                                <Td >{item.quantity}</Td>
                                <Td >{getFormattedAmount(item.totalPrice)}</Td>
                            </Tr>
                        ))
                    }


                </Tbody>
            </Table>
        </TableContainer>
    )
}

const TaxAndTotal = ({ subTotalAmt, taxPercentage, totalAmount }: TaxAndTotalProps) => {
    return (
        <Table variant={'unstyled'} maxW={'300px'} ml={'auto'}>
            <Tr>
                <Td p={0} fontWeight={'semibold'}>Sub total :</Td> <Td p={1}>{getFormattedAmount(subTotalAmt)}</Td>
            </Tr>
            <Tr>
                <Td p={0} fontWeight={'semibold'}>tax :</Td> <Td p={1}>{taxPercentage}%</Td>
            </Tr>
            <Tr>
                <Td p={0} fontWeight={'semibold'}>total :</Td> <Td p={1}>{getFormattedAmount(totalAmount)}</Td>
            </Tr>
        </Table>
    )
}

const Footer = ({ footNote, signUrl, address, mobile, website }: FooterProps) => {
    return (
        <Table variant={'unstyled'}>
            <Tbody>
                <Tr>
                    <Td>{footNote}</Td> <Td></Td> <Td pb={1}><Image src={signUrl} h={8} w={20} objectFit={'cover'} /></Td>
                </Tr>
                <Tr>
                    <Td p={0}></Td> <Td p={0}></Td> <Td p={1} fontSize={'sm'}>Authorised Sign.</Td>
                </Tr>
            </Tbody>
            <Tfoot
                bg={'black'}
                color={'white'}
                fontSize={'xs'}>
                <Tr>
                    <Td>
                        +91 {formatMobileNumber(mobile)}
                    </Td>
                    <Td>
                    </Td>
                    <Td whiteSpace={'normal'}
                        maxW={'100px'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}>
                        {website}
                    </Td>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default Template2