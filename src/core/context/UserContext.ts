import { createContext } from 'react';
import { UserContextValueType } from '../types/commonTypes';

export const userInitalValue: UserContextValueType = {
    owner_fullName: "John Smith",
    owner_companyName: "Test Company",
    owner_logo: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg",
    owner_mobile: "78654654654",
    owner_website: "www.test.com",
    owner_address: "4567 Ross Street, Herminie, United States",
    owner_signUrl: "https://img.favpng.com/6/2/17/digital-signature-typesetting-handwriting-png-favpng-ZZU9Ax8LLAcuU3xEgCw0WJWA5.jpg",
    owner_footNote: "Thank you for your business."
}

export const UserContext = createContext(userInitalValue);
