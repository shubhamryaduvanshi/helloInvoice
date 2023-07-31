import { ReactNode } from "react";

interface NavBarTypes {
    label: string,
    icon: ReactNode,
    path: string
}

interface MerchantContextValueType {
    merchant_fullName: string
    merchant_companyName: string
    merchant_logo: string
    merchant_mobile: string
    merchant_website: string
    merchant_address: string
    merchant_signUrl: string
    merchant_footNote: string
}
interface TemplateCofigType {
    id: string
    label: string
    thumbnail: string
    rating: number
    isNew: boolean
    isCommingSoon: boolean
}

interface ProductListItemType {
    id: string,
    title: string,
    quantity: number,
    price: number,
    totalPrice: number
}


export type { NavBarTypes, MerchantContextValueType, TemplateCofigType, ProductListItemType }