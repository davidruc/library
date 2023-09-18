import { check } from 'express-validator';

const register = {
    document: "ID",
    user_name: "full_name",
    address: "full_adress",
    email: "correo",
    password: "contraseña"
}
export const registerDTO = [
    check(`${register.document}`)
    .notEmpty().isNumeric(),
    check(`${register.user_name}`)
    .notEmpty().isString(),
    check(`${register.address}`)
    .notEmpty().isString(),
    check(`${register.email}`)
    .notEmpty().isString(),
    check(`${register.password}`)
    .notEmpty().isString(),
]

const login = {
    email: "correo",
    password: "contraseña"
}
export const loginDTO = [
    check(`${register.email}`)
    .notEmpty().isString(),
    check(`${register.password}`)
    .notEmpty().isString(),
]