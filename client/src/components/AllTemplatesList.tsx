import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react';
import { templatesConfig } from '../core/templatesConfig';
import TemplateCard from './TemplateCard';
import { useNavigate } from 'react-router-dom';
import { TemplateCofigType } from '../core/commonTypes';

const AllTemplatesList = () => {

    const navigate = useNavigate();

    return (
        <Flex w='full' flexWrap={'wrap'} flexDir={'row'} gap={8} justifyContent={'center'}>
            {templatesConfig.map((template: TemplateCofigType) => {
                return (
                    <TemplateCard key={template.id} templateInfo={template} />
                )
            })}
        </Flex>
    )
}

export default AllTemplatesList