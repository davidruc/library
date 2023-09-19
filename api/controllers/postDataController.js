import * as service from "../services/postServices.js";

export const postBookController = async(req, res, next)=>{
    try {
        const data = req.body;
        const book = await service.postBookService(data);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
export const postLoanController = async(req, res, next)=>{
    try {
        const data = req.body;
        console.log(data);
        const loan = await service.postLoanService(data);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
export const postReservationController = async(req, res, next)=>{
    try {
        const data = req.body;
        const reservartion = await service.postReservationService(data);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
export const postReturnController = async(req, res, next)=>{
    try {
        const data = req.body;
        const returns = await service.postReturnService(data);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
export const postStaffController = async(req, res, next)=>{
    try {
        const data = req.body;
        const staff = await service.postStaffService(data);
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
export const postUserController = async(req, res, next)=>{
    try {
        const data = req.body;
        const users = await service.postUserService(data);
        res.status(200).send(users);
    } catch (error) {
        res.send(error);
    }
}