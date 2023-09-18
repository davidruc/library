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
    router.use("/get", limitPetitions() ,getInitRoute());
    router.use("/post", limitPetitions() ,postInitRoute());
    router.use("/put", limitPetitions() ,putInitRoute());
    router.use("/delete", limitPetitions() ,deleteInitRoute());
    return router;
}

export default initApiRoutes;