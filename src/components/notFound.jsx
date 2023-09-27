import React from "react";
import { useNavigate } from "react-router-dom";


export default function NotFound(){
    const navigate = useNavigate();

    const login = ()=>{
        navigate("/login")
    }
    return(
        <div>
            <h1>Sesion no encontrada</h1>
            <br></br>
            <button onClick={login}> Ingresar nuevamente </button>
        </div>
    )
}