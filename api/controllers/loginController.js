import * as service from "../services/postServices.js";
import { crearToken } from "../token/JWTcreation.js";
import {getUserByEmailService} from "../services/getServices.js"
export const Userlogin = (req, res, next)=>{
    res.status(200).json(req.data)
} 

export const UserSingUpController = async (req, res, next) => {
    try {
        const data = req.body;
        const email = data.email;
        const correo = await getUserByEmailService(email);
        console.log(correo.length !== 0);
        if(correo.length !== 0) return res.send({message: "Este correo electrónico ya está siendo usado por otro usuario."})
        const login = await service.postUserService(data);
        console.log("respose: ",login);
        if(login.acknowledged === true){ 
            let info =  { "email": data.email, "password": data.password };
            req.body = info
            crearToken(req, res, next);
        }
    } catch (error) {
        res.send(error);
    }
}