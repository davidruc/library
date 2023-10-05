import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useToken } from '../tokenProvaider';
import { useNavigate } from 'react-router-dom';
import defaultImage from "../../assets/bookDefault.png"
import "./loans.css";

export default function Loans() {
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
            if (!tokensito) {
                navigate("/login");
            };
        }
        authToken();
    }, [])

    useEffect(() => {
          getLoans();
    }, [])

    useEffect(() => {
        if (datos.length > 0) {
            setLoading(false);
        }
    }, [datos]);

    async function getLoans() {
            
        const access = await getToken();
        const token = await access.token;
        const name = await access.nombre;
        try {
            setLoading(true);
            const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/loanByName?user=${name}`, {
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

    async function postNewReservation() {
        const access = await getToken();
        const token = await access.token;
        const name = await access.nombre;
        const cuerpo = {
            "titulo": info.titulo,
            "nombre_usuario": name
        }
        try {
            const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/loansReal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Version": "2.0.0",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cuerpo)
            });
            const response = await res.json();
            setResponse(response);
            console.log(response);
            return response;
            
        } catch (error) {
            alert("Error subiendo los datos de la reserva")
        }
    }
    useEffect(()=>{
        getLoans();
    },[response])
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', margin: '5% 10%' }}>
                    <h2 className='titleReservation'>Prestamos</h2>
                    <button onClick={handleCargaBoton} className='botonReservacion' >Realizar un nuevo prestamo</button>
                </Box>
                <Box sx={{ backgroundColor: '#FFEEDD', display: 'flex', flexDirection: 'column', padding: '2% 5% 3% 5% ' }}>
                    {
                        cargaDefault ? (
                            <>
                                <p className='tituloDeReservas'>Tus prestamos activos</p>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'start' } }}>

                                    {
                                        loading ? (
                                            <p>loading ...</p>
                                        ) : (

                                            datos.map((data) => (
                                                
                                                    data.titulo ? (
                                                        <>
                                                    {
                                                         <Box className='box' sx={{ backgroundColor: '#B8B8FF', margin: {xs:'5%' ,md: '.5% 3% .5% 0'}, padding: {xs: '10%',md:'3% 2%'}, width: "280px", height: "500px", borderRadius: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                         <p>Libro prestado: </p>
                                                         <h3>{data.titulo}</h3>
                                                         <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                         {
                                                                data.imagen == '' ? (<img className='imagenbook' src={defaultImage} alt="" />) : (  <img className='imagenbook' src={data.imagen} alt="" />)
                                                         }
                                                         </Box>
                                                         
                                                         <p>Inicio prestamo: </p>
                                                         <h3>{new Date(data.fecha_reservacion).toISOString().slice(0, 10)}</h3>
                                                         <p>Entrega del libro: </p>
                                                         <h3>
                                                             {new Date(data.fecha_entrega).toISOString().slice(0, 10)}
                                                         </h3>
                                                     </Box>
                                                    }
                                                </>
                                                    ) : (
                                                       <></>
                                                    )
                                                
                                                
                                            ))

                                        )
                                    }
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{display: 'flex', justifyContent: 'start'}}>
                                 <button className='buttonGoBack' onClick={handleVolver}>Volver a mis prestamos</button>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection:'column', padding: '6% '}}>
                                    <p className='titleR'>Solicitar un prestamo:</p>
                                    <Box  sx={{display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection:'column'}} >
                                    <form onSubmit={(e) => { handleReserva(e) }}>
                                        <input  type="text" className='inputReservas' name='titulo' placeholder='Ingrese el titulo del libro que desea solicitar' onChange={handleInputChange} ref={titulo} required />
                                        <button className='botonReserva' type='submit'>Realizar Prestamo</button>
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