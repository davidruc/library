import { collectionGen } from "../db/connection.js";

class Users{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("users");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllUsers(id){
        try {
            const connect = await this.connection();
            if(!id) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"document": parseInt(id)}}])
        } catch (error) {
            throw error;
        }
    };
    async postUser(data){
        try {
            const connect = await this.connection();
            let permiss = {
                "/api": ["2.0.0", "GET", "POST"]
            };
            let body = {...data, "rol": "usuario" ,"permisos": permiss }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateUser(id, data){
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                {"document": parseInt(id)},
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }; 
    async deleteUser(id){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({"document": parseInt(id)});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Users }