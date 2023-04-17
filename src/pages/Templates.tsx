import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import AllTemplatesList from '../components/AllTemplatesList'

const Templates = () => {
    return (
        <>
            <Flex flexDir={'column'}>
                <Text fontSize={'2xl'} fontWeight={'bold'} px={4} borderBottom={'1px solid gainsboro'} w={'fit-content'} mx='auto' mt='4' mb='8'>All Templates</Text>
                <AllTemplatesList />
            </Flex>


        </>
    )
}

export default Templates