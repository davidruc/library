import React from "react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useToken } from "../tokenProvaider";
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from "../../../public/LogoFondoClaro.png";
import './registrar.css';
export default function SingUp(){
    const navigate = useNavigate();
    const {setAuth} = useToken()
    const [showFormulary, setShowFormulary] = useState(true);
    
    const [info, setInfo]= useState({
        documento: 0,
        nombre: "",
        direccion: "",
        correo: "",
        contraseña: ""
    })
    const home = ()=>{
        navigate("/")
    }
    const back = ()=>{
        navigate("/")
    }
    const login = () => {
        navigate("/login")
    }
    const handleDocument = (e) =>{
        setInfo({
            ...info, 
            documento: e.target.value
        })
    }
    const handleUser = (e) =>{
        setInfo({
            ...info, 
            nombre: e.target.value
        })
    }
    const handleAddress = (e) =>{
        setInfo({
            ...info, 
            direccion: e.target.value
        })
    }
    const handleEmail = (e) =>{
        setInfo({
            ...info, 
            correo: e.target.value
        })
    }
    const handlePassword = (e) =>{
        setInfo({
            ...info, 
            contraseña: e.target.value
        })
    }
    async function singUpData(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/singUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const response = await res.json()
        return response;
    }   
    async function send(e){
        e.preventDefault();
        const info_res = await singUpData();
        if(info_res.status === 200){
            setAuth(info_res.message, info_res.data.nombre)
         /*    setInfo(info_res); */
            home();
            setShowFormulary(false);
        } else {
            console.log(info_res);
            if(info_res.mesaage){alert(info_res.mesaage)}
            else if(info_res.message){alert(info_res.message)}
            else {
                info_res.error.map((val)=>{ alert(`ERROR: ${val.msg}.`)})
            }
        }
    }
    return(
        <>
           {showFormulary && (
             <>
             <Box sx={{width: '100%'}}>       
             <Box sx={{ backgroundColor: '#9381FF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '0 0 30px 30px' }}>
                 <Box sx={{ display: 'flex', justifyContent: 'start', width: '90%' }}>
                     <button className="buttonBack" onClick={back}><ArrowBackIcon sx={{ fill: '#FFEEDD' }} /></button>
                 </Box>
                 <Box className='titulo' sx={{ margin: { xs: '6% 0 5% 0', sm: '3% 0 3% 0', md: '0 0 1.5% 0', lg: '0 0 .5% 0' } }}>
                     <h3>Registrar</h3>
                 </Box>
                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <input  className='inputs' type="number" name="doc" placeholder="ingrese el documento" onChange={handleDocument} />
                 <input  className='inputs' type="text" name="user" onChange={handleUser} placeholder="ingrese el usuario" />
                 <input  className='inputs' type="text" name="place" onChange={handleAddress} placeholder="ingrese la direccion" />
                 <input  className='inputs' type="text" name="email" placeholder="ingrese el correo" onChange={handleEmail} />
                 <input className='inputs'  type="text" name="pass" onChange={handlePassword} placeholder="ingrese la contraseña" />
                     <Box sx={{ display: 'flex', justifyContent: 'end', width: '70%' }}><button onClick={login} className="buttonNew">Ya tienes una cuenta?</button></Box>
                 </Box>
                 <Box sx={{ margin: { xs: '12% 0', sm: '6% 0', md: '3% 0', lg: '1% 0' } }}>
                     <button className="buttonSubmit" type="submit" onClick={(e) => { send(e); }}>Registrar</button>
                 </Box>
             </Box>
             <Box sx={{ marginTop: { xs: '16%', md: '6%', lg: '1.5%' }, display: 'flex', justifyContent: 'center' }}>
                 <img className="logo" src={logo} alt="" />
             </Box>
             </Box>
         </>

            
           )}
            <Outlet context={[info]}/>
        </>
    )
}
