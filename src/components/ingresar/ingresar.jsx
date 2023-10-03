import React from "react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useToken } from "../tokenProvaider";
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from "../../../public/LogoFondoClaro.png"
import './ingresar.css'

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useToken();

    const [showFormulary, setShowFormulary] = useState(true);

    const [info, setInfo] = useState({
        correo: "",
        contraseña: ""
    });

    const home = () => {
        navigate("/")
    }
    const back = () => {
        navigate("/")
    }
    const register = () => {
        navigate("/SingUp")
    }

    const handleUsername = (e) => {
        setInfo({
            ...info,
            correo: e.target.value
        });
    };

    const handleContraseña = (e) => {
        setInfo({
            ...info,
            contraseña: e.target.value
        })
    }

    async function gettoken() {
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const response = await res.json()
        return response;
    }
    async function enviar(e) {
        e.preventDefault();
        const info_res = await gettoken();
        if (info_res.status === 200) {
            // setInfo(info_res);
            setAuth(info_res.message, info_res.data.nombre)
            home();
            setShowFormulary(false);
        } else {
            if (info_res.mesaage) { alert(info_res.mesaage) }
            else if (info_res.error) {
                info_res.error.map((val) => { alert(`ERROR: ${val.msg}.`) })
            }
        }
    }
    return (
        <>
            {showFormulary && (
                <>
                    <Box sx={{width: '100%'}}>

                    
                    <Box sx={{ backgroundColor: '#9381FF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0 0 30px 30px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'start', width: '90%' }}>
                            <button className="buttonBack" onClick={back}><ArrowBackIcon sx={{ fill: '#FFEEDD' }} /></button>
                        </Box>
                        <Box className='titulo' sx={{ margin: { xs: '6% 0 10% 0', sm: '3% 0 7% 0', md: '0 0 4% 0', lg: '0 0 2.5% 0' } }}>
                            <h3>Ingresar</h3>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <input className="inputs" type="text" name="user" placeholder="Ingrese su correo" onChange={handleUsername} />
                            <input className="inputs" type="text" name="pass" onChange={handleContraseña} placeholder="Ingrese su contraseña" />
                            <Box sx={{ display: 'flex', justifyContent: 'end', width: '70%' }}><button onClick={register} className="buttonNew">Eres nuevo aquí?</button></Box>
                        </Box>
                        <Box sx={{ margin: { xs: '18% 0', sm: '12% 0', md: '5% 0', lg: '3% 0' } }}>
                            <button className="buttonSubmit" type="submit" onClick={(e) => { enviar(e); }}>Ingresar</button>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: { xs: '16%', md: '6%', lg: '1.5%' }, display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <img className="logo" src={logo} alt="" />
                    </Box>
                    </Box>
                </>
            )}

            <Outlet context={[info]} />
        </>
    )
}