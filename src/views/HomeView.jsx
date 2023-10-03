import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import ResponsiveAppBar from "../components/navar/navar";
import Inicio from "../components/fraseInicio/inicio";
import Somos from "../components/quienesSomos/somos";
import Aliados from "../components/aliados/aliados";
import Footer from "../components/footer/footer";
import { useToken } from "../components/tokenProvaider";
export default function HomeView() {

    const {token} = useToken();

    useEffect(()=>{
    },[token])

    return (
        <>
            <main>
                <Box sx={{backgroundColor: '#F8F7FF'}}>
                    <ResponsiveAppBar />
                    <Inicio />
                    <Somos />
                    <Aliados />
                    <Footer/>
                </Box>
            </main>
        </>
    );
}