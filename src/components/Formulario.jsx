import React from "react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
export default function Formulary() {
    const navigate = useNavigate();

    const [showFormulary, setShowFormulary] = useState(true);
    
    const [info, setInfo] = useState({
        correo: "",
        Contraseña: ""
    });

    const home = ()=>{
        navigate("/login/home")
    }
    const back = ()=>{
        navigate("/notFound")
    }

    const handleUsername = (e) =>{
        setInfo({
            ...info,
            correo : e.target.value
        });
    };

    const handleContraseña = (e) => {
        setInfo({
            ...info,
            Contraseña : e.target.value
        })
    }
    
    async function gettoken () {
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
    async function enviar(e){
        e.preventDefault();
        const info_res = await gettoken();
        setInfo(info_res);
        if(!info_res.mesaage){
            home();
            setShowFormulary(false);
        }else {
            back();
        }
    }
    return (
        <>
            {showFormulary && (
            <div>
                <div>Log In</div>
                <input type="text" name="user" placeholder="ingrese el correo" onChange={handleUsername} /><br></br>
                <input type="text" name="pass" onChange={handleContraseña} placeholder="ingrese la contraseña" /><br></br>
                <div id="info">
                    <button type="submit" onClick={(e)=>{enviar(e); console.log(info);}}>Click</button>
                </div>
            </div>
            )}

            <Outlet context={[info]} />
        </>
    )
}