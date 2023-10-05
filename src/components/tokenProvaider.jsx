import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function TokenProvider({children}){
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [doc, setDoc] = useState("");
    async function getAuth (){
        const token = await JSON.parse(localStorage.getItem("session"));
        if(token){
            setToken(token.token);
            setName(token.nombre);
            setDoc(token.documento);
            return token
        };
    }
    const getToken = async()=>{
        const access = await JSON.parse(localStorage.getItem("session"));
        if(access){
            setToken(access.token)
            setName(access.nombre);
            setDoc(access.documento);
            return access;
        }
    }
    const setAuth = (token, name, doc)=> {
        setToken(token);
        setName(name);
        setDoc(doc);
        localStorage.setItem("session", JSON.stringify({token: token, nombre: name, documento: doc}) );
    }
    function singOut (){
        localStorage.clear();
    } 
    return (
        <AuthContext.Provider value={{token, setAuth, getAuth, getToken, singOut,name, doc}}>
            {children}
        </ AuthContext.Provider>
    )    
    
}

export function useToken(){
    return useContext(AuthContext);
}
