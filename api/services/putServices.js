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
    const loan = new Loans();
    return await loan.updateLoan(id_loan, data);
}
export const updateReservationService = async(id_reservation, data)=>{
    const reservation = new Reservations();
    return await reservation.updateReservation(id_reservation, data);
}
export const updateReturnService = async(code, data)=>{
    const returns = new Returns();
    return await returns.updateReturn(code, data);
}
export const updateStaffService = async(id_employee, data)=>{
    const staff = new Staff();
    return await staff.updateStaff(id_employee, data);
}
export const updateUserService = async(id, data)=>{
    const user = new Users();
    return await user.updateUser(id, data);
}