import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useToken } from '../tokenProvaider';
import { useNavigate } from 'react-router-dom';
import defaultImage from "../../assets/bookDefault.png"
import "./historial.css";

export default function Historial() {
    const navigate = useNavigate();
    const { getToken } = useToken();
    const [datos, setDatos] = useState([])
    const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(true);
    const [cargaDefault, setCargaDefault] = useState(true);
    const [mensaje, setMensaje] = useState(false)
    const titulo = useRef(null);
    const [info, setInfo] = useState({
        titulo: ''
    })
    const handleCargaBoton = () => {
        setCargaDefault(false)
    }
    const handleVolver =  () => {
        setCargaDefault(true)
    }
    const handleResponse = () => {
        setMensaje(true)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInfo({
            ...info,
            [name]: value
        });
    }

    const handleReserva = (e) => {
        e.preventDefault();
        postNewReservation();
        handleResponse()
        titulo.current.value = '';
    }

    useEffect(() => {
        const authToken = async () => {
            const tokensito = await getToken();
            console.log(tokensito);
            if (!tokensito) {
                navigate("/login");
            };
        }
        authToken();
    }, [])

    useEffect(() => {
          getReservations();
    }, [])

    useEffect(() => {
        if (datos.length > 0) {
            setLoading(false);
        }
    }, [datos]);

    async function getReservations() {
            
        const access = await getToken();
        const token = await access.token;
        const name = await access.nombre;
        try {
            setLoading(true);
            const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/reservationsByName?user=${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Version": "2.0.0",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                const response = await res.json();
                console.log(response);
                setDatos(response);
                return response;
            }
            else {
                alert("error trayendo los datos");
            }
        } catch (error) {
            alert("error");
        }
    }

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', margin: '5% 10%' }}>
                    <h2 className='titleReservation'>Historial de prestamos</h2>
                </Box>
                <Box sx={{ backgroundColor: '#FFEEDD', display: 'flex', flexDirection: 'column', padding: '2% 5% 3% 5% ' }}>
               
                            <>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'start' } }}>
                                    {
                                        loading ? (
                                            <p>loading ...</p>
                                        ) : (
                                            datos.map((data) => (
                                                <>
                                                    {
                                                       data.titulo ? (
                                                           <Box className='box' sx={{ backgroundColor: '#B8B8FF', margin: {xs:'5%' ,md: '.5% 3% .5% 0'}, padding: {xs: '10%',md:'.3% .2%'}, width: "280px", height: "500px", borderRadius: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                               <p>Libro prestado: </p>
                                                               <h3>{data.titulo}</h3>
                                                               {
                                                                data.imagen == '' ? (<img className='imagenbook' src={defaultImage} alt="" />) : (  <img className='imagenbook' src={data.imagen} alt="" />)
                                                            }
                                                               <p>Dia entregado: </p>
                                                               <h3>{new Date(data.dia_entregada).toISOString().slice(0, 10)}</h3>
                                                               {
                                                                data.dias_retrasado > 1 ? (
                                                                <>
                                                                    <p>Entregaste este libro con {data.dias_retrasado} días de retraso </p>
                                                               <h3>
                                                                   {new Date(reserva.dia_esperado).toISOString().slice(0, 10)}
                                                               </h3>
                                                                </>
                                                                ): (<></> )
                                                               }
                                                               
                                                           </Box>
                                      
                                                       ): (
                                                        <></>
                                                       ) 
                                                    }
                                                </>
                                            ))

                                        )
                                    }
                                </Box>
                            </>

                </Box>
            </Box>
        </>
    )
}