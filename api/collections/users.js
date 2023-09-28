import { collectionGen } from "../db/connection.js";

class Users {
    constructor() { };
    async connection() {
        try {
            const result = await collectionGen("users");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllUsers(id) {
        try {
            const connect = await this.connection();
            if (!id) return await connect.find({}).toArray()
            return await connect.aggregate([{ $match: { "document": parseInt(id) } }]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async getUserByEmail(correo){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([{$match: { email: correo }}]).toArray();
            return result;
        } catch (error) {
         throw error;   
        }
    }
    async postUser(data) {
        try {
            const connect = await this.connection();
            let permiss = {
                "/api": ["2.0.0", "GET", "POST"]
            };
            let body = {  ...data, "document": parseInt(data.document), "rol": "usuario", "permisos": permiss }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateUser(id, data) {
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "document": parseInt(id) },
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };
    async deleteUser(id) {
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "document": parseInt(id) });
            return result;
        } catch (error) {
            throw error;
        }
    };
    /* 27. Traer información de los usuarios que tienen una reservación activa (traer por documento) */
    async getUsersReservationOn(doc) {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                  $match: {
                    document: { $eq: parseInt(doc) }
                  }
                },
                {
                  $lookup: {
                    from: "reservations",
                    localField: "user_name",
                    foreignField: "user_name",
                    pipeline: [
                      {
                        $project: {
                          _id: 0,
                          titulo: "$title_book",
                          fecha_reservacion: "$reservation_date",
                          entrega_esperada: "$expected_delivery"
                        }
                      }
                    ],
                    as: "reservations"
                  }
                },
                {
                  $project: {
                    _id: 0,
                    documento: "$document",
                    nombre: "$user_name",
                    direccion_entregas: "$address",
                    correo: "$email",
                    reservas: "$reservations"
                  }
                }
              ]).toArray()
            //! ARREGLAR CONDICIONALES (En el servicio)
            //?  SI existe usaurio y no reservaciones devuelve un json con que no se encontró ninguna reserva
            //? No existe usuario manda un mensaje de que no se encontró ningún usuario con ese documento. 
             return result
        } catch (error) {
            throw error;
        }
    };
    
}

export { Users }