import { Router } from "express";
import * as controller from "../controllers/putDataController.js";
import routesVersioning from "express-routes-versioning";

const putInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.put("/books", versions({
        "2.0.0":  controller.updateBookController
    }));
    router.put("/loans", versions({
        "2.0.0":  controller.updateLoanController
    }));
    router.put("/reservations", versions({
        "2.0.0":  controller.updateReservationController
    }));
    router.put("/returns", versions({
        "2.0.0":  controller.updateReturnController
    }));
    router.put("/staff", versions({
        "2.0.0":  controller.updateStaffController
    }));
    router.put("/users", versions({
        "2.0.0":  controller.updateUserController
    }));
    return router;
}
export default putInitRoute;

