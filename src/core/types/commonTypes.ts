import { ReactNode } from "react";

interface NavBarTypes {
    label: string,
    icon: ReactNode,
    path: string
}

interface UserContextValueType {
    owner_fullName: string
    owner_companyName: string
    owner_logo: string
    owner_mobile: string
    owner_website: string
    owner_address: string
    owner_signUrl: string
    owner_footNote: string
}

export type { NavBarTypes, UserContextValueType }