import { UserSingUpController, Userlogin } from "../controllers/loginController.js";
import {getReturnsByTopBookController, getBookByEditorialController } from "../controllers/getDataController.js"
import { Router } from "express";
import routesVersioning from "express-routes-versioning";
const appSingUP = Router();
const router = Router()
const versions = routesVersioning();
appSingUP.post("/", UserSingUpController, Userlogin);

router.get("/returnTopBook", versions({
    "2.0.0": getReturnsByTopBookController
}));
router.get("/bookEditorial", versions({
    "2.0.0": getBookByEditorialController
}));
export {appSingUP, router};