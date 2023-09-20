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
export const getBookByStatusController = async(req, res, next)=>{
    try {
        const {status} = req.query;
        const book = await service.getBookByStatusService(status);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}