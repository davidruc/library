import * as service from "../services/postServices.js";
import * as getServices from "../services/getServices.js";
import * as deleteServices from "../services/deleteServices.js";
import * as updateServices from "../services/putServices.js"
export const postBookController = async (req, res, next) => {
    try {
        const data = req.body;
        const book = await service.postBookService(data);
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
export const postLoanController = async (req, res, next) => {
    try {
        const data = req.body;
        const loan = await service.postLoanService(data);
        res.status(200).send(loan);
    } catch (error) {
        res.send(error);
    }
}
export const postReservationController = async (req, res, next) => {
    try {
        const data = req.body;
        const reservartion = await service.postReservationService(data);
        res.status(200).send(reservartion);
    } catch (error) {
        res.send(error);
    }
}
export const postReturnController = async (req, res, next) => {
    try {
        const data = req.body;
        const returns = await service.postReturnService(data);
        res.status(200).send(returns);
    } catch (error) {
        res.send(error);
    }
}
export const postStaffController = async (req, res, next) => {
    try {
        const data = req.body;
        const staff = await service.postStaffService(data);
        res.status(200).send(staff);
    } catch (error) {
        res.send(error);
    }
}
export const postUserController = async (req, res, next) => {
    try {
        const data = req.body;
        const users = await service.postUserService(data);
        res.status(200).send(users);
    } catch (error) {
        res.send(error);
    }
}

/* 14. EndPoint que al hacer un post de una reservación, verifica si existe algún libro con ese titulo disponible. En caso de que haya alguno disponible realice el prestamo inmediatamente (y cambie la disponibilidad del libro).  Si no existe ningún libro disponible, busca el prestamo cuya entrega esté más proxima y le asigna esa fecha de entrega */

export const postRealReservationController = async (req, res, next) => {    
    try {
        const { title_book, user_name } = req.body;
        // Hago una búsqueda de disponibilidad
        const bookExistence = await getServices.getBookByTitleService(title_book);
        if(bookExistence.length === 0) return res.status(404).send({message: 'No se encontró ninguna coincidencia de algún libro que pudiera llamarse similar a lo que ingresaste.'})
        const titleBook = bookExistence[0].titulo;
        const aviability = await getServices.getBookByAviableTitleService(titleBook);
        // Si no hay ningun libro disponible entra aquí
        if (!aviability[0]) {
            // Revisa cuando es la fecha de entrega más proxima para la entrega de un prestamo
            const aproxDelivery = await getServices.getLoansNextOneActiveService(titleBook);
            let fecha_entrega_nueva = '';
            if (!aproxDelivery[0]) {
                const fechaActual = new Date();
                fecha_entrega_nueva = fechaActual.setDate(fechaActual.getDate() + 3)
            } else {
                fecha_entrega_nueva = aproxDelivery[0].fecha_entrega;

            } 

            // Creo el cuerpo para realizar una reservación automática del libro
            const body = {
                "title_book": titleBook, "user_name": user_name, "expected_delivery": fecha_entrega_nueva
            };
            // Envia los datos para la reservación al servicio
            const reservation = await service.postReservationEspecialService(body);
            // Envía un mensaje comentando de que se realizó la respectiva reservación del libro.
            return res.status(201).send({ reservation: reservation, message: `Se realizó con éxito la reservación del libro ${titleBook} para el día ${fecha_entrega_nueva}` })
        }
        // Si el libro está disponible
        else {
            const fechaActual = new Date();
            // Suma 2 semanas (14 días) a la fecha actual (tiempo del prestamo)
            const finish_loan = fechaActual.setDate(fechaActual.getDate() + 14);
            //Defino el cuerpo para el preestamo
            const data = {
                "book_code": aviability[0].codigo, "user_name": user_name, "finish_loan": finish_loan
            };
            // CAMBIO EL ESTADO DEL LIBRO a OCUPADO
            const newEstate = { "aviability": false }
            const updateBook = await updateServices.updateBookService(aviability[0].codigo, newEstate)

            //Envío el cuerpo y realizo el prestamo
            const loan = await service.postLoanService(data);
            return res.status(201).send({ loan: loan, changeState: updateBook, message: `El libro ${aviability[0].titulo} se encuentra disponible, por lo que se realizó de manera automáticamente el prestamo` })
        }
    } catch (error) {
        res.status(error.status).send(error)
    }
}

/* 18. Este endPoint valida el cuerpo de la solicitud. Si es una solicitud que contiene una reservacion o no. Valida la disponibilidad del libro y dependiendo de si se encuentra o no disponible realiza el prestamos, realiza una reserva o envía un mensaje en caso de ya tener una. (En sus subprocesos valida si el codigo de reservación es válido) También se encarga de eliminar las reservas cuando se realiza un prestamo y de modificar los estados del libro a ocupado. */

export const postLoanRealShitController = async (req, res, next) => {
    try {
        //todo: El cuerpo que se envía en la petición depende de si se envía el codigo de reserva o no: 
        //? Si hay una reservación asignada: 
        /* 
        {
            "reservation_code": 2015
        } 
        */
        //? Si no hay una reservación asignada 
        /*
        {
            "title_book": "The Origins of Species",
            "user_name": "Luisa Pérez"
        } */
        //Todo: si por algún motivo se envía el título y el user name cuando mando el codigo de reservación simplemente no los va a tomar en cuenta.
        const data = req.body;
        // Si no envío código de reservación hago lo siguiente:
        if (!data.reservation_code) {
            // Primero desestructuro los datos de entrada
            const { title_book, user_name } = data;
            const bookExistence = await getServices.getBookByTitleService(title_book);
            if(bookExistence.length === 0) return res.status(404).send({message: 'No se encontró ninguna coincidencia de algún libro que pudiera llamarse similar a lo que ingresaste.'})
            const titleBook = bookExistence[0].titulo;
            // Hago una búsqueda de disponibilidad
            const aviability = await getServices.getBookByAviableTitleService(titleBook);
            // Si no hay ningun libro disponible entra aquí
            if (!aviability[0]) {
                // Revisa cuando es la fecha de entrega más proxima para la entrega de un prestamo
                const aproxDelivery = await getServices.getLoansNextOneActiveService(titleBook);
                const { fecha_entrega } = aproxDelivery[0];
                // Creo el cuerpo para realizar una reservación automática del libro
                const body = {
                    "title_book": titleBook, "user_name": user_name, "expected_delivery": fecha_entrega
                }
                // Envia los datos para la reservación al servicio
                const reservation = await service.postReservationEspecialService(body);
                // Envía el mensaje predeterminado de que se realizó el post y además un mensaje mencionando que no habían libros disponibles por lo que se realizó una reservación de mismo para la fecha recibida
                return res.status(201).send({ reservation: reservation, message: `Por el momento no hay libros disponibles para realizar el prestamo, por lo que vamos a realizar una reservación del libro para el ${fecha_entrega}` })
            }
            // Si el libro está disponible
            else {
                const fechaActual = new Date();
                // Suma 2 semanas (14 días) a la fecha actual (tiempo del prestamo)
                const finish_loan = fechaActual.setDate(fechaActual.getDate() + 14);
                //Defino el cuerpo para el preestamo
                const data = {
                    "book_code": aviability[0].codigo, "user_name": user_name, "finish_loan": finish_loan
                }
                // CAMBIO EL ESTADO DEL LIBRO a OCUPADO
                const newEstate = { "aviability": false }
                const updateBook = await updateServices.updateBookService(aviability[0].codigo, newEstate)
                //Envío el cuerpo y realizo el prestamo
                const loan = await service.postLoanService(data);
                return res.status(201).send({ loan: loan, changeState: updateBook, message: `no tenias una reserva asignada pero el libro ${aviability[0].titulo} se encontraba disponible` })
            }
        }
        // Si envío el código de una reserva:
        else {
            // Se busca si existe la reservación con el id que se mandó
            let id_reservation = data.reservation_code;
            const reservacion = await getServices.getAllReservationsService(id_reservation);
            // Si no hay una reservación asignada para el codigo ingresado envía un mensaje
            if (!reservacion[0]) {
                return res.status(200).send({ message: `No existe ningúna reservación asignada al código que enviaste.` })
            }
            // Si existe una reservación asignada para este código
            else {
                const fechaActual = new Date();
                // Suma 2 semanas (14 días) a la fecha actual (tiempo del prestamo)
                const finish_loan = fechaActual.setDate(fechaActual.getDate() + 14);
                let title = reservacion[0].title_book;
                const aviabilityReservation = await getServices.getBookByAviableTitleService(title);
                // Si el libro aún no está disponible simplemente manda un mensaje diciendo que no está disponible aún
                if (!aviabilityReservation[0]) {
                    return res.status(201).send({ message: `estas solicitando el libro  ${reservacion[0].title_book} el cual no se encuentra disponible aún.` })
                }
                // Si está disponible elimina la reserva y genera el prestamo.
                else {
                    //Defino el cuerpo para el preestamo
                    const data = {
                        "book_code": aviabilityReservation[0].codigo, "user_name": reservacion[0].user_name, "finish_loan": finish_loan
                    }
                    // CAMBIO EL ESTADO DEL LIBRO a OCUPADO
                    const newEstate = { "aviability": false }
                    const updateBook = await updateServices.updateBookService(aviabilityReservation[0].codigo, newEstate);
                    // ELIMINO LA RESERVA
                    const deleteReservation = await deleteServices.deleteReservationService(id_reservation)
                    //Envío el cuerpo y realizo el prestamo
                    const loan = await service.postLoanService(data);
                    return res.status(201).send({ postloan: loan, changeState: updateBook, deleteReservation: deleteReservation, message: `Se agregó con exito el prestamo, se eliminó la reservación asignada y se modificó el estado del libro ${reservacion[0].title_book}` });
                }
            }
        }
    } catch (error) {
        res.send(error);
    }
}

/* 22. Al realizar el post de un return es obligatorio que exista un prestamo activo relacionado, por lo que antes se verifica que esta condición se cumpla. Si no existe ningún prestamo activo manda un mensaje de alerta mencionando que no es posible realizar un retorno de un libro que no tenía ningún prestamo activo. Si existe el prestamo activo inserta el dato y elimina el registro de la colección de prestamos. Inmediatamente modifica el estado del libro que se encontraba en prestamo */

export const postReturnRealController = async (req, res, next) => {
    try {
        const { loanID } = req.body;
        const loan = await getServices.getAllLoansService(loanID);
        if (!loan[0]) {
            res.send({ message: `No hay ningún prestamo activo para el código ${loanID}` })
        }
        else {
            const code = loan[0].book_code
            const data = { "loanID": loanID, "book_code": code, "user": loan[0].user_name, "finish_loan": loan[0].finish_loan }
            const returns = await service.postReturnService(data);
            const deleteLoan = await deleteServices.deleteLoanService(loanID);
            const newEstate = { "aviability": true }
            const updateBook = await updateServices.updateBookService(code, newEstate)
            res.send({ return: returns, deleteLoan: deleteLoan, bookState: updateBook ,message: `Se realizó con éxito la entrega y la eliminación del prestamo No:${loanID} (La disponibilidad del libro ${code} es disponible ahora).` });

        }
    } catch (error) {
        res.status(error.status).send(error)
    }
}