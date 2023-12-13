import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, Text, useToast } from "@chakra-ui/react"
import { CUSTOMER_ACTIONS } from "../../core/enums"
import { useCustomerContext } from "../../core/contexts/customerContext";
import { useState } from "react";
import { ProductListItemType } from "../../core/commonTypes";

export const CustomerFormProductList = () => {

    const { customerState, customerDispatch } = useCustomerContext();
    const toast = useToast();

    const [productTitle, setProductTitle] = useState('');
    const [productQuantity, setProductQuantity] = useState(1);
    const [productPrice, setProductPrice] = useState(1);


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!productTitle || !productPrice || !productQuantity) {
            toast({
                title: 'Error',
                description: "Please fill up all the details.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        // Creating payload for reducer
        const productObj: ProductListItemType = {
            id: new Date().toString(),
            title: productTitle,
            quantity: productQuantity,
            price: productPrice,
            totalPrice: productPrice * productQuantity
        }

        // dispatching the reducer
        customerDispatch({
            type: CUSTOMER_ACTIONS.SET_PRODUCT_LIST_ITEMS,
            payload: productObj
        })

        calculateTotal();

        resetForm();
    }


    const calculateTotal = () => {
        customerDispatch({
            type: CUSTOMER_ACTIONS.SET_SUBTOTAL_AMOUNT
        })
        customerDispatch({
            type: CUSTOMER_ACTIONS.SET_TOTAL_AMOUNT
        })
    }

    const resetForm = () => {
        setProductPrice(1);
        setProductQuantity(1);
        setProductTitle('')
    }

    return (
        <Box border={'1px'} borderColor={'gainsboro'} p='4' borderRadius={'5'} mt={4}>
            <Box mb={2}>
                <Text fontSize={'sm'} mb='0.5'>Product Name:</Text>
                <Input size={'sm'} type="text" value={productTitle}
                    onChange={(e) => {
                        setProductTitle(e.target.value)
                    }}
                    required
                />
            </Box>
            <Flex my={2} gap={4}>
                <Box>
                    <Text fontSize={'sm'} mb='0.5'>Product Quantity:</Text>
                    <Input size={'sm'} minLength={1} type="number" value={productQuantity}
                        onChange={(e) => {
                            setProductQuantity(e.target.valueAsNumber)
                        }}
                    />
                </Box>
                <Box >
                    <Text fontSize={'sm'} mb='0.5'>Product Price (₹/unit):</Text>
                    <InputGroup>
                        <InputLeftAddon children={"₹"} h={'auto'} fontSize={'sm'} />
                        <Input size={'sm'} type="number" value={productPrice}
                            onChange={(e) => {
                                setProductPrice(e.target.valueAsNumber)
                            }}
                        />
                    </InputGroup>
                </Box>
            </Flex>
            <Button mt='2' onClick={handleSubmit} colorScheme="blue" variant={'outline'}>Add Product</Button>
        </Box>
    )
}