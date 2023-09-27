import { SignJWT } from "jose";
import { connect } from "../db/connection.js";
import config from "../utils/config.js";
 
const dbConnect = await connect(); 
export const crearToken = async(req, res, next)=>{
    if (Object.keys(req.body).length === 0) return res.status(400).send({mesaage: "not send data"});
    let { email, password } = req.body
    const result = await dbConnect.collection('users').aggregate([
        {
            $match: {
                email: {$eq: email},
                password: {$eq: password}
            }
        },
        {
            $project: {
                documento: "$document",
                nombre: "$user_name",
                direccion_entregas: "$address",
                correo: "$email",
            }
        }
    ]).next();
    if (JSON.stringify(Object.keys(req.body)) !== JSON.stringify(['email', 'password'])) return res.status(417).send({message: "Wrong values send in the files, you must pass the email and the password."})
    if (!result) return res.status(401).send({mesaage: "session not found"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(config.key));
    req.data = {status: 200, message: jwtConstructor, data: result };
    next(); 
}   
   
