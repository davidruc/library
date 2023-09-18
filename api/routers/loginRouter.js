import { crearToken } from "../token/JWTcreation.js";
import { Router } from "express";
import { Userlogin } from "../controllers/loginController.js";

const appLogin = Router();

appLogin.use(crearToken);
appLogin.post("/", Userlogin);

export {appLogin};