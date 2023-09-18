import * as service from "../services/getServices.js";

export const BooksController = async(req, res, next)=>{
    try {
        const book = await service.getAllBooksService();
        res.status(200).send(book);
    } catch (error) {
        res.send(error);
    }
}
