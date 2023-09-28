import { Router } from "express";
import * as controller from "../controllers/postDataController.js";
import routesVersioning from "express-routes-versioning";
import { bookDTO, loanDTO, reservationDTO, returnDTO, staffDTO, queryDTO } from "../middleware/dtoCollections.js";
import * as validator from "../middleware/verifyData.js"
import {registerDTO } from "../middleware/dtoLogin.js"
const postInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.post("/books", bookDTO, validator.ValidateBooks, versions({
        "2.0.0":  controller.postBookController
    }));
    router.post("/loans", loanDTO, validator.ValidateLoans ,versions({
        "2.0.0":  controller.postLoanController
    }));
    router.post("/reservations",reservationDTO, validator.ValidateReservations ,versions({
        "2.0.0":  controller.postReservationController
    }));
    router.post("/returns", returnDTO, validator.ValidateReturns ,versions({
        "2.0.0":  controller.postReturnController
    }));
    router.post("/staff",staffDTO, validator.ValidateStaff ,versions({
        "2.0.0":  controller.postStaffController
    }));
    router.post("/users", registerDTO, validator.ValidateSingUp, versions({
        "2.0.0":  controller.postUserController
    }));
    router.post("/loansReal",queryDTO, validator.ValidateQuerys, versions({
        "2.0.0":  controller.postLoanRealShitController
    }));
    router.post("/reservationReal",queryDTO, validator.ValidateQuerys, versions({
        "2.0.0":  controller.postRealReservationController
    }));
    router.post("/returnReal",queryDTO, validator.ValidateQuerys, versions({
        "2.0.0":  controller.postReturnRealController
    }));
    return router;
}
export default postInitRoute;

