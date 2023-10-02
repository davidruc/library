import { UserSingUpController, Userlogin } from "../controllers/loginController.js";
import {getReturnsByTopBookController} from "../controllers/getDataController.js"
import { Router } from "express";
import routesVersioning from "express-routes-versioning";
const appSingUP = Router();
const router = Router()
const versions = routesVersioning();
appSingUP.post("/", UserSingUpController, Userlogin);
router.get("/", versions({
    "2.0.0": getReturnsByTopBookController
}));
export {appSingUP, router};