import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function TokenProvider({children}){
    const [token, setToken] = useState("");
    const [name, setName] = useState("");

    async function getAuth (){
        const token = await JSON.parse(localStorage.getItem("session"));
        if(token){
            setToken(token.token);
            setName(token.nombre);
            return token
        };
    }
    const getToken = async()=>{
        const access = await JSON.parse(localStorage.getItem("session"));
        if(access){
            setToken(access.token)
            setName(access.nombre);
            return access;
        }
    }
    const setAuth = (token, name)=> {
        setToken(token);
        setName(name);
        localStorage.setItem("session", JSON.stringify({token: token, nombre: name}) );
    }
    function singOut (){
        localStorage.clear();
    } 
    return (
        <AuthContext.Provider value={{token, setAuth, getAuth, getToken, singOut,name}}>
            {children}
        </ AuthContext.Provider>
    )    
}

export function useToken(){
    return useContext(AuthContext);
}
