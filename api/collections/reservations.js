import { collectionGen } from "../db/connection.js";
import siguienteId from "../helpers/autoIncrement.js";
class Reservations{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("reservations");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllReservations(id_reservation){
        try {
            const connect = await this.connection();
            if(!id_reservation) return await connect.find({}).toArray();
            const reservation = await connect.aggregate([{$match: {"reservationId": parseInt(id_reservation)}}]).toArray()
            return reservation
            
        } catch (error) {
            throw error;
        }
    };
    async postReservation(data){
        try {
            const connect = await this.connection();
            const newId = await siguienteId("reservations");
            let body = { "reservationId": newId,...data, "reservation_date": new Date(), "expected_delivery": new Date(data.expected_delivery)}
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async postReservationEspecial(body){
      try {
          const connect = await this.connection();
          const newId = await siguienteId("reservations");
          let data = { "reservationId": newId, ...body, "reservation_date": new Date()}
          const result = await connect.insertOne(data);
          return result;
      } catch (error) {
          throw error;
      }
  };
    async updateReservation(id_reservation, data){
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "reservationId": parseInt(id_reservation) },
                { $set: { "reservationId": newId,...data, "expected_delivery": new Date(data.expected_delivery)} }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }; 
    async deleteReservation(id_reservation){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "reservationId": parseInt(id_reservation) });
            return result;
        } catch (error) {
            throw error;
        }
    };
    /* 11. Mostrar todas las reservaciones agendadas que hay para un libro con un titulo en específico */
    async getRecervationByTitle(name){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: 
                      {"title_book": {$regex: name, $options: "i"}}
                },
                {
                    $project: {
                      _id: 0,
                      id :"$reservationId",
                      titulo  :"$title_book",
                      usuario  :"$user_name",
                      fecha_reservacion  :"$reservation_date",
                      fecha_entrega  :"$expected_delivery"
                    }
                },
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 12. mostrar todas las reservaciones que llevan más de N meses en espera */
    async getRecervationByMonth(month){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                  $addFields: {
                    differenceInMonths: {
                      $divide: [
                        { $subtract: ["$$NOW", "$reservation_date"] },
                        1000 * 60 * 60 * 24 * 30 
                      ]
                    }
                  }
                },
                {
                  $match: {
                    differenceInMonths: { $gte: parseInt(month) } 
                  }
                },
                {
                  $project: {
                    _id: 0,
                    id :"$reservationId",
                    titulo  :"$title_book",
                    usuario  :"$user_name",
                    fecha_reservacion  :"$reservation_date",
                    fecha_entrega  :"$expected_delivery"
                  }
                },
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 13. mostrar todas las reservaciones realizadas por una persona en específico */
    async getRecervationByName(name){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: 
                      {"user_name": {$regex: name, $options: "i"}}
                },
                {
                  $project: {
                    _id: 0,
                    id :"$reservationId",
                    titulo  :"$title_book",
                    usuario  :"$user_name",
                    fecha_reservacion  :"$reservation_date",
                    fecha_entrega  :"$expected_delivery"
                  }
                },
                {
                  $group: {
                    _id: "$usuario",
                    reservas: { $push: "$$ROOT" }
                  }
                },
                {
                  $project: {
                    _id:0,
                    usuario: "$_id",
                    reservas_activas: "$reservas"
                  }
                }
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 15. Mostrar la persona que tenga más reservaciones activas */
    async getRecervationTop(){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                  $project: {
                    _id: 0,
                    id :"$reservationId",
                    titulo  :"$title_book",
                    usuario  :"$user_name",
                    fecha_reservacion  :"$reservation_date",
                    fecha_entrega  :"$expected_delivery"
                  }
                },
                {
                  $group: {
                    _id: "$usuario",
                    reservas: { $push: "$$ROOT" },
                    num_reservas: {$sum: 1}
                  }
                },
                { $sort : { num_reservas : -1 } },
                { $limit: 1 },
                {
                  $project: {
                    _id:0,
                    usuario: "$_id",
                    num_reservas:"$num_reservas",
                    reservas_activas: "$reservas"
                  }
                }
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 16. Mostrar el titulo de los libros con sus respectivas reservas ordenas de más reservas a menos reservas */
    async getRecervationBookTop(){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                  $project: {
                    _id: 0,
                    id :"$reservationId",
                    titulo  :"$title_book",
                    usuario  :"$user_name",
                    fecha_reservacion  :"$reservation_date",
                    fecha_entrega  :"$expected_delivery"
                  }
                },
                {
                  $group: {
                    _id: "$titulo",
                    reservas: { $push: "$$ROOT" },
                    num_reservas: {$sum: 1}
                  }
                },
                { $sort : { num_reservas : -1 } },
                {
                  $project: {
                    _id:0,
                    libro: "$_id",
                    num_reservas:"$num_reservas",
                    reservas_activas: "$reservas"
                  }
                }
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 31. Listar las reservas que están pendientes en su entrega. */
    async getRecervationPending(){
      try {
          const connect = await this.connection();
          const result = await connect.aggregate([
            {
              $addFields: {
                daysLate: {
                  $divide: [
                    { $subtract: ["$expected_delivery", "$$NOW"] },
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
              $project: {
                _id: 0,
                id: "$reservationId",
                titulo: "$title_book",
                usuario: "$user_name",
                dia_retraso: { $multiply: [{ $toInt: "$daysLate" }, -1] },
                fecha_reservacion: "$reservation_date",
                fecha_entrega_esperada: "$expected_delivery"
              }
            },
            { $sort: { fecha_entrega_esperada: 1 } },
          ]).toArray()
          return result
      } catch (error) {
          throw error;
      }
  };

}

export { Reservations }