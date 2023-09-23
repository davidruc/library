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
    /* 11. param = name */
    router.get("/reservationByTitle", versions({
        "2.0.0":  controller.getRecervationByTitleController
    }));
    /* 12. param = month */
    router.get("/reservationByMonth", versions({
        "2.0.0":  controller.getRecervationByMonthController
    }));
    /* 13. param = name */
    router.get("/reservationByName", versions({
        "2.0.0":  controller.getRecervationByNameController
    }));
    /* 15.  */
    router.get("/reservationTop", versions({
        "2.0.0":  controller.getRecervationTopController
    }));
    /* 16.  */
    router.get("/reservationBookTop", versions({
        "2.0.0":  controller.getRecervationBookTopController
    }));
    /* 17. */
    //todo:  Esta consulta puede ser útil para buscar los libros disponibles en las otras consultas
    router.get("/booksFree", versions({
        "2.0.0":  controller.getBookReservationFreeController
    }));
    /* 19. */
    router.get("/loansManyActive", versions({
        "2.0.0":  controller.getLoansManyActiveController
    }));
    /* 20. */
    router.get("/loanLate", versions({
        "2.0.0":  controller.getLoansLateController
    }));
    /* 21.  */
    router.get("/loanTopBook", versions({
        "2.0.0":  controller.getLoansTopBookActiveController
    }));
    /* 23.  */
    router.get("/returnTopBook", versions({
        "2.0.0":  controller.getReturnsByTopBookController
    }));
    /* 24.  */
    router.get("/returnUserTop", versions({
        "2.0.0":  controller.getReturnsTop10Controller
    }));
    /* 25.  */
    router.get("/returnLate", versions({
        "2.0.0":  controller.getReturnsLateOrderController
    }));
    /* 26. param = month */
    router.get("/returnByMonth", versions({
        "2.0.0":  controller.getReturnsByMonthController
    }));
    /* 27. param = doc */
    router.get("/userReservationON", versions({
        "2.0.0":  controller.getUsersReservationOnController
    }));
    /* 28. */
    router.get("/staffTeams", versions({
        "2.0.0":  controller.getStaffByTeamsController
    }));
    /* 29.  */
    router.get("/staffSalary", versions({
        "2.0.0":  controller.getStaffBySalaryController
    }));
    /* 30. */
    router.get("/staffSeniority", versions({
        "2.0.0":  controller.getStaffBySeniorityController
    }));
    /* 31. param = status */
    router.get("/reservationPending", versions({
        "2.0.0":  controller.getRecervationPendingController
    }));

    
   
    
    return router;
}
export default getInitRoute;

