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

    /* 1. param = name*/
    router.get("/bookTitle", versions({
        "2.0.0":  controller.getBookByTitleController
    }));
    /* 2. param = name */
    router.get("/bookAuthor", versions({
        "2.0.0":  controller.getBookByAuthorController
    }));
    /* 3.  */
    router.get("/booksByAuthor", versions({
        "2.0.0":  controller.getBooksAuthorController
    }));
    /* 4. param = state */
    router.get("/bookAviability", versions({
        "2.0.0":  controller.getBookByAviabilityController
    }));
    /* 5.  */
    router.get("/bookDewey", versions({
        "2.0.0":  controller.getBookByDeweyController
    }));
    /* 6. param = place */
    router.get("/bookLocation", versions({
        "2.0.0":  controller.getBookByLocationController
    }));
    /* 7. param = name */
    router.get("/bookEditorial", versions({
        "2.0.0":  controller.getBookByEditorialController
    }));
    /* 8.  */
    //!
    /* 9. param = year */
    router.get("/bookYear", versions({
        "2.0.0":  controller.getBookByYearController
    }));
    /* 10. param = status */
    router.get("/bookStatus", versions({
        "2.0.0":  controller.getBookByStatusController
    }));
   
    
   
    
    return router;
}
export default getInitRoute;

