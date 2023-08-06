import { NavLink, useParams } from 'react-router-dom';
import Template1 from '../components/templatesCollection/Template1';
import Template2 from '../components/templatesCollection/Template2';
import { Box, Button, Center, Flex, IconButton, Text } from '@chakra-ui/react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import MerchantForm from '../components/MerchantForm';
import CustomerForm from '../components/customer/CustomerForm';
import { CustomerContextProvider } from '../core/contexts/customerContext';
import { SCREEN_TO_SHOW } from '../core/enums';
import { useState } from 'react';
import { Switch } from "@chakra-ui/switch";
import { BsDownload, BsPrinter } from 'react-icons/bs';
import { print } from '../core/utility';


const CreateInvoice = () => {
    const [moduleToShow, setModuleToShow] = useState<string>(SCREEN_TO_SHOW.CUSTOMER_MODULE);
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

    const handleScreenChange = () => {
        moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ? setModuleToShow(SCREEN_TO_SHOW.CUSTOMER_MODULE) : setModuleToShow(SCREEN_TO_SHOW.MERCHANT_MODULE)
    }


    return (
        <CustomerContextProvider>
            <Flex w='full' justifyContent={'space-evenly'} my={4} alignItems={'center'}>
                <Flex >
                    <Text>Toggle to change the form.</Text>   <Switch size={'md'} mx='4' value={moduleToShow} onChange={handleScreenChange} />
                    <Text px='2' style={{ color: moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ? 'ActiveCaption' : 'gainsboro' }}>Merchant Form </Text>
                    <Text style={{ color: moduleToShow === SCREEN_TO_SHOW.CUSTOMER_MODULE ? 'ActiveCaption' : 'gainsboro' }}>Customer Form </Text>
                </Flex>
                <Flex w='20%'
                    gap={20}
                >
                    <IconButton
                        borderRadius={50}
                        variant='outline'
                        colorScheme='facebook'
                        aria-label='Download'
                        icon={<BsDownload size={22} />}
                    />
                    <IconButton
                        borderRadius={50}
                        variant='outline'
                        colorScheme='facebook'
                        aria-label='Download'
                        onClick={() => {
                            print("template-printable")
                        }}
                        icon={<BsPrinter size={22} />}
                    />
                </Flex>
            </Flex>
            <Flex justifyContent={'space-around'}>
                <Box w='30%' style={{ transition: 'all 0.8s ease' }}>
                    {moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ?
                        <MerchantForm /> :
                        <CustomerForm />
                    }

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