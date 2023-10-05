import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { useToken } from "../components/tokenProvaider";

import ResponsiveAppBar from "../components/navar/navar";
import Footer from "../components/footer/footer"
import Loans from "../components/loans/loans";
export default function LoansView() {
    const {token} = useToken();
    useEffect(()=>{},[token])
    return (
        <>
            <main>              
                <Box sx={{backgroundColor: '#F8F7FF'}}>
                    <ResponsiveAppBar/>
                    <Loans/>
                    <Footer/>
                </Box>

                
            </main>
        </>
    );
}