import React from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./tokenProvaider";

export default function DashBoardView(){
    const navigate = useNavigate();
    const {name, singOut} = useToken(); 
    const goBack = ()=>{
        singOut();
        navigate("/")
    }
        return(
        <div>
            <h1>Hola de vuelta {name}</h1>
            <button onClick={goBack}>Salir</button>
        </div>
        )
}