import { Router } from "express";
import * as controller from "../controllers/getDataController.js";
import routesVersioning from "express-routes-versioning";

const getInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.get("/books", versions({
        "2.0.0":  controller.BooksController
    }));
    return router;
}
export default getInitRoute;

