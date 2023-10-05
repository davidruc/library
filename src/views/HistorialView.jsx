import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { useToken } from "../components/tokenProvaider";

import ResponsiveAppBar from "../components/navar/navar";
import Footer from "../components/footer/footer"
import Historial from "../components/historial/historial";

export default function HistoryView() {
    const {token} = useToken();
    useEffect(()=>{},[token])
    return (
        <>
            <main>              
                <Box sx={{backgroundColor: '#F8F7FF'}}>
                    <ResponsiveAppBar/>
                    <Historial/>
                    <Footer/>
                </Box>

                
            </main>
        </>
    );
}