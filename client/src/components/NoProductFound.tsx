import { Flex, Text } from "@chakra-ui/react"

const NoProductFound = () => {
    return (
        <Flex flexDir={'column'} bg={'teal.50'} borderRadius={5} border={'1px solid teal'} my={8} w='full' p={6} textAlign={'center'} color={'teal'}>
            <Text fontWeight={'medium'}>No Product Found !</Text>
            <Text fontSize={'xs'}>Please add atleast a single product</Text>
        </Flex>
    )
}

export default NoProductFound;