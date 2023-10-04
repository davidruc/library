import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import NotFoundView from "./views/NotFoundView"
import SingUpView from "./views/SingUpView";
import BooksView from "./views/BooksView"
import { useToken } from "./components/tokenProvaider";

export default function App(){
    const {getAuth} = useToken();

    useEffect(()=>{
        getAuth();
    },[])

    return(
         <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/notFound" element={<NotFoundView/>} />
                <Route path="/login" element={<LoginView/>}/>    
                <Route path="/SingUp" element={<SingUpView/>}/>
                <Route path="/books" element={<BooksView/>} />
            </Routes>
        </BrowserRouter>
    )
}