import { Flex, Image, Box, Avatar, Text, AvatarBadge, Button, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react'
import logo from '../assets/hello-invoice-low-resolution-logo-color-on-transparent-background.png';
import MobileNavDialog from './MobileNavDialog';
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
                <Flex alignItems={'center'} gap={'5'}>
                    <Menu>
                        <MenuButton display={['none', 'none', 'block']} as={Button} borderRadius={'full'}>
                            <Avatar size={'sm'}>
                                <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1em' />
                            </Avatar>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Sign in / Sign up</MenuItem>
                            <MenuItem>Profile</MenuItem>
                        </MenuList>
                    </Menu>
                    <MobileNavDialog />
                </Flex>
            </Flex>
        </>
    )
}
export default Header