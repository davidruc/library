import { Router } from "express";
import * as controller from "../controllers/postDataController.js";
import routesVersioning from "express-routes-versioning";

const postInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.post("/books", versions({
        "2.0.0":  controller.postBookController
    }));
    router.post("/loans", versions({
        "2.0.0":  controller.postLoanController
    }));
    router.post("/reservations", versions({
        "2.0.0":  controller.postReservationController
    }));
    router.post("/returns", versions({
        "2.0.0":  controller.postReturnController
    }));
    router.post("/staff", versions({
        "2.0.0":  controller.postStaffController
    }));
    router.post("/users", versions({
        "2.0.0":  controller.postUserController
    }));
    router.post("/loansReal", versions({
        "2.0.0":  controller.postLoanRealShitController
    }));
    router.post("/reservationReal", versions({
        "2.0.0":  controller.postRealReservationController
    }));
    return router;
}
export default postInitRoute;

