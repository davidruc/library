import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import pencilBooks from "../../assets/pencilBooks.png";
import "./aliados.css"

export default function Aliados() {

    const [info, setInfo] = useState({
        response: []
    })
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getPopularBooks() {
            try {
                const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/bookEditorial`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Version": "2.0.0"
                    }
                });

                if (res.status === 200) {
                    const response = await res.json();
                    setInfo(response)
                    return response;
                }
                else {
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
        <Box sx={{ margin: { xs: '25% 2% 0 2%', sm: '15% 8% 0 8%', md: '10% 8% 0 8%', lg: '6% 8% 0 8%' } }}>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <p className='tituloSomos'>
                    Nuestros <br />
                    Aliados
                </p>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <p className='tituloSomos'>
                    Nuestros Aliados
                </p>
            </Box>
            <p className='texto'>Estas son algunas de las editoriales que le han dado vida a este proyecto</p>
            <Box sx={{ backgroundColor: '#F8CDDF', borderRadius: '30px' ,padding: ".1%",  marginTop: '4%',display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                
                    {loading ? (
                        <p>cargando...</p>
                    ) : (info.map((aliado) => (
                        <>
                        <Box sx={{ backgroundColor: '#F8F7FF', margin: "4% 3% 4% 3%", borderRadius: '30px', width: '320px', height: '390px' }}>
                            <Box sx={{ backgroundColor: '#B8B8FF', borderRadius: '20px', display: 'flex', justifyContent: 'center', width: '320px' }}>
                                <Box sx={{ backgroundColor: '#8170E8', borderRadius: '100%', margin: '2%', display: 'flex', justifyContent: 'center', width: { xs: '140px', md: '160px' }, height: {xs: '140', md: '160px'} }}>
                                    <img className='pencilBook' src={pencilBooks} alt="imagen predeterminada que de poder cambiar por una personalizada de cada editorial mucho mejor" />
                                </Box>
                            </Box>
                            <Box sx={{ padding: '4% 6%', width: '295px' }}>
                                <h5 className='editionTitle'>{aliado.editorial}</h5>
                                <p>Libros donados:</p>
                                <ul className='lista'>
                                    {aliado.books.map((libro)=>(
                                        <li>{libro.titulo}</li>
                                    )
                                    )}
                                </ul>
                            </Box >
                            </Box>
                        </>

                    )))
                    }
  

            </Box>
        </Box>

    )
}