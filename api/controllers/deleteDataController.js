import * as service from "../services/deleteServices.js";

export const deleteBookController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const book = await service.deleteBookService(code);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
export const deleteLoanController = async(req, res, next)=>{
    try {
        const {id_loan} = req.query;
        const loan = await service.deleteLoanService(id_loan);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
export const deleteReservationController = async(req, res, next)=>{
    try {
        const {id_reservation} = req.query;
        const reservartion = await service.deleteReservationService(id_reservation);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
export const deleteReturnController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const returns = await service.deleteReturnService(code);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
export const deleteStaffController = async(req, res, next)=>{
    try {
        const {id_employee} = req.query;
        const staff = await service.deleteStaffService(id_employee);
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
export const deleteUserController = async(req, res, next)=>{
    try {
        const {id} = req.query;
        const users = await service.deleteUserService(id);
        res.status(200).send(users);
    } catch (error) {
        res.send(error);
    }
}