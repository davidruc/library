import { collectionGen } from "../db/connection.js";

class Returns{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("returns");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllReturns(code){
        try {
            const connect = await this.connection();
            if(!code) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"return_code": parseInt(code)}}]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postReturn(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "return_date": new Date() }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateReturn(code, data){
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
    async deleteReturn(code){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({"return_code": parseInt(code)});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Returns }