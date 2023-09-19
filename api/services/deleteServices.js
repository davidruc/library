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
    const loan = new Loans();
    return await loan.deleteLoan(id_loan);
}
export const deleteReservationService = async(id_reservation)=>{
    const reservation = new Reservations();
    return await reservation.deleteReservation(id_reservation);
}
export const deleteReturnService = async(code)=>{
    const returns = new Returns();
    return await returns.deleteReturn(code);
}
export const deleteStaffService = async(id_employee)=>{
    const staff = new Staff();
    return await staff.deleteStaff(id_employee);
}
export const deleteUserService = async(id)=>{
    const user = new Users();
    return await user.deleteUser(id);
}