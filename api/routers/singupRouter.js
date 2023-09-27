import { UserSingUpController, Userlogin } from "../controllers/loginController.js";
import { Router } from "express";
const appSingUP = Router();

appSingUP.post("/", UserSingUpController, Userlogin);

export {appSingUP};