import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";
import { connect } from "../db/connection.js";
import config from "../utils/config.js";

const dbConnect = await connect(); 
export const validarToken = async (req, token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(config.key)
        );
        let res = await dbConnect.collection('users').findOne(
            {
                _id: new ObjectId(jwtData.payload.id), 
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        );
        const error = {message: "you dont have access to this method"}
        if(!res.permisos[req.baseUrl].includes(req.method)) return error; 
        let {_id, permisos, ...session} = res;
        return session;
    } catch (error) { 
        return false;
    }
}