import { validationResult } from "express-validator";

export const ValidateSession = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let { email, password } = req.body;
    let data = {"correo": email, "contraseña": password};
    req.body = data;
    next();
}