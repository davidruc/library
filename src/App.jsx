import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import LoansView from "./views/loansView";
import NotFoundView from "./views/NotFoundView"
import SingUpView from "./views/SingUpView";
import BooksView from "./views/BooksView";
import { useToken } from "./components/tokenProvaider";
import ReservationsView from "./views/ReservationsView";
import HistoryView from "./views/HistorialView";

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
                <Route path="/reservations" element={<ReservationsView/>} />
                <Route path="/loans" element={<LoansView/>} />
                <Route path="/returns" element={<HistoryView/>} />
            </Routes>
        </BrowserRouter>
    )
}