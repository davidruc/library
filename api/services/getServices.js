import { Books } from "../collections/books.js";
import { Loans } from "../collections/loans.js";
import { Reservations } from "../collections/reservations.js";
import { Returns } from "../collections/returns.js";
import { Staff } from "../collections/staff.js";
import { Users } from "../collections/users.js";

export const getAllBooksService = async(code)=>{
    const book = new Books();
    return await book.getAllBooks(code);
}
export const getAllLoansService = async(id_loan)=>{
    const loan = new Loans();
    return await loan.getAllLoans(id_loan);
}
export const getAllReservationsService = async(id_reservation)=>{
    const reservation = new Reservations();
    return await reservation.getAllReservations(id_reservation);
}
export const getAllReturnsService = async(code)=>{
    const returns = new Returns();
    return await returns.getAllReturns(code);
}
export const getAllStaffService = async(id_employee)=>{
    const staff = new Staff();
    return await staff.getAllStaff(id_employee);
}
export const getAllUsersService = async(id)=>{
    const user = new Users();
    return await user.getAllUsers(id);
}

//todo: SERVICIOS ESPECIFICOS
/* 1.  */
export const getBookByTitleService = async(name)=>{
    const book = new Books();
    return await book.getBookByTitle(name);
}
/* 2.  */
export const getBookByAuthorService = async(name)=>{
    const book = new Books();
    return await book.getBookByAuthor(name);
}
/* 3.  */
export const getBooksAuthorService = async()=>{
    const book = new Books();
    return await book.getBooksAuthor();
}
/* 4.  */
export const getBookByAviabilityService = async(state)=>{
    const book = new Books();
    return await book.getBookByAviability(state);
}
/* 5.  */
export const getBookByDeweyService = async()=>{
    const book = new Books();
    return await book.getBookByDewey();
}
/* 6.  */
export const getBookByLocationService = async(place)=>{
    const book = new Books();
    return await book.getBookByLocation(place);
}
/* 7.  */
export const getBookByEditorialService = async(name)=>{
    const book = new Books();
    return await book.getBookByEditorial(name);
}
/* 8.  */
//!
/* 9.  */
export const getBookByYearService = async(year)=>{
    const book = new Books();
    return await book.getBookByYear(year);
}
/* 10.  */
export const getBookByStatusService = async(status)=>{
    const book = new Books();
    return await book.getBookByStatus(status);
}
