import { Books } from "../collections/books.js";
import { Loans } from "../collections/loans.js";
import { Reservations } from "../collections/reservations.js";
import { Returns } from "../collections/returns.js";
import { Staff } from "../collections/staff.js";
import { Users } from "../collections/users.js";

export const getAllBooksService = async (code) => {
    const book = new Books();
    return await book.getAllBooks(code);
}
export const getAllLoansService = async (id_loan) => {
    const loan = new Loans();
    return await loan.getAllLoans(id_loan);
}
export const getAllReservationsService = async (id_reservation) => {
    const reservation = new Reservations();
    return await reservation.getAllReservations(id_reservation);
}
export const getAllReturnsService = async (code) => {
    const returns = new Returns();
    return await returns.getAllReturns(code);
}
export const getAllStaffService = async (id_employee) => {
    const staff = new Staff();
    return await staff.getAllStaff(id_employee);
}
export const getAllUsersService = async (id) => {
    const user = new Users();
    return await user.getAllUsers(id);
}

//todo: SERVICIOS ESPECIFICOS
/* 1.  */
export const getBookByTitleService = async (name) => {
    const book = new Books();
    return await book.getBookByTitle(name);
}
/* 2.  */
export const getBookByAuthorService = async (name) => {
    const book = new Books();
    return await book.getBookByAuthor(name);
}
/* 3.  */
export const getBooksAuthorService = async () => {
    const book = new Books();
    return await book.getBooksAuthor();
}
/* 4.  */
export const getBookByAviabilityService = async (state) => {
    const book = new Books();
    return await book.getBookByAviability(state);
}
/* 4.1  */
export const getBookByAviableTitleService = async (title) => {
    const book = new Books();
    return await book.getBookAviable(title);
}
/* 5.  */
export const getBookByDeweyService = async () => {
    const book = new Books();
    return await book.getBookByDewey();
}
/* 6.  */
export const getBookByLocationService = async (place) => {
    const book = new Books();
    return await book.getBookByLocation(place);
}
/* 7.  */
export const getBookByEditorialService = async (name) => {
    const book = new Books();
    return await book.getBookByEditorial(name);
}
/* 8.  */
//!
/* 9.  */
export const getBookByYearService = async (year) => {
    const book = new Books();
    return await book.getBookByYear(year);
}
/* 10.  */
export const getBookByStatusService = async (status) => {
    const book = new Books();
    return await book.getBookByStatus(status);
}
/* 11.  */
export const getRecervationByTitleService = async (name) => {
    const reservation = new Reservations();
    return await reservation.getRecervationByTitle(name);
}
/* 12.  */
export const getRecervationByMonthService = async (month) => {
    const reservation = new Reservations();
    return await reservation.getRecervationByMonth(month);
}
/* 13.  */
export const getRecervationByNameService = async (name) => {
    const reservation = new Reservations();
    return await reservation.getRecervationByName(name);
}
/* 14.  */
//!!

/* 15.  */
export const getRecervationTopService = async () => {
    const reservation = new Reservations();
    return await reservation.getRecervationTop();
}
/* 16.  */
export const getRecervationBookTopService = async () => {
    const reservation = new Reservations();
    return await reservation.getRecervationBookTop();
}
/* 17. */
export const getBookReservationFreeService = async (name) => {
    const book = new Books();
    return await book.getBookReservationFree(name);
}
/* 18. */
//!!

/* 19. */
export const getLoansManyActiveService = async () => {
    const loan = new Loans();
    return await loan.getLoansManyActive();
}
/* 20. */
export const getLoansLateService = async () => {
    const loan = new Loans();
    return await loan.getLoansLate();
}
/* 21. */
export const getLoansTopBookActiveService = async () => {
    const loan = new Loans();
    return await loan.getLoansTopBookActive();
}
/* 22. */
//!!

/* 23. */
export const getReturnsByTopBookService = async () => {
    const returns = new Returns();
    return await returns.getReturnsByTopBook();
}
/* 24. */
export const getReturnsTop10Service = async () => {
    const returns = new Returns();
    return await returns.getReturnsTop10();
}
/* 25. */
export const getReturnsLateOrderService = async () => {
    const returns = new Returns();
    return await returns.getReturnsLateOrder();
}
/* 26. */
export const getReturnsByMonthService = async (month) => {
    const returns = new Returns();
    return await returns.getReturnsByMonth(month);
}
/* 27. */
export const getUsersReservationOnService = async (doc) => {
    const user = new Users();
    return await user.getUsersReservationOn(doc);
}
/* 28. */
export const getStaffByTeamsService = async () => {
    const staff = new Staff();
    return await staff.getStaffByTeams();
}
/* 29. */
export const getStaffBySalaryService = async () => {
    const staff = new Staff();
    return await staff.getStaffBySalary();
}
/* 30. */
export const getStaffBySeniorityService = async () => {
    const staff = new Staff();
    return await staff.getStaffBySeniority();
}
/* 31.  */
export const getRecervationPendingService = async () => {
    const reservation = new Reservations();
    return await reservation.getRecervationPending();
}
/* 32.  */

export const getLoansNextOneActiveService = async (title) => {
    const loan = new Loans();
    return await loan.getLoansNextOneActive(title);
}
/* 33. */
export const getUserByEmailService = async (correo) => {
    const user = new Users();
    return await user.getUserByEmail(correo);
}
//

export const getLoansByUserService = async (user) => {
    const loan = new Loans();
    return await loan.getLoansByUser(user);
}

//

export const getReturnsByUserService = async (user) => {
    const returns = new Returns();
    return await returns.getReturnsByUser(user);
}