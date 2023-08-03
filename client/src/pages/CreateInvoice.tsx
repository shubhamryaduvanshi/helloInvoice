import { NavLink, useParams } from 'react-router-dom';
import Template1 from '../components/templatesCollection/Template1';
import Template2 from '../components/templatesCollection/Template2';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import MerchantForm from '../components/MerchantForm';
import CustomerForm from '../components/customer/CustomerForm';
import { CustomerContextProvider } from '../core/contexts/customerContext';

const CreateInvoice = () => {
    let params = useParams();

    const renderInvoiceTemplate = () => {
        // Todo: Use memo 
        // Todo: Crate a custom hook for getting exact templates (useTemplate)
        switch (params.tId) {
            case "template1": return <Template1 />;
            case "template2": return <Template2 />;
            default: return <InvoiceTemplateNotFound />
        }
    }

    return (
        <CustomerContextProvider>
            <Flex justifyContent={'space-around'}>
                <Box w='30%'>
                    {/* <CustomerForm /> */}
                    <MerchantForm />

                </Box>
                <Box w='50%' m='2'>
                    {renderInvoiceTemplate()}
                </Box>
            </Flex>
        </CustomerContextProvider>
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