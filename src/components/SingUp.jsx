import React from "react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useToken } from "./tokenProvaider";
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
            if(info_res.mesaage){alert(info_res.mesaage)}
            else if(info_res.error){
                info_res.error.map((val)=>{ alert(`ERROR: ${val.msg}.`)})
            }
        }
    }
    return(
        <>
           {showFormulary && (
             <div>
             <div>SingUn</div>
                 <input type="number" name="doc" placeholder="ingrese el documento" onChange={handleDocument} /><br></br>
                 <input type="text" name="user" onChange={handleUser} placeholder="ingrese el usuario" /><br></br>
                 <input type="text" name="place" onChange={handleAddress} placeholder="ingrese la direccion" /><br></br>
                 <input type="text" name="email" placeholder="ingrese el correo" onChange={handleEmail} /><br></br>
                 <input type="text" name="pass" onChange={handlePassword} placeholder="ingrese la contraseña" /><br></br>
                 <div id="info">
                     <button type="submit" onClick={(e)=>{send(e)}}>Click</button>
                     <button onClick={back}>volver</button>
                 </div>
             </div>
           )}
            <Outlet context={[info]}/>
        </>
    )
}
