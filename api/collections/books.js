import { collectionGen } from "../db/connection.js";

class Books{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("Books");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllBooks(code){
        try {
            const connect = await this.connection();
            if(!code) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"code": parseInt(code)}}]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postBook(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "date_admission": new Date() }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateBook(code, data){
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "code": parseInt(code) },
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }; 
    async deleteBook(code){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({"code": parseInt(code)});
            return result;
        } catch (error) {
            throw error;
        }
    }
    /* 1. Endpoint que permita filtrar libros por titulo. */
    async getBookByTitle(name){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: 
                        {"title": {$regex: name, $options: "i"}}
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
}

export { Books }