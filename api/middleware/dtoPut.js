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
    .optional()
    .isNumeric().withMessage(`El ${books.code} debe ser un número`),
    check(`${books.title}`)
    .optional()
    .isString().withMessage(`El ${books.title} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.author}`)
    .isString().withMessage(`El ${books.author} debe ser un string`)
    .optional()
    .matches(/^[\s\S]*$/).withMessage("Este campo únicamente admite letras"),
    check(`${books.status}`)
    .optional()
    .isString().withMessage(`El ${books.status} debe ser un string`)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]*$/).withMessage("Este campo no admite espacios"),
    check(`${books.editorial}`)
    .optional()
    .isString().withMessage(`El ${books.editorial} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite caracteres especiales"),
    check(`${books.category}`)
    .optional()
    .isString().withMessage(`El ${books.category} debe ser un string`)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]*$/).withMessage("Este campo no admite espacios"),
    check(`${books.dewey_clasification}`)
    .optional()
    .isNumeric().withMessage(`El ${books.dewey_clasification} debe ser un número`),
    check(`${books.aviability}`)
    .optional()
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
    .optional()
    .isNumeric().withMessage(`El ${loans.book_code} debe ser un número`),
    check(`${loans.user_name}`)
    .optional()
    .isString().withMessage(`El ${loans.user_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${loans.finish_loan}`)
    .optional()
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
    .optional()
    .isString().withMessage(`El ${reservations.title_book} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${reservations.user_name}`)
    .optional()
    .isString().withMessage(`El ${reservations.user_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${reservations.expected_delivery}`)
    .optional()
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
    .optional()
    .isNumeric().withMessage(`El ${returns.loanID} debe ser un número`),
    check(`${returns.book_code}`)
    .optional()
    .isNumeric().withMessage(`El ${returns.book_code} debe ser un número`),
    check(`${returns.user}`)
    .optional()
    .isString().withMessage(`El ${returns.user} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${returns.finish_loan}`)
    .optional()
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
    .optional()
    .isNumeric().withMessage(`El ${staff.employeeId} debe ser un número`),
    check(`${staff.full_name}`)
    .optional()
    .isString().withMessage(`El ${staff.full_name} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${staff.team}`)
    .optional()
    .isString().withMessage(`El ${staff.team} debe ser un string`)
    .matches(/^[\s\S]*$/).withMessage("Este campo no admite espacios"),
    check(`${staff.email}`)
    .optional()
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${staff.business_email}`)
    .optional()
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${staff.phone_number}`)
    .optional()
    .isNumeric().withMessage(`El ${staff.phone_number} debe ser un número`),
    check(`${staff.business_number}`)
    .optional()
    .isNumeric().withMessage(`El ${staff.business_number} debe ser un número`),
    check(`${staff.salary}`)
    .optional()
    .isNumeric().withMessage(`El ${staff.salary} debe ser un número`),
    check(`${staff.start_contract}`)
    .optional()
    .isString().withMessage(`El ${staff.start_contract} debe ser un string`)
    .matches(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/).withMessage("Este campo no admite caracteres especiales")
]

const user = {
    document: "documento",
    user_name: "nombre",
    address: "direccion",
    email: "correo",
    password: "contraseña"
}
parseInt(user.document);
export const userDTO = [
    check(`${user.document}`)
    .optional()
    .isNumeric(),
    check(`${user.user_name}`)
    .optional()
    .isString()
    .matches(/^[\s\S]*$/),
    check(`${user.address}`)
    .optional()
    .isString()
    .matches(/^[\s\S]*$/),
    check(`${user.email}`)
    .optional()
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${user.password}`)
    .optional()
    .isString()
    .matches(/^[\s\S]*$/),
]