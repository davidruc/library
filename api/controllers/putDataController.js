import * as service from "../services/putServices.js";

export const updateBookController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const data = req.body;
        const book = await service.updateBookService(code, data);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
export const updateLoanController = async(req, res, next)=>{
    try {
        const {id_loan} = req.query;
        const data = req.body;
        const loan = await service.updateLoanService(id_loan, data);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
export const updateReservationController = async(req, res, next)=>{
    try {
        const {id_reservation} = req.query;
        const data = req.body;
        const reservartion = await service.updateReservationService(id_reservation, data);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
export const updateReturnController = async(req, res, next)=>{
    try {
        const {code} = req.query;
        const data = req.body;
        const returns = await service.updateReturnService(code, data);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
export const updateStaffController = async(req, res, next)=>{
    try {
        const {id_employee} = req.query;
        const data = req.body;
        const staff = await service.updateStaffService(id_employee, data);
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
export const updateUserController = async(req, res, next)=>{
    try {
        const {id} = req.query;
        const data = req.body;
        const users = await service.updateUserService(id, data);
        res.status(200).send(users);
    } catch (error) {
        res.send(error);
    }
}