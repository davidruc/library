import { Router } from "express";
import { limitPetitions } from "../helpers/limit.js";
import getInitRoute from "./getData.js";
import postInitRoute from "./postData.js";
import putInitRoute from "./putData.js";
import deleteInitRoute from "./deleteData.js";
import passport from "../helpers/passportHelper.js";

const initApiRoutes = ()=>{
    const router = Router();
    router.use(passport.authenticate("bearer", {session: false}));
    router.use("/use", limitPetitions() ,getInitRoute());
    router.use("/use", limitPetitions() ,postInitRoute());
    router.use("/use", limitPetitions() ,putInitRoute());
    router.use("/use", limitPetitions() ,deleteInitRoute());
    return router;
}

export default initApiRoutes;