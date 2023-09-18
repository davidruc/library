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
    async getAllBooks(){
        try {
            const connect = await this.connection();
            const result = await connect.find({}).toArray()
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Books }