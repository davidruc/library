import { collectionGen } from "../db/connection.js";
import siguienteId from "../helpers/autoIncrement.js";

class Loans {
    constructor() { };
    async connection() {
        try {
            const result = await collectionGen("loans");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllLoans(id_loan) {
        try {
            const connect = await this.connection();
            if (!id_loan) return await connect.find({}).toArray()
            return await connect.aggregate([{ $match: { "loanId": parseInt(id_loan) } }]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postLoan(data) {
        try {
            const connect = await this.connection();
            const newId = await siguienteId("loans");
            let body = { "loanId": newId , ...data, "start_loan": new Date(), "finish_loan": new Date(data.finish_loan) };
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateLoan(id_loan, data) {
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "loanId": parseInt(id_loan) },
                { $set:  { "loanId": newId , ...data, "finish_loan": new Date(data.finish_loan) } }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };
    async deleteLoan(id_loan) {
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "loanId": parseInt(id_loan) });
            return result;
        } catch (error) {
            throw error;
        }
    };
    /* 19.  Endpoint que permita listar a todas las personas que tengan más de dos prestamos a la vez  */
    async getLoansManyActive() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $lookup: {
                        from: "Books",
                        localField: "book_code",
                        foreignField: "code",
                        as: "book"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: "$loanId",
                        titulo: { $arrayElemAt: ["$book.title", 0] },
                        usuario: "$user_name",
                        fecha_reservacion: "$start_loan",
                        fecha_entrega: "$finish_loan"
                    }
                },
                {
                    $group: {
                        _id: "$usuario",
                        prestamos: { $push: "$$ROOT" },
                        num_prestamos: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        num_prestamos: { $gte: 2 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        usuario: "$_id",
                        num_prestamos: "$num_prestamos",
                        prestamos_activos: "$prestamos"
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 20. Listar los prestamos que están atrasados en su entrega. */
    async getLoansLate() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $addFields: {
                        daysLate: {
                            $divide: [
                                { $subtract: ["$finish_loan", "$$NOW"] },
                                1000 * 60 * 60 * 24
                            ]
                        }
                    }
                },
                {
                    $match: {
                        daysLate: { $lte: 0 }
                    }
                },
                {
                    $lookup: {
                        from: "Books",
                        localField: "book_code",
                        foreignField: "code",
                        as: "book"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        titulo: { $arrayElemAt: ["$book.title", 0] },
                        usuario: "$user_name",
                        dia_retraso: { $multiply: [{ $toInt: "$daysLate" }, -1] },
                        inicio_prestamo: "$start_loan",
                        fin_prestamo: "$finish_loan"
                    }
                },
                { $sort: { fin_prestamo: 1 } },
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 21. mostrar cual es el libro con más prestamos activos. */
    async getLoansTopBookActive() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $lookup: {
                        from: "Books",
                        localField: "book_code",
                        foreignField: "code",
                        as: "book"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: "$loanId",
                        titulo: { $arrayElemAt: ["$book.title", 0] },
                        usuario: "$user_name",
                        fecha_reservacion: "$start_loan",
                        fecha_entrega: "$finish_loan"
                    }
                },
                {
                    $group: {
                        _id: "$titulo",
                        prestamos: { $push: "$$ROOT" },
                        num_prestamos: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        titulo: "$_id",
                        num_prestamos: "$num_prestamos",
                        prestamos_activos: "$prestamos"
                    }
                },
                {
                    $sort: {
                        num_prestamos: -1
                    }
                },
                {
                    $limit: 1
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 32. Traer el prestamo más proximo a entregar de un libro en específico */
     async getLoansNextOneActive(title) {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                  $lookup: {
                    from: "Books",
                    localField: "book_code",
                    foreignField: "code",
                    as: "book"
                  }
                },
                {
                  $project: {
                    _id: 0,
                    id: "$loanId",
                    titulo: { $arrayElemAt: ["$book.title", 0] },
                    usuario: "$user_name",
                    fecha_reservacion: "$start_loan",
                    fecha_entrega: "$finish_loan"
                  }
                },
                {
                  $match: {
                    titulo: { $regex: title, $options: "i" } 
                  }
                },
                {
                  $sort: {
                    fecha_entrega: 1
                  }
                },
                {
                  $limit: 1
                }
              
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
}

export { Loans }