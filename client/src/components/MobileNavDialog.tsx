import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, IconButton } from "@chakra-ui/react"
import { HiMenuAlt3 } from "react-icons/hi"
import SideNav from "./SideNav"

const MobileNavDialog = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton display={['block', 'block', 'none']}
                variant='ghost' px={2} aria-label='Menu' icon={<HiMenuAlt3 onClick={onOpen} size={32} />} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton size={'lg'} />
                    <DrawerHeader>Hello Invoice</DrawerHeader>

                    <DrawerBody>
                        <SideNav />
                    </DrawerBody>

                    <DrawerFooter>
                        User Info
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>

    )
}

export default MobileNavDialog;