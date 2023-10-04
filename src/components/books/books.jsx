import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DrawerMobileNavigation from "../Drawer/drawer";
import { useToken } from '../tokenProvaider';
import { useNavigate } from 'react-router-dom';
import "./books.css";
export default function Books() {
    const navigate = useNavigate();
    const { token,getToken } = useToken();
    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(true);
    const handleDataFetched = (response) => {
        // Esta función me trae los datos del hijo y los setea para usarlos en este componente
        setDatos(response)
    };
    useEffect(()=>{
        const authToken = async() =>{
            const tokensito = await getToken();
            if(!tokensito){
                navigate("/login");
            };
        }
        authToken();
    },[])
    useEffect(() => {
        async function getAviableBooks() {
            try {
                const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/books`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Version": "2.0.0",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    const response = await res.json();
                    setDatos(response);
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
        getAviableBooks();
    }, [])
    return (
        <>  
            <Box sx={{ padding: { lg: '5% 5%' } }}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: {xs: '10%' ,sm: '6%', md: '4%', lg: '0'}}}>
                    <h1 className='titleBooks'>Libros</h1>
                    <DrawerMobileNavigation onDataFetched={handleDataFetched} />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                    {
                        datos.map((info) => (
                            <>
                                {info.books ? (
                                    <>
                                        {
                                            info.books.map((book) => (
                                                <>
                                                    <Box sx={{ backgroundColor: '#FFEEDD', borderRadius: '20px', width: '330px', height: '554px', margin: '3% 2% 1% 2%' }}>
                                                        <Box sx={{ margin: '3%', textAlign: 'center', display: 'flex', alignItems: 'center', height: '40px' }}>
                                                            <p>Editorial: {book.editorial}</p>
                                                        </Box>
                                                        <Box sx={{ backgroundColor: '#B8B8FF', borderRadius: '20px', height: '355px' }}>
                                                            <img src="" alt="" />
                                                        </Box>
                                                        <Box className="informacion" sx={{ padding: '5% 5% 2% 10% ' }}>{
                                                            book.disponibilidad ? (<><Box sx={{ backgroundColor: '#02970278', borderRadius: '20px', padding: '2%', textAlign: 'center', width: '24%' }}><p>Disponible</p></Box></>) : (<><Box sx={{ backgroundColor: '#ff5b5b9e', borderRadius: '20px', padding: '2%', textAlign: 'center', width: '24%' }}><p>Ocupado</p></Box></>)
                                                        }</Box>
                                                        <Box className="informacion" sx={{ padding: '0% 5% 2% 10% ' }}>
                                                            <h3>{book.titulo}</h3>
                                                            <p>Autor: {book.autor}</p>
                                                            <p>Descripicón: {book.descripcion}</p>
                                                            <p>Disponibilidad: {book.disponibilidad}</p>
                                                        </Box>
                                                    </Box>
                                                </>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Box sx={{ backgroundColor: '#FFEEDD', borderRadius: '20px', width: '330px', height: '494px', margin: '3% 2% 0% 2%' }}>
                                            <Box sx={{ backgroundColor: '#B8B8FF', borderRadius: '20px', height: '355px' }}>
                                                <img src="" alt="" />
                                            </Box>
                                            <Box className="informacion" sx={{ padding: '5% 5% 2% 10% ' }}>{
                                                info.disponibilidad ? (<><Box sx={{ backgroundColor: '#02970278', borderRadius: '20px', padding: '2%', textAlign: 'center', width: '24%' }}><p>Disponible</p></Box></>) : (<><Box sx={{ backgroundColor: '#ff5b5b9e', borderRadius: '20px', padding: '2%', textAlign: 'center', width: '24%' }}><p>Ocupado</p></Box></>)
                                            }</Box>
                                            <Box className="informacion" sx={{ padding: '0% 5% 2% 10% ' }}>

                                                <h3>{info.titulo}</h3>
                                                <p>Autor: {info.author}</p>
                                                <p>Descripicón: {info.descripcion}</p>


                                            </Box>
                                        </Box>
                                    </>
                                )
                                }
                            </>
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}