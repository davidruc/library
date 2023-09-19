import { collectionGen } from "../db/connection.js";

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
            if(!id_reservation) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"reservationId": parseInt(id_reservation)}}])
        } catch (error) {
            throw error;
        }
    };
    async postReservation(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "reservation_date": new Date(), "expected_delivery": new Date(data.expected_delivery)}
            const result = await connect.insertOne(body);
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
                { $set: data }
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
    }
}

export { Reservations }