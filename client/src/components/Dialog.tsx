import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface DialogType {
    header?: Text,
    content: any,
    callBack: (e: any) => void;
}

const Dialog = ({ header, content, callBack }: DialogType): ReactJSXElement => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Testttstt
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default Dialog