import { useParams } from 'react-router-dom';
import Template1 from '../components/templatesCollection/Template1';
import Template2 from '../components/templatesCollection/Template2';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import MerchantForm from '../components/MerchantForm';
import CustomerForm from '../components/customer/CustomerForm';
import { CustomerContextProvider } from '../core/contexts/customerContext';
import { SCREEN_TO_SHOW } from '../core/enums';
import { useState } from 'react';
import { BsDownload, BsPrinter } from 'react-icons/bs';
import { print } from '../core/utility';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdAdminPanelSettings } from 'react-icons/md';
import InvoiceTemplateNotFound from '../components/templatesCollection/InvoiceTemplateNotFound';


const CreateInvoice = () => {
    const [moduleToShow, setModuleToShow] = useState<string>(SCREEN_TO_SHOW.MERCHANT_MODULE);
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


    const handleDownload = () => {
        const content: HTMLElement | null | any = document.getElementById("template-printable-content");
        if (!content) {
            return console.error("Something went wrong!");
        }
        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            console.log(imgData);

            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0, 0, 0);
            // pdf.addImage(imgData, "PNG", 5, 0, 200, 300);
            const fileName = `Invoice - ${new Date()}.pdf`;
            pdf.save(fileName);
        });
    }


    return (
        <CustomerContextProvider>
            <Flex w='full' justifyContent={'space-evenly'} my={4} alignItems={'center'}>
                <Flex gap={24} w={'32%'}>
                    <Flex
                        p={2}
                        background={moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ? 'teal.500' : 'white'}
                        boxShadow={moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ? 'lg' : 'none'}
                        borderRadius={'lg'}
                        color={moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ? 'white' : 'gray.400'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        border={moduleToShow == SCREEN_TO_SHOW.MERCHANT_MODULE ? 'none' : '1px solid gainsboro'}
                        transition={'all 0.5s ease'}
                        onClick={handleScreenChange}
                        cursor={'pointer'}

                    >
                        <MdAdminPanelSettings size={34} />
                        <Text as={'span'} fontSize={'xs'}>Merchant</Text>
                    </Flex>
                    <Flex
                        p={2}
                        background={moduleToShow === SCREEN_TO_SHOW.CUSTOMER_MODULE ? 'teal.500' : 'white'}
                        boxShadow={moduleToShow === SCREEN_TO_SHOW.CUSTOMER_MODULE ? 'lg' : 'none'}
                        borderRadius={'lg'}
                        color={moduleToShow === SCREEN_TO_SHOW.CUSTOMER_MODULE ? 'white' : 'gray.400'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        border={moduleToShow == SCREEN_TO_SHOW.CUSTOMER_MODULE ? 'none' : '1px solid gainsboro'}
                        transition={'all 0.5s ease'}
                        onClick={handleScreenChange}
                        cursor={'pointer'}
                    >
                        <AiOutlineUser size={34} />
                        <Text as={'span'} fontSize={'xs'}>Customer</Text>
                    </Flex>

                </Flex>
                <Flex w='20%'
                    gap={20}
                >

                    <Button onClick={handleDownload} rightIcon={<BsDownload size={22} />} colorScheme='teal' variant='outline'>
                        Download Invoice
                    </Button>
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


export default CreateInvoice