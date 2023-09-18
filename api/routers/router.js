import { Router } from "express";
import { limitPetitions } from "../helpers/limit.js";
import getInitRoute from "./getData.js";
import passport from "../helpers/passportHelper.js";

const initApiRoutes = ()=>{
    const router = Router();
    router.use(passport.authenticate("bearer", {session: false}));
    router.use("/use", limitPetitions() ,getInitRoute());
    return router;
}

export default initApiRoutes;