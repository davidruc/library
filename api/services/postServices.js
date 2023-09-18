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
    const book = new Loans();
    return await book.postLoan(data);
}
export const postReservationService = async(data)=>{
    const book = new Reservations();
    return await book.postReservation(data);
}
export const postReturnService = async(data)=>{
    const book = new Returns();
    return await book.postReturn(data);
}
export const postStaffService = async(data)=>{
    const book = new Staff();
    return await book.postStaff(data);
}
export const postUserService = async(data)=>{
    const book = new Users();
    return await book.postUser(data);
}