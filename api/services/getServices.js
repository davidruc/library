import { Books } from "../collections/books.js";

export const getAllBooksService = async()=>{
    const book = new Books();
    return await book.getAllBooks();
}