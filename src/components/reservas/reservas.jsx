import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useToken } from '../tokenProvaider';
import { useNavigate } from 'react-router-dom';
import "./reservas.css";

export default function Reservations() {
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
        const doc = await access.documento;
        try {
            setLoading(true);
            const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/userReservationON?doc=${doc}`, {
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
        }
    }

    async function postNewReservation() {
        const access = await getToken();
        const token = await access.token;
        const name = await access.nombre;
        const cuerpo = {
            "titulo": info.titulo,
            "nombre_usuario": name
        }
        try {
            const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/reservationReal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Version": "2.0.0",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cuerpo)
            });
            console.log(res);
            const response = await res.json();
            setResponse(response);
            return response;
            
        } catch (error) {
            alert("Error subiendo los datos de la reserva")
        }
    }
console.log(response);
    useEffect(()=>{
        getReservations();
    },[response])
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', margin: '5% 10%' }}>
                    <h2 className='titleReservation'>Reservas</h2>
                    <button onClick={handleCargaBoton} className='botonReservacion' >Realizar una reserva</button>
                </Box>
                <Box sx={{ backgroundColor: '#FFEEDD', display: 'flex', flexDirection: 'column', padding: '2% 5% 3% 5% ' }}>
                    {
                        cargaDefault ? (
                            <>
                                <p className='tituloDeReservas'>Tus reservas activas</p>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'start' } }}>

                                    {
                                        loading ? (
                                            <p>loading ...</p>
                                        ) : (

                                            datos.map((data) => (
                                                <>
                                                    {
                                                        data.reservas.map((reserva) => (
                                                            <Box className='box' sx={{ backgroundColor: '#B8B8FF', margin: '.5% 3% .5% 0', padding: '2%', width: "300px", height: "280px", borderRadius: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                <p>Libro en espera: </p>
                                                                <h3>{reserva.titulo}</h3>
                                                                <p>Fecha de la reserva: </p>
                                                                <h3>{new Date(reserva.fecha_reservacion).toISOString().slice(0, 10)}</h3>
                                                                <p>Entrega estimada: </p>
                                                                <h3>
                                                                    {new Date(reserva.entrega_esperada).toISOString().slice(0, 10)}
                                                                </h3>
                                                            </Box>
                                                        ))
                                                    }
                                                </>
                                            ))

                                        )
                                    }
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{display: 'flex', justifyContent: 'start'}}>
                                 <button className='buttonGoBack' onClick={handleVolver}>Volver a mis reservas</button>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection:'column', padding: '6% '}}>
                                    <p className='titleR'>Realizar una reserva:</p>
                                    <Box  sx={{display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection:'column'}} >
                                    <form onSubmit={(e) => { handleReserva(e) }}>
                                        <input  type="text" className='inputReservas' name='titulo' placeholder='Ingrese el titulo del libro que desea apartar' onChange={handleInputChange} ref={titulo} required />
                                        <button className='botonReserva' type='submit'>Realizar reserva</button>
                                    </form>
                                        {
                                            mensaje ? (
                                                <>  
                                                    <Box sx={{backgroundColor: '#F8F7FF', borderRadius: '30px', margin: '3% 25% 0 25%', padding: '1.5%'}}>
                                                        <p>Mensaje: {response.message}.</p>
                                                    </Box>
                                                </>
                                            ) : (
                                                <p></p>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </>
                        )
                    }
                </Box>
            </Box>
        </>
    )
}