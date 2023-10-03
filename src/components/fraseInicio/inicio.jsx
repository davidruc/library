import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import books from "../../assets/booksLanding.png"
import "./inicio.css"
export default function Inicio(){
    const navigate = useNavigate();

    const booksReservation = ()=>{
        //Se dirije a la página de reservación libros
        navigate("/")   
    }
    return(
        <div className='container'>
            <h2 className='title'>Cada libro es un viaje por sí mismo. <br/>
                ¿Listo para comenzar un nuevo viaje?</h2>
            <Box className="newBook" sx={{display: 'flex', alignItems: 'center', flexDirection: {xs:"column" ,md: "row"} }}>
                <img className='booksImg' src={books}/>
                <Box className="reservations" sx={{display: {xs: 'none', md: "flex"}}}>
                    <p>No dudes en comenzar un nuevo libro, realiza de inmediato una nueva historia</p>
                    <Box className="reservation" sx={{display: 'flex', flexDirection: 'row', justifyContent:'center', mt:3.5}}>
                    <button className='boton' onClick={booksReservation}> !Pedir mi libro! </button>
                    <button className='boton2'> Disponibilidad </button>
                    </Box>
                </Box>
            </Box>
            
           
        </div>
    )
}