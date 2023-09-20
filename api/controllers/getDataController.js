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