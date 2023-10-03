import * as React from 'react';
import Box from '@mui/material/Box';
import "./footer.css";
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Footer(){

    return(
        <Box sx={{backgroundColor: '#FFEEDD', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3.8%', marginTop: '5%'}}>
            <p className='text'>Todos los derechos reservados:  </p> <GitHubIcon/>  <p >  DavidRuc</p>
        </Box>
    )
}