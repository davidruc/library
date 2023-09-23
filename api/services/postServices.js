import { Books } from "../collections/books.js";
import { Loans } from "../collections/loans.js";
import { Reservations } from "../collections/reservations.js";
import { Returns } from "../collections/returns.js";
import { Staff } from "../collections/staff.js";
import { Users } from "../collections/users.js";

export const postBookService = async(data)=>{
    const book = new Books();
    return await book.postBook(data);
}
export const postLoanService = async(data)=>{
    const loan = new Loans();
    return await loan.postLoan(data);
}
export const postReservationService = async(data)=>{
    const reservation = new Reservations();
    return await reservation.postReservation(data);
}
/* especial case of reservation */
export const postReservationInLoansService = async(body)=>{
    const reservation = new Reservations();
    return await reservation.postReservationEspecial(body);
}
export const postReturnService = async(data)=>{
    const returns = new Returns();
    return await returns.postReturn(data);
}
export const postStaffService = async(data)=>{
    const staff = new Staff();
    return await staff.postStaff(data);
}
export const postUserService = async(data)=>{
    const user = new Users();
    return await user.postUser(data);
}