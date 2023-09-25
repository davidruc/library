import React from "react";
import { useNavigate } from "react-router-dom";


export default function Welcome(){
    const navigate = useNavigate();

    const login = ()=>{
        navigate("/login")
    }
    return(
        <div>
            <h1>Bienvenido</h1>
            <br></br>
            <button onClick={login}> Ingresar </button>
        </div>
    )
}