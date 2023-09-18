import { collectionGen } from "../db/connection.js";

class Loans{
    constructor(){};
    async connection(){
        try {
            const result = await collectionGen("loans");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllLoans(){
        try {
            const connect = await this.connection();
            const result = await connect.find({}).toArray()
            return result;
        } catch (error) {
            throw error;
        }
    };
    async postLoan(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "start_loan": new Date(), "finish_loan": new Date(data.finish_loan) }
            console.log(body);
            const result = await connect.postOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateLoan(id_loan, data){
        try {
            const connect = await this.connection();
            const result = await connect.updateOne(
                { "loanId": parseInt(id_loan) },
                { $set: data }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }; 
    async deleteLoan(id_loan){
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "loanId": parseInt(id_loan) });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export { Loans }