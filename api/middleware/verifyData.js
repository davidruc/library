import { validationResult } from "express-validator";

export const ValidateSession = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let { correo, contraseña } = req.body;
    let data = {"email": correo, "password": contraseña};
    req.body = data;
    next();
};
export const ValidateSingUp = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let {documento, nombre, direccion , correo, contraseña } = req.body;
    parseInt(documento);
    let data = { "document":documento, "user_name":nombre, "address":direccion ,"email": correo, "password": contraseña};
    req.body = data;
    next();
}