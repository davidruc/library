import * as service from "../services/getServices.js";

export const getBooksController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const book = await service.getAllBooksService(code);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
export const getLoansController = async(req, res, next)=>{
    try {
        const {id_loan} = req.query;
        const loan = await service.getAllLoansService(id_loan);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
export const getReservationsController = async(req, res, next)=>{
    try {
        const {id_reservation} = req.query;
        const reservartion = await service.getAllReservationsService(id_reservation);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
export const getReturnsController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const returns = await service.getAllReturnsService(code);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
export const getStaffController = async(req, res, next)=>{
    try {
        const {id_employee} = req.query;
        const staff = await service.getAllStaffService(id_employee);
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
export const getUsersController = async(req, res, next)=>{
    try {
        const {id} = req.query;
        const users = await service.getAllUsersService(id);
        res.status(200).send(users);
    } catch (error) {
        res.send(error);
    }
}

//TODO: CONTROLADORES ESPECIFICOS
/* 1.  */
export const getBookByTitleController = async(req, res, next)=>{
    try {
        const {name} = req.query;
        const book = await service.getBookByTitleService(name);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 2. */
export const getBookByAuthorController = async(req, res, next)=>{
    try {
        const {name} = req.query;
        const book = await service.getBookByAuthorService(name);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 3. */
export const getBooksAuthorController = async(req, res, next)=>{
    try {
        const book = await service.getBooksAuthorService();
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 4. */
export const getBookByAviabilityController = async(req, res, next)=>{
    try {
        const {state} = req.query;
        const book = await service.getBookByAviabilityService(state);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 5. */
export const getBookByDeweyController = async(req, res, next)=>{
    try {
        const book = await service.getBookByDeweyService();
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 6.  */
export const getBookByLocationController = async(req, res, next)=>{
    try {
        const {place} = req.query;
        const book = await service.getBookByLocationService(place);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 7.  */
export const getBookByEditorialController = async(req, res, next)=>{
    try {
        const {name} = req.query;
        const book = await service.getBookByEditorialService(name);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 8 */
//!

/* 9. */
export const getBookByYearController = async(req, res, next)=>{
    try {
        const {year} = req.query;
        const book = await service.getBookByYearService(year);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 10. */
export const getBookByStatusController = async(req, res, next)=>{
    try {
        const {status} = req.query;
        const book = await service.getBookByStatusService(status);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
/* 11. */
export const getRecervationByTitleController = async(req, res, next)=>{
    try {
        const {name} = req.query;
        const reservartion = await service.getRecervationByTitleService(name);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
/* 12. */
export const getRecervationByMonthController = async(req, res, next)=>{
    try {
        const {month} = req.query;
        const reservartion = await service.getRecervationByMonthService(month);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
/* 13. */
export const getRecervationByNameController = async(req, res, next)=>{
    try {
        const {name} = req.query;
        const reservartion = await service.getRecervationByNameService(name);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
/* 15. */
export const getRecervationTopController = async(req, res, next)=>{
    try {
        const reservartion = await service.getRecervationTopService();
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
/* 16. */
export const getRecervationBookTopController = async(req, res, next)=>{
    try {
        const reservartion = await service.getRecervationBookTopService();
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
/* 17. */
//Todo: libros disponibles
export const getBookReservationFreeController = async(req, res, next)=>{
    try {
        const { name } = req.query
        const book = await service.getBookReservationFreeService(name);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}

/* 19. */
export const getLoansManyActiveController = async(req, res, next)=>{
    try {
        const loan = await service.getLoansManyActiveService();
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
/* 20. */
export const getLoansLateController = async(req, res, next)=>{
    try {
        const loan = await service.getLoansLateService();
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
/* 21. */
export const getLoansTopBookActiveController = async(req, res, next)=>{
    try {
        const loan = await service.getLoansTopBookActiveService();
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
/* 23. */
export const getReturnsByTopBookController = async(req, res, next)=>{
    try {
        const returns = await service.getReturnsByTopBookService();
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
/* 24. */
export const getReturnsTop10Controller = async(req, res, next)=>{
    try {
        const returns = await service.getReturnsTop10Service();
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
/* 25. */
export const getReturnsLateOrderController = async(req, res, next)=>{
    try {
        const returns = await service.getReturnsLateOrderService();
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
/* 26. */
export const getReturnsByMonthController = async(req, res, next)=>{
    try {
        const {month} = req.query;
        const returns = await service.getReturnsByMonthService(month);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
/* 27. */
export const getUsersReservationOnController = async(req, res, next)=>{
    try {
        const {doc} = req.query;
        const user = await service.getUsersReservationOnService(doc);
        res.status(200).send(user);
    } catch (error) {
        res.send(error);
    }
}
/* 28. */
export const getStaffByTeamsController = async(req, res, next)=>{
    try {
        const staff = await service.getStaffByTeamsService();
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
/* 29. */
export const getStaffBySalaryController = async(req, res, next)=>{
    try {
        const staff = await service.getStaffBySalaryService();
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
/* 30. */
export const getStaffBySeniorityController = async(req, res, next)=>{
    try {
        const staff = await service.getStaffBySeniorityService();
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
/* 31. */
export const getRecervationPendingController = async(req, res, next)=>{
    try {
        const reservations = await service.getRecervationPendingService();
        res.status(200).send(reservations);
    } catch (error) {
        res.send(error);
    }
}
/* 32. */
export const getLoansNextOneActiveController = async(req,res,next)=>{
    try {
        const {title} = req.query;
        const loan = await service.getLoansNextOneActiveService(title);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error)
    }
}

export const getLoansByUserServiceController = async(req,res,next)=>{
    try {
        const {user} = req.query;
        const loan = await service.getLoansByUserService(user);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error)
    }
}
//

export const getReturnsByUserController = async(req, res, next)=>{
    try {
        const {user} = req.query;
        const returns = await service.getReturnsByUserService(user);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}