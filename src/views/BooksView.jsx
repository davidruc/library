import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import ResponsiveAppBar from "../components/navar/navar";
import { useToken } from "../components/tokenProvaider";
import Books from "../components/books/books";
export default function BooksView() {
    const {token} = useToken();
    useEffect(()=>{},[token])
    return (
        <>
            <main>              
                <Box sx={{backgroundColor: '#F8F7FF'}}>
                    <ResponsiveAppBar />
                    <Books/>
                </Box>

                
            </main>
        </>
    );
}