import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashBoardView(){
    const [info] = useOutletContext();
    console.log(info);
        return(
        <div>
            <h1>Hola de vuelta {info.usuario} :D</h1>
        </div>
        )
}