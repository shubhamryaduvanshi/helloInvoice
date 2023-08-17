import React from 'react'
import { useCustomerContext } from '../../core/contexts/customerContext';
import { ProductListItemType } from '../../core/commonTypes';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { CUSTOMER_ACTIONS } from '../../core/enums';

const CustomerProductListing = () => {
    const { customerState, customerDispatch } = useCustomerContext();

    const removeProduct = (id: string) => {
        customerDispatch({
            type: CUSTOMER_ACTIONS.REMOVE_PRODUCT_FROM_LIST,
            payload: id
        })
        customerDispatch({
            type: CUSTOMER_ACTIONS.SET_SUBTOTAL_AMOUNT
        })
        customerDispatch({
            type: CUSTOMER_ACTIONS.SET_TOTAL_AMOUNT
        })
    }

    return (
        <>
            {
                customerState.customer_product_list_items && (
                    customerState.customer_product_list_items.map((item: ProductListItemType) => {
                        return (
                            <Flex key={item.id}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                px={4}
                                py={2}
                                border={'1px'}
                                borderColor={'gainsboro'}
                                my={2}
                                borderRadius={5}
                                transition={'all 0.3s ease-in'}
                                _hover={{ boxShadow: 'md' }}
                            >
                                <Text
                                    fontSize={'md'}
                                    textTransform={'capitalize'}
                                >{item.title} </Text>
                                <IconButton
                                    onClick={(e) => removeProduct(item.id)}
                                    size={'sm'}
                                    variant='outline'
                                    colorScheme='red'
                                    aria-label='Delete product'
                                    icon={<MdDelete size={22} />}
                                />
                            </Flex>
                        )
                    })
                )
            }
        </>
    )
}

export default CustomerProductListing