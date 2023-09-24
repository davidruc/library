import { collectionGen } from "../db/connection.js";
import siguienteId from "../helpers/autoIncrement.js";
class Returns {
    constructor() { };
    async connection() {
        try {
            const result = await collectionGen("returns");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllReturns(code) {
        try {
            const connect = await this.connection();
            if (!code) return await connect.find({}).toArray()
            return await connect.aggregate([{ $match: { "return_code": parseInt(code) } }]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postReturn(data) {
        try {
            const connect = await this.connection();
            let body = { ...data, "return_date": new Date() }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateReturn(code, data) {
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "return_code": parseInt(code) },
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };
    async deleteReturn(code) {
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "return_code": parseInt(code) });
            return result;
        } catch (error) {
            throw error;
        }
    };
    /* 23.  Traer el top 3 de los libros más prestados con el número de prestamos */
    async getReturnsByTopBook() {
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
                        titulo: "$book.title"
                    },
                },
                {
                    $group: {
                        _id: "$titulo",
                        returns: { $push: "$$ROOT" },
                        num_returns: { $sum: 1 }
                    }
                },
                { $sort: { num_returns: -1 } },
                {
                    $project: {
                        _id: 0,
                        libro: { $arrayElemAt: ["$_id", 0] },
                        num_prestamos: "$num_returns"
                    }
                },
                {
                    $limit: 3
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 24. Obtener las 10 personas que más prestamos han hecho a la biblioteca */
    async getReturnsTop10() {
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
                        titulo: "$book.title",
                        usuario: "$user"
                    },
                },
                {
                    $group: {
                        _id: "$usuario",
                        returns: { $push: "$$ROOT" },
                        num_returns: { $sum: 1 }
                    }
                },
                { $sort: { num_returns: -1 } },
                {
                    $project: {
                        _id: 0,
                        nombre_usuario: "$_id",
                        num_prestamos: "$num_returns",
                        libros_prestados: {
                            $reduce: {
                                input: "$returns.titulo",
                                initialValue: [],
                                in: { $concatArrays: ["$$value", "$$this"] }
                            }
                        }
                    }
                },
                {
                    $limit: 10
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 25. Listar a todas las personas ordenadas desde la persona con más días de retraso en las entregas a la que menos tiene.  */
    async getReturnsLateOrder() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $addFields: {
                        daysLate: {
                            $divide: [
                                { $subtract: ["$return_date", "$finish_loan"] },
                                1000 * 60 * 60 * 24
                            ]
                        }
                    }
                },
                {
                    $match: {
                        daysLate: { $gte: 1 }
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
                        usuario: "$user",
                        dias_retrasado: { $toInt: "$daysLate" },
                        dia_entregada: "$return_date",
                        dia_esperado: "$finish_loan"
                    }
                },
                {
                    $group: {
                        _id: "$usuario",
                        dias_atraso: {
                            $sum: "$dias_retrasado"
                        },
                        info_prestamos: {
                            $push: "$$ROOT"
                        }
                    }
                },
                { $sort: { dias_atraso: -1 } },
                {
                    $project: {
                        _id: 0,
                        nombre: "$_id",
                        dias_acumulados: "$dias_atraso",
                        prestamos_retrasados: "$info_prestamos"
                    }
                },
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 26. Traer todos los retornos realizados por un mes específico */
    async getReturnsByMonth(month) {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $month: "$return_date" }, parseInt(month)]
                        }
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
                        usuario: "$user",
                        fecha_entrega: "$return_date",
                        dia_esperado: "$finish_loan"
                    }
                },
                {
                    $sort: {
                        fecha_entrega: 1
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };

}

export { Returns }