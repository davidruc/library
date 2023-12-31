import { check } from 'express-validator';

const register = {
    document: "documento",
    user_name: "nombre",
    address: "direccion",
    email: "correo",
    password: "contraseña"
}
parseInt(register.document);
export const registerDTO = [
    check(`${register.document}`)
    .notEmpty().withMessage("El valor del documento debe ser enviado")
    .isNumeric(),
    check(`${register.user_name}`)
    .notEmpty().withMessage("El valor del nombre debe ser enviado")
    .isString()
    .matches(/^[\s\S]*$/),
    check(`${register.address}`)
    .notEmpty().withMessage("El valor de la direccion debe ser enviado")
    .isString()
    .matches(/^[\s\S]*$/),
    check(`${register.email}`)
    .notEmpty().withMessage("El valor del correo debe ser enviado")
    .isString()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    check(`${register.password}`)
    .notEmpty().withMessage("El valor de la contraseña debe ser enviado")
    .isString()
    .matches(/^[\s\S]*$/),
]

const login = {
    email: "correo",
    password: "contraseña"
}
export const loginDTO = [
    check(`${login.email}`)
    .notEmpty().withMessage("El valor del correo debe ser enviado")
    .isString().withMessage("El valor del correo es de tipo string"),
    check(`${login.password}`)
    .notEmpty().withMessage("El valor de la clave debe ser enviado")
    .isString().withMessage("La clave es un string"),
]