import * as React from 'react';
import Box from '@mui/material/Box';
import pencilBooks from "../../assets/pencilBooks.png";
import "./aliados.css"

export default function Aliados() {

    return (
        <Box sx={{margin:{xs: '25% 2% 0 2%', sm: '15% 8% 0 8%', md: '10% 8% 0 8%', lg: '6% 8% 0 8%'}}}>
            <Box sx={{display: {xs: 'block', md: 'none' }}}>
            <p className='titulo'>
                Nuestros <br/>
                Aliados
            </p>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'block' }}}>
            <p className='titulo'>
                Nuestros Aliados
            </p>
            </Box>
            <p className='texto'>Estas son las editoriales que le han dado vida a este proyecto</p>
            <Box sx={{backgroundColor: '#FFFFFF', borderRadius: '30px'}}>
                <Box  sx={{backgroundColor: '#F8F7FF', margin: "3% 6%"}}>
                    <Box sx={{backgroundColor: '#B8B8FF', borderRadius: '30px', display: 'flex', justifyContent: 'center', width: '360px'}}>
                        <Box sx={{backgroundColor: '#8170E8', borderRadius: '100%', margin: '2%', display: 'flex', justifyContent: 'center', width: {xs: '180px',md:'200px'}}}>
                            <img className='pencilBook' src={pencilBooks} alt="imagen predeterminada que de poder cambiar por una personalizada de cada libro mucho mejor" />
                        </Box>
                    </Box>
                    <Box>
                        <h5>Editorial especial</h5>
                    </Box>
                </Box>

            </Box>
        </Box>

)}