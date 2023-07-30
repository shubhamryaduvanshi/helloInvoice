import {
    Flex,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Text,
    Button,
    Tooltip,
    Fade,
} from '@chakra-ui/react';
import { RatingStar } from './RatingStarts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateCofigType } from '../core/commonTypes';


interface TemplateCardType {
    templateInfo: TemplateCofigType
}


const TemplateCard = ({ templateInfo }: TemplateCardType) => {
    const { id, isNew, label, rating, thumbnail, isCommingSoon } = templateInfo;
    const [isHover, setIsHover] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleHover = () => {
        setIsHover(!isHover);
    }

    const onTemplateSelection = (templateId: string, isPrime: boolean) => {
        if (!templateId) return;
        if (isPrime) {
            alert("This template is coming soon");
            return;
        }
        navigate(`/template/${templateInfo.id}`)
    }

    return (
        <Flex w="fit-content" alignItems="center" justifyContent="center"
            pos={'relative'}
            transition={'all 0.5s'}
            _hover={{
                shadow: 'lg'
            }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="xs"
                borderWidth="1px"
                rounded="lg"
                // shadow="lg"
                position="relative">
                {isNew && (
                    <Badge rounded="full" px="2" fontSize="0.98em" colorScheme="teal" pos={'absolute'} top={-2} right={2}>
                        New
                    </Badge>
                )}
                {isCommingSoon && (
                    <Badge rounded="full" px="2" fontSize="1em" colorScheme="yellow" variant='solid' pos={'absolute'} top={-2} right={2}>
                        Coming Soon
                    </Badge>
                )}
                <Image
                    src={thumbnail}
                    alt={`Picture of ${label}`}
                    rounded="lg"
                    h='sm'
                    w='72'
                    objectFit={'contain'}
                />

                {isHover && !isCommingSoon && (
                    <Fade in={isHover && !isCommingSoon}>
                        <Flex
                            p='4'
                            pos={'absolute'}
                            top={0}
                            bg={'#242222ad'}
                            zIndex={99}
                            h={'full'}
                            w='full'
                            borderRadius={5}
                            color={'white'}
                        >
                            {/* <Flex justifyContent="space-around" alignContent="center" mt={16}>
                        {/* <Box
                            fontSize="xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {label}
                        </Box>  
                        <Text fontSize={'md'} fontWeight={'medium'}>
                            Rating:
                        </Text> <RatingStar rating={rating} />

                    </Flex> */}

                            <Button
                                m={'auto'}
                                colorScheme='teal'
                                onClick={() => onTemplateSelection(id, isCommingSoon)}
                            >
                                Create Invoice
                            </Button>

                        </Flex>
                    </Fade>
                )
                }
            </Box >
        </Flex >
    );
}

export default TemplateCard;