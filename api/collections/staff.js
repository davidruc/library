import { collectionGen } from "../db/connection.js";

class Staff{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("staff");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllStaff(id_employee){
        try {
            const connect = await this.connection();
            if(!id_employee) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"employeeId": parseInt(id_employee)}}])
        } catch (error) {
            throw error;
        }
    };
    async postStaff(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "start_contract": new Date(data.start_contract) }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateStaff(id_employee, data){
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "employeeId": parseInt(id_employee) },
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }; 
    async deleteStaff(id_employee){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({"employeeId": parseInt(id_employee)});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Staff }