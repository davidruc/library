import { validationResult } from "express-validator";
import { bookDTO } from "./dtoCollections.js";

export const ValidateSession = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let { correo, contraseña } = req.body;
    let data = {"email": correo, "password": contraseña};
    req.body = data;
    next();
};
export const ValidateSingUp = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let {documento, nombre, direccion , correo, contraseña } = req.body;
    parseInt(documento);
    let data = { "document":documento, "user_name":nombre, "address":direccion ,"email": correo, "password": contraseña};
    req.body = data;
    next();
}

export const ValidateBooks = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{ codigo, titulo, author, estado, editorial, categoria, clasificacion_Dewey, disponibilidad, version, ingreso, descripcion, ubicacion } = req.body;
    let data = { 
        "code" : codigo,
        "title"    : titulo,
        "author"    : author,
        "status"  : estado,
        "editorial"  : editorial,
        "category"    : categoria,
        "dewey_clasification"  : clasificacion_Dewey,
        "aviability"   : disponibilidad,
        "book_version"    : version,
        "date_admission"    : ingreso,
        "descript"    : descripcion,
        "location" : ubicacion
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}

export const ValidateLoans = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{reservationId, codigo_libro, nombre_usuario, inicio_prestamo, finalizacion_prestamo} = req.body;
    let data = { 
        "reservation_code": reservationId,
        "book_code": codigo_libro,
        "user_name": nombre_usuario,
        "start_loan": inicio_prestamo,
        "finish_loan": finalizacion_prestamo,
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}

export const ValidateReservations = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{ titulo, nombre_usuario, inicio_reserva, entrega_esperada } = req.body;
    let data = { 
        "title_book": titulo,
        "user_name": nombre_usuario,
        "reservation_date": inicio_reserva,
        "expected_delivery": entrega_esperada,
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}


export const ValidateReturns = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{ id, codigo_libro, nombre_usuario, entrega_libro, finalizacion_prestamo} = req.body;
    let data = { 
        "loanID":id , 
        "book_code":codigo_libro , 
        "user":nombre_usuario , 
        "return_date":entrega_libro , 
        "finish_loan":finalizacion_prestamo , 
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}


export const ValidateStaff = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{ id_staff, nombre, equipo, correo, correo_corporativo, telefono, telefono_corporativo, salario, inicio_contrato} = req.body;
    let data = { 
        "employeeId":id_staff ,
        "full_name": nombre,
        "team": equipo,
        "email": correo,
        "business_email": correo_corporativo,
        "phone_number": telefono,
        "business_number": telefono_corporativo,
        "salary": salario,
        "start_contract": inicio_contrato,
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}

export const ValidateQuerys = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()});
    let{ titulo, nombre_usuario, reservationId, id} = req.body;
    let data = { 
        "title_book": titulo,
        "user_name": nombre_usuario,
        "reservation_code": reservationId,
        "loanID": id
    }
    for (const key in data) {
        if (data[key] === undefined) delete data[key]
    }
    req.body = data;
    next();
}