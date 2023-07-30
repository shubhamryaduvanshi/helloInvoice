import { ReactNode, useContext } from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import { MerchantContextProvider } from '../core/contexts/merchantContext';

interface LayoutType {
    children: ReactNode
}

const Layout = ({ children }: LayoutType) => {

    return (
        <>
            <Grid
                templateAreas={`"header header"
                  "nav main"
                  "nav main"`}
                gridTemplateRows={'auto 1fr'}
                gridTemplateColumns={'250px 1fr'}
                h='97vh'
                // gap='1'
                color='blackAlpha.700'
            // fontWeight='bold'
            >
                <GridItem pl='2' area={'header'} bg='gray.200'>
                    <Header />
                </GridItem>
                <GridItem px='2' bg='gray.100' area={'nav'}>
                    <SideNav />
                </GridItem>
                <GridItem pl='2' area={'main'}
                    style={{
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                >
                    <MerchantContextProvider>
                        {children}
                    </MerchantContextProvider>
                </GridItem>
                {/* <GridItem pl='2' bg='blue.300' area={'footer'}>
                    Footer
                </GridItem> */}
            </Grid>
        </>
    )
}

export default Layout