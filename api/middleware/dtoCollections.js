import { check } from "express-validator";

const books = {
    code :"codigo",
    title    :"titulo",
    author    :"author",
    status  :"estado",
    editorial  :"editorial",
    category    :"categoria",
    dewey_clasification  :"clasificacion_Dewey",
    aviability   :"disponibilidad",
    book_version    :"version",
    date_admission    :"ingreso",
    descript    :"descripcion",
    location :"ubicacion"
}

export const bookDTO = [
    check(`${books.code}`)
    .notEmpty().withMessage(`El valor de ${books.code} no puede ser nulo`)
    .isNumeric().withMessage(`El ${books.code} debe ser un número`),
    check(`${books.title}`)
    .notEmpty().withMessage(`El valor de ${books.title} no puede ser nulo`)
    .isString().withMessage(`El ${books.title} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.author}`)
    .isString().withMessage(`El ${books.author} debe ser un string`)
    .optional()
    .matches(/^[\s\S]*$/).withMessage("Este campo únicamente admite letras"),
    check(`${books.status}`)
    .notEmpty().withMessage(`El valor de ${books.status} no puede ser nulo`)
    .isString().withMessage(`El ${books.status} debe ser un string`)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]*$/).withMessage("Este campo no admite espacios"),
    check(`${books.editorial}`)
    .notEmpty().withMessage(`El valor de ${books.editorial} no puede ser nulo`)
    .isString().withMessage(`El ${books.editorial} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.category}`)
    .notEmpty().withMessage(`El valor de ${books.category} no puede ser nulo`)
    .isString().withMessage(`El ${books.category} debe ser un string`)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]*$/).withMessage("Este campo no admite espacios"),
    check(`${books.dewey_clasification}`)
    .notEmpty().withMessage(`El valor de ${books.dewey_clasification} no puede ser nulo`)
    .isNumeric().withMessage(`El ${books.dewey_clasification} debe ser un número`),
    check(`${books.aviability}`)
    .notEmpty().withMessage(`El valor de ${books.aviability} no puede ser nulo`)
    .isBoolean().withMessage(`El ${books.aviability} debe ser un booleano`),
    check(`${books.book_version}`)
    .optional()
    .isString().withMessage(`El ${books.book_version} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.date_admission}`)
    .optional()
    .isString().withMessage(`El ${books.date_admission} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.descript}`)
    .optional()
    .isString().withMessage(`El ${books.descript} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.location}`)
    .optional()
    .isString().withMessage(`El ${books.location} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
]


const loans = {
    reservation_code: "reservationId",
    book_code: "codigo_libro",
    user_name: "nombre_usuario",
    finish_loan: "finalizacion_prestamo",
}

export const loanDTO = [
    check(`${loans.reservation_code}`)
    .optional()
    .isNumeric().withMessage(`El ${loans.reservation_code} debe ser un número`),
    check(`${loans.book_code}`)
    .notEmpty().withMessage(`El valor de ${loans.book_code} no puede ser nulo`)
    .isNumeric().withMessage(`El ${loans.book_code} debe ser un número`),
    check(`${loans.user_name}`)
    .notEmpty().withMessage(`El valor de ${loans.user_name} no puede ser nulo`)
    .isString().withMessage(`El ${loans.user_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${loans.finish_loan}`)
    .notEmpty().withMessage(`El valor de ${loans.finish_loan} no puede ser nulo`)
    .isString().withMessage(`El ${loans.finish_loan} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales")
]

const reservations = {
    title_book: "titulo",
    user_name: "nombre_usuario",
    expected_delivery: "entrega_esperada",
}

export const reservationDTO = [
    check(`${reservations.title_book}`)
    .notEmpty().withMessage(`El valor de ${reservations.title_book} no puede ser nulo`)
    .isString().withMessage(`El ${reservations.title_book} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${reservations.user_name}`)
    .notEmpty().withMessage(`El valor de ${reservations.user_name} no puede ser nulo`)
    .isString().withMessage(`El ${reservations.user_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${reservations.expected_delivery}`)
    .notEmpty().withMessage(`El valor de ${reservations.expected_delivery} no puede ser nulo`)
    .isString().withMessage(`El ${reservations.expected_delivery} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales")
]

const returns = {
    loanID : "id",
    book_code: "codigo_libro",
    user: "nombre_usuario",
    finish_loan: "finalizacion_prestamo",
}

export const returnDTO = [
    check(`${returns.loanID}`)
    .notEmpty().withMessage(`El valor de ${returns.loanID} no puede ser nulo`)
    .isNumeric().withMessage(`El ${returns.loanID} debe ser un número`),
    check(`${returns.book_code}`)
    .notEmpty().withMessage(`El valor de ${returns.book_code} no puede ser nulo`)
    .isNumeric().withMessage(`El ${returns.book_code} debe ser un número`),
    check(`${returns.user}`)
    .notEmpty().withMessage(`El valor de ${returns.user} no puede ser nulo`)
    .isString().withMessage(`El ${returns.user} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${returns.finish_loan}`)
    .notEmpty().withMessage(`El valor de ${returns.finish_loan} no puede ser nulo`)
    .isString().withMessage(`El ${returns.finish_loan} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales")
]


const staff = {
    employeeId: "id_staff",
    full_name: "nombre",
    team: "equipo",
    email: "correo",
    business_email: "correo_corporativo",
    phone_number: "telefono",
    business_number: "telefono_corporativo",
    salary: "salario",
    start_contract: "inicio_contrato",
}

export const staffDTO = [
    check(`${staff.employeeId}`)
    .notEmpty().withMessage(`El valor de ${staff.employeeId} no puede ser nulo`)
    .isNumeric().withMessage(`El ${staff.employeeId} debe ser un número`),
    check(`${staff.full_name}`)
    .notEmpty().withMessage(`El valor de ${staff.full_name} no puede ser nulo`)
    .isString().withMessage(`El ${staff.full_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${staff.team}`)
    .notEmpty().withMessage(`El valor de ${staff.team} no puede ser nulo`)
    .isString().withMessage(`El ${staff.team} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${staff.email}`)
    .notEmpty().withMessage("El valor del correo debe ser enviado")
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${staff.business_email}`)
    .optional()
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${staff.phone_number}`)
    .notEmpty().withMessage(`El valor de ${staff.phone_number} no puede ser nulo`)
    .isNumeric().withMessage(`El ${staff.phone_number} debe ser un número`),
    check(`${staff.business_number}`)
    .optional()
    .isNumeric().withMessage(`El ${staff.business_number} debe ser un número`),
    check(`${staff.salary}`)
    .notEmpty().withMessage(`El valor de ${staff.salary} no puede ser nulo`)
    .isNumeric().withMessage(`El ${staff.salary} debe ser un número`),
    check(`${staff.start_contract}`)
    .notEmpty().withMessage(`El valor de ${staff.start_contract} no puede ser nulo`)
    .isString().withMessage(`El ${staff.start_contract} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales")
]

const querys = {
    title_book: "titulo",
    user_name: "nombre_usuario",
    reservation_code: "reservationId",
    loanID : "id"
}

export const queryDTO = [
    check(`${querys.title_book}`)
    .optional()
    .isString().withMessage(`El ${querys.title_book} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${querys.user_name}`)
    .optional()
    .isString().withMessage(`El ${querys.user_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"), 
    check(`${returns.loanID}`)
    .optional()
    .isNumeric().withMessage(`El ${returns.loanID} debe ser un número`),
    check(`${loans.reservation_code}`)
    .optional()
    .isNumeric().withMessage(`El ${loans.reservation_code} debe ser un número`),

]