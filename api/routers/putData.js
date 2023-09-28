import { Router } from "express";
import * as controller from "../controllers/putDataController.js";
import routesVersioning from "express-routes-versioning";
import { bookDTO, loanDTO, reservationDTO, returnDTO, staffDTO, userDTO } from "../middleware/dtoPut.js";
import * as validator from "../middleware/verifyData.js";


const putInitRoute = ()=>{
    const router = Router();
    const versions = routesVersioning();
    router.put("/books", bookDTO, validator.ValidateBooks, versions({
        "2.0.0":  controller.updateBookController
    }));
    router.put("/loans",loanDTO, validator.ValidateLoans, versions({
        "2.0.0":  controller.updateLoanController
    }));
    router.put("/reservations",reservationDTO, validator.ValidateReservations ,versions({
        "2.0.0":  controller.updateReservationController
    }));
    router.put("/returns",returnDTO, validator.ValidateReturns ,versions({
        "2.0.0":  controller.updateReturnController
    }));
    router.put("/staff",staffDTO, validator.ValidateStaff,versions({
        "2.0.0":  controller.updateStaffController
    }));
    router.put("/users", userDTO, validator.ValidateSingUp, versions({
        "2.0.0":  controller.updateUserController
    }));
    return router;
}
export default putInitRoute;

