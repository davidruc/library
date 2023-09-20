import { Router } from "express";
import * as controller from "../controllers/getDataController.js";
import routesVersioning from "express-routes-versioning";

const getInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.get("/books", versions({
        "2.0.0":  controller.getBooksController
    }));
    router.get("/loans", versions({
        "2.0.0":  controller.getLoansController
    }));
    router.get("/reservations", versions({
        "2.0.0":  controller.getReservationsController
    }));
    router.get("/returns", versions({
        "2.0.0":  controller.getReturnsController
    }));
    router.get("/staff", versions({
        "2.0.0":  controller.getStaffController
    }));
    router.get("/users", versions({
        "2.0.0":  controller.getUsersController
    }));
    /* 1.  */
    router.get("/bookTitle", versions({
        "2.0.0":  controller.getBookByTitleController
    }));
    return router;
}
export default getInitRoute;

