import { NavLink, useParams } from 'react-router-dom';
import Template1 from '../components/templatesCollection/Template1';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Template2 from '../components/templatesCollection/Template2';
const CreateInvoice = () => {
    let params = useParams();


    if (params.tId) {
        console.log(params.tId);
    }

    const renderInvoiceTemplate = () => {
        switch (params.tId) {
            case "template1": return <Template1 />;
            case "template2": return <Template2 />;
            default: return <InvoiceTemplateNotFound />
        }
    }
    return (
        <Flex justifyContent={'space-around'}>
            <Box w='45%'>

            </Box>
            <Box w='50%'>
                {renderInvoiceTemplate()}
            </Box>
        </Flex>

    )
}

const InvoiceTemplateNotFound = () => {
    return (
        <Flex justifyContent={'center'} alignItems={'flex-start'} my={'16'} mx={'auto'} flexDir={'column'} w='lg' gap={12}>
            <NavLink to={'/templates'}>
                <Button
                    leftIcon={<IoReturnUpBackOutline size={20} />}
                    colorScheme='teal' variant={'outline'}>
                    Back
                </Button>
            </NavLink>

            <Text fontSize={'2xl'}>
                Please select an valid Invoice Template
            </Text>
        </Flex>
    )
}

export default CreateInvoice