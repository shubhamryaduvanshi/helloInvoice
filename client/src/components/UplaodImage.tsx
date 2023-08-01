import { Box, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

interface UploadImagePropsType {
    defaultLogoUrl: string,
    onChange: CallableFunction
}

const UplaodImage = ({ onChange, defaultLogoUrl }: UploadImagePropsType) => {
    const [imageURL, setImageURL] = useState(defaultLogoUrl);

    const fileToDataUri = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event?.target?.result)
        };
        reader.readAsDataURL(file);
    })

    const onImageChange = (file: any) => {
        if (!file) {
            onChange(null);
            setImageURL('');
            return;
        }

        fileToDataUri(file)
            .then((dataUri: any) => {
                setImageURL(dataUri);
                onChange(dataUri);
            })
    }
    return (
        <>
            <Flex flexDir={'column'} alignItems={'center'} justify={'center'} p='2' justifyContent={'center'} border={'1px'} borderColor={'gainsboro'} borderRadius={'5'}>
                <Image src={imageURL} h={12} w={12} objectFit={'contain'} m={'auto'} />
                {/* @ts-ignore */}
                <input style={{ fontSize: '12px', marginTop: '10px' }} type="file" onChange={(event) => onImageChange(event?.target?.files[0] || null)} />
            </Flex>
        </>
    )
}

export default UplaodImage