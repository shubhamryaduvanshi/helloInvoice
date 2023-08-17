import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { CUSTOMER_ACTIONS } from '../../core/enums';
import { useCustomerContext } from '../../core/contexts/customerContext';
import { CustomerFormProductList } from './CustomerFormProductItems';
import CustomerProductListing from './CustomerProductListing';


const CustomerForm = () => {
    const { customerState, customerDispatch } = useCustomerContext();

    return (
        <Box maxW={'sm'} m={'auto'} pt={'10'}>
            {/* <Text fontSize={'2xl'} px={2} m={'auto'} mb={8} borderBottom={'1px'} w={'fit-content'}>
                Customer Info Form
            </Text> */}
            <form>

                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Customer Name:</Text>
                    <Input
                        size={'sm'}
                        type='text' value={customerState.customer_fullName} onChange={(e) => {
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_FULL_NAME,
                                payload: e.target.value
                            })
                        }}
                    />
                </Box>
                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Address:</Text>
                    <Input
                        size={'sm'}
                        type='text' value={customerState.customer_address} onChange={(e) => {
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_ADDRESS,
                                payload: e.target.value
                            })
                        }}
                    />
                </Box>
                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Mobile No:</Text>
                    <InputGroup>
                        <InputLeftAddon children={"+91"} h={'auto'} fontSize={'sm'} />
                        <Input maxLength={10} size={'sm'} type='tel' placeholder='Phone number'
                            value={customerState.customer_mobile} onChange={(e) => {
                                customerDispatch({
                                    type: CUSTOMER_ACTIONS.SET_MOBILE_NO,
                                    payload: e.target.value
                                })
                            }}
                        />
                    </InputGroup>
                </Box>
                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Invoice No:</Text>
                    <Input size={'sm'} type='text'
                        value={customerState.customer_inv_no} onChange={(e) => {
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_INVOICE_NO,
                                payload: e.target.value
                            })
                        }}
                    />

                </Box>
                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Invoice Date:</Text>
                    <Input size={'sm'} type='date'
                        value={customerState.customer_inv_date} onChange={(e) => {
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_INVOICE_DATE,
                                payload: e.target.value
                            })
                        }}
                    />
                </Box>
                <Box my={2}>
                    <Text fontSize={'sm'} mb='0.5'>Tax (%):</Text>
                    <Input size={'sm'} type='number'
                        value={customerState.customer_tax_percent} onChange={(e) => {
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_TAX_PERCENTAGE,
                                payload: e.target.value
                            })
                            customerDispatch({
                                type: CUSTOMER_ACTIONS.SET_TOTAL_AMOUNT
                            })
                        }}
                    />
                </Box>

                {/* The add product form */}
                <CustomerFormProductList />
                {/* Added product listing */}
                <CustomerProductListing />

            </form>
        </Box >
    )
}





export default CustomerForm