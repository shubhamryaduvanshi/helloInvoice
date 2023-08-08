import { Box, Button, Container, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
        <Container maxW={'container.xl'}>
            <Flex minH={'80vh'} alignItems={'center'} justifyContent={'space-around'}>
                <Box w='40%'>
                    <Text fontSize={'4xl'} fontWeight={'semibold'} color={'teal'}>
                        Free Invoicing software for small businesses.
                    </Text>
                    <Text mt='4'>
                        Manage your business professionally with Hello Invoice. Using the best software for your billing, inventory & accounting needs. Be a part of 1 Cr+ SMEs in India who trust Hello Invoice.
                    </Text>
                    <NavLink to={'/templates'}>
                        <Button
                            mt={'8'}
                            colorScheme='teal'>
                            Explore Templates
                        </Button>
                    </NavLink>
                </Box>
                <Box w='40%'>
                    <Image src='https://vyaparwebsiteimages.vypcdn.in/marketing-images/images/home-page-revamp/new-vyapar-hero.webp' />
                </Box>
            </Flex>
        </Container>
    )
}

export default Dashboard