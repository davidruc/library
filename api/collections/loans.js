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
    async getAllLoans(id_loan){
        try {
            const connect = await this.connection();
            if(!id_loan) return await connect.find({}).toArray()
            return await connect.aggragate([{$match: {"loanId": parseInt(id_loan)}}]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postLoan(data){
        try {
            const connect = await this.connection();
            let body = { ...data, "start_loan": new Date(), "finish_loan": new Date(data.finish_loan) }
            console.log(body);
            const result = await connect.insertOne(body);
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