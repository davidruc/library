import { Books } from "../collections/books.js";
import { Loans } from "../collections/loans.js";
import { Reservations } from "../collections/reservations.js";
import { Returns } from "../collections/returns.js";
import { Staff } from "../collections/staff.js";
import { Users } from "../collections/users.js";

export const updateBookService = async(code, data)=>{
    const book = new Books();
    return await book.updateBook(code, data);
}
export const updateLoanService = async(id_loan, data)=>{
    const book = new Loans();
    return await book.updateLoan(id_loan, data);
}
export const updateReservationService = async(id_reservation, data)=>{
    const book = new Reservations();
    return await book.updateReservation(id_reservation, data);
}
export const updateReturnService = async(code, data)=>{
    const book = new Returns();
    return await book.updateReturn(code, data);
}
export const updateStaffService = async(id_employee, data)=>{
    const book = new Staff();
    return await book.updateStaff(id_employee, data);
}
export const updateUserService = async(id, data)=>{
    const book = new Users();
    return await book.updateUser(id, data);
}