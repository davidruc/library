import { Books } from "../collections/books.js";
import { Loans } from "../collections/loans.js";
import { Reservations } from "../collections/reservations.js";
import { Returns } from "../collections/returns.js";
import { Staff } from "../collections/staff.js";
import { Users } from "../collections/users.js";

export const deleteBookService = async(code)=>{
    const book = new Books();
    return await book.deleteBook(code);
}
export const deleteLoanService = async(id_loan)=>{
    const book = new Loans();
    return await book.deleteLoan(id_loan);
}
export const deleteReservationService = async(id_reservation)=>{
    const book = new Reservations();
    return await book.deleteReservation(id_reservation);
}
export const deleteReturnService = async(code)=>{
    const book = new Returns();
    return await book.deleteReturn(code);
}
export const deleteStaffService = async(id_employee)=>{
    const book = new Staff();
    return await book.deleteStaff(id_employee);
}
export const deleteUserService = async(id)=>{
    const book = new Users();
    return await book.deleteUser(id);
}