import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { useToken } from "../components/tokenProvaider";
import Reservations from "../components/reservas/reservas";
import ResponsiveAppBar from "../components/navar/navar";
import Footer from "../components/footer/footer"
export default function ReservationsView() {
    const {token} = useToken();
    useEffect(()=>{},[token])
    return (
        <>
            <main>              
                <Box sx={{backgroundColor: '#F8F7FF'}}>
                    <ResponsiveAppBar/>
                    <Reservations/>
                    <Footer/>
                </Box>

                
            </main>
        </>
    );
}