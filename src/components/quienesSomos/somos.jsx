import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import "./somos.css";
import libros from "../../assets/manosBooks.png";
import { useNavigate } from 'react-router-dom';

export default function Somos() {
    const navigate = useNavigate();
    const handleNavigate = () =>{
        navigate("/reservations")
    }
    const [ info, setInfo] = useState({
        response: []   
    })
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function getPopularBooks(){
            try {
                const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/returnTopBook`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Version": "2.0.0"
                    }
                });
                
                if(res.status === 200){
                    const response = await res.json();
                    setInfo(response)
                    return response;
                }
                else{
                    alert("error trayendo los datos");
                } 
            } catch (error) {
                alert("error");
            } finally {
                setLoading(false);
            }
        }
        getPopularBooks();
    }, []);
    
    return (
        
        <Box className='other' sx={{marginTop: { xs: "35%", sm: '22%', md: '12%' }, padding: '7% 10% .1% 10%' , backgroundColor: '#FFEEDD'}} >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                <Box sx={{ width: { xs: '100%', md: '140%' }, fontSize: { xs: '4vh', sm: '5vh' }, padding: { xs: '3% 0 5% 0', lg: '0'} }}>
                    <h3>
                        Quién es <br />
                        <h4> Huellas Literarias</h4> 
                    </h3>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', md:'150%'}}}>
                    <p>Somos una red de bibliotecas bumanguesa, somos expertos en brindar la mejor experiencia a nuestros usuarios. Realizamos envíos a tu casa de forma 100% gratuita. Huellas literarias es una organización sin ánimo de lucro que quiere combatir contra las grandes firmas electrónicas</p>
                </Box>
            </Box>
            <Box sx={{backgroundColor: '#F8CDDF', margin: {xs: '7% 0' , md: '5% 10% 2%'}, borderRadius: '20px', display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, alignItems: 'center' }}>
                <img className='libros' src={libros} alt="libros con manos " />
                <Box className='Huellas' sx={{backgroundColor: '#F8F7FF', padding: "4% 1%", margin: {xs: '0 0 2% 0 ' , md:'2%'}, borderRadius: '20px', display: 'flex',alignItems:'center', width: {xs: '96%' ,lg:'60%'}, display: 'flex', flexDirection: {xs: 'column', md: 'row'}}}>
                    <h3>Huellas <br/> Literarias</h3>
                    <Box>
                        <p className='popular'>Libros populares:</p>
                        {loading ? (
                            <p>cargando...</p>
                            ) : (info.map((book)=>(
                                <p className='popular'> {book.libro} - {book.num_prestamos} prestamos </p>
                            )))
                        }
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <button className='buttonReservas' onClick={handleNavigate}>Reserva ya</button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}