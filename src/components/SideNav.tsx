import { NavBarTypes } from "../core/types/commonTypes"
import { Flex, Box } from "@chakra-ui/react"
import { HiHome } from 'react-icons/hi';
import { CgTemplate } from 'react-icons/cg';
import { NavLink } from "react-router-dom";


const SideNav = () => {
    const navItems: NavBarTypes[] = [
        {
            label: "Dashboard",
            icon: <HiHome size='20' />,
            path: "/"
        },
        {
            label: "Templates",
            icon: <CgTemplate size='20' />,
            path: "/templates"
        },
        {
            label: "Profile",
            icon: <CgTemplate size='20' />,
            path: "/profile"
        }
    ]

    return (
        <>
            <Flex flexDir={'column'}>
                {
                    navItems.map(item => {
                        return (
                            <NavLink key={item.label} to={item.path}
                                className={({ isActive, isPending }) => {
                                    return isActive ? "active-nav" : isPending ? "pending" : "nav";
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        )
                    })
                }
            </Flex>
        </>
    )
}

export default SideNav