import { Flex, Image, Box, Avatar, Text } from '@chakra-ui/react'
import logo from '../assets/hello-invoice-low-resolution-logo-color-on-transparent-background.png';
const Header = () => {
    return (
        <>
            <Flex
                py='4'
                pr='4'
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box
                    h={'12'}
                    objectFit={'contain'}
                >
                    <Image
                        src={logo}
                        alt='hello-invoice'
                        width='auto'
                        height={'100%'} />
                </Box>

                <Box>
                    <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                </Box>
            </Flex>
        </>
    )
}

export default Header