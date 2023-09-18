import { Router } from "express";
import * as controller from "../controllers/getDataController.js";

const getInitRoute = ()=>{
    const router = Router();
    router.get("/books", controller.BooksController);
    return router;
}
export default getInitRoute;

