import { Router } from "express";
import * as controller from "../controllers/deleteDataController.js";
import routesVersioning from "express-routes-versioning";

const deleteInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.delete("/books", versions({
        "2.0.0":  controller.deleteBookController
    }));
    router.delete("/loans", versions({
        "2.0.0":  controller.deleteLoanController
    }));
    router.delete("/reservations", versions({
        "2.0.0":  controller.deleteReservationController
    }));
    router.delete("/returns", versions({
        "2.0.0":  controller.deleteReturnController
    }));
    router.delete("/staff", versions({
        "2.0.0":  controller.deleteStaffController
    }));
    router.delete("/users", versions({
        "2.0.0":  controller.deleteUserController
    }));
    return router;
}
export default deleteInitRoute;

