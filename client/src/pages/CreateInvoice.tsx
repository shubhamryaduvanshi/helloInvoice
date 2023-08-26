import { useParams } from 'react-router-dom';
import Template1 from '../components/templatesCollection/Template1';
import Template2 from '../components/templatesCollection/Template2';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import MerchantForm from '../components/MerchantForm';
import CustomerForm from '../components/customer/CustomerForm';
import { CustomerContextProvider } from '../core/contexts/customerContext';
import { SCREEN_TO_SHOW } from '../core/enums';
import React, { useState, useRef } from 'react';
import { BsDownload, BsPrinter } from 'react-icons/bs';
import { print } from '../core/utility';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdAdminPanelSettings } from 'react-icons/md';
import InvoiceTemplateNotFound from '../components/templatesCollection/InvoiceTemplateNotFound';
import ReactToPrint from 'react-to-print';


const CreateInvoice = () => {
    const [moduleToShow, setModuleToShow] = useState<string>(SCREEN_TO_SHOW.MERCHANT_MODULE);
    const [isShowMobilePreview, setIsShowMobilePreview] = useState<boolean>(false);
    let params = useParams();
    const printableComponentRef = useRef(null);

    const renderInvoiceTemplate = () => {
        // Todo: Use memo 
        // Todo: Crate a custom hook for getting exact templates (useTemplate)
        switch (params.tId) {
            // @ts-ignore
            case "template1": return <Template1 ref={printableComponentRef} />;
            // @ts-ignore
            case "template2": return <Template2 ref={printableComponentRef} />;
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
                <Flex gap={[4, 24]} w={['60%', '60%', '32%']} justifyContent={['initial']}>
                    <Flex
                        p={[2]}
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
                        <Box display={['none', 'none', 'block']}>
                            <MdAdminPanelSettings size={34} />
                        </Box>
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
                        <Box display={['none', 'none', 'block']}>
                            <AiOutlineUser size={34} />
                        </Box>
                        <Text as={'span'} fontSize={'xs'}>Customer</Text>
                    </Flex>

                </Flex>
                <Flex w={['30%', '20%']}
                >
                    <ReactToPrint
                        trigger={() => <Button
                            size={['sm', 'sm', 'md']}
                            rightIcon={<BsDownload size={22} />} colorScheme='teal' variant='outline'>
                            Print
                        </Button>}
                        content={() => printableComponentRef.current}
                    />

                </Flex>
            </Flex>
            <Flex justifyContent={'space-around'} flexDir={['column', 'column', 'row']}>
                <Box w={['full', 'full', '30%']} px={4} style={{ transition: 'all 0.8s ease' }}>
                    {moduleToShow === SCREEN_TO_SHOW.MERCHANT_MODULE ?
                        <MerchantForm /> :
                        <CustomerForm />
                    }
                </Box>
                <Box w={['full', 'full', '50%']} m='2'                 >
                    {renderInvoiceTemplate()}
                </Box>
            </Flex>
        </CustomerContextProvider>
    )
}


export default CreateInvoice