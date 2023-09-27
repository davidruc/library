import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function DashBoardView(){
    const navigate = useNavigate();

    const goBack = ()=>{
        navigate("/")
    }
    const [info] = useOutletContext();
        return(
        <div>
            <h1>Hola de vuelta {info.data.nombre} :D</h1>
            <button onClick={goBack}>Salir</button>
        </div>
        )
}