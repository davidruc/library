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
                },
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      author: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 2. Filtrar todos los libros por autor. */
    async getBookByAuthor(name){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: 
                        {"author": {$regex: name, $options: "i"}}
                },
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                    $group: {
                      _id: "$autor",
                      libros: { $push: "$$ROOT" }
                    }
                   },
                   {
                    $project: {
                      _id: 0,
                      author: "$_id",
                      books: "$libros"
                    }
                   }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 3. Mostrar los libros agrupados por autores, de forma que se puedan observar todos los libros que tiene cada autor. */
    async getBooksAuthor(){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                $group: {
                  _id: "$autor",
                  libros: { $push: "$$ROOT" }
                }
               },
               {
                $project: {
                  _id: 0,
                  author: "$_id",
                  books: "$libros"
                }
               }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 4. mostrar todos los libros por su disponibilidad. */
    async getBookByAviability(state){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $match: 
                        { aviability: false }
                },
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 4.1 */
    async getBookAviable(title){
      try {
          const connect = await this.connection();
          const result = await connect.aggregate([
            {
              $match: {
                title: { $eq: title },
                aviability: { $eq: true }
              }
            },
            {
              $limit: 1
            },
            {
              $project: {
                _id: 0,
                codigo: "$code",
                titulo: "$title",
                autor: "$author",
                estado: "$status",
                editorial: "$editorial",
                categoria: "$category",
                clasificacion_Dewey: "$dewey_clasification",
                disponibilidad: "$aviability",
                version: "$book_version",
                ingreso: "$date_admission",
                descripcion: "$descript",
                ubicacion: "$location"
              }
            },
          ]).toArray()
          return result
      } catch (error) {
          throw error;
      }
  };
    
    /* 5. Mostrar todos los libros agrupados por sus 10 grandes áreas de la clasificación de dewey. */
    async getBookByDewey(){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                    $bucket: {
                      groupBy: "$clasificacion_Dewey",
                      boundaries: [ 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                      default: "Other",
                      output: {
                        "number": { $sum: 1 }, 
                        "books": { $push: "$$ROOT" }
                      }
                    }
                },
                {
                    $addFields: {
                      nombreRango: {
                        $switch: {
                          branches: [
                            { case: { $eq: ["$_id", 0] }, then: "Ciencias de la Computación, Información y Obras Generales." },
                            { case: { $eq: ["$_id", 100] }, then: "Filosofía y Psicología" },
                            { case: { $eq: ["$_id", 200] }, then: "Religión, Teología." },
                            { case: { $eq: ["$_id", 300] }, then: "Ciencias Sociales" },
                            { case: { $eq: ["$_id", 400] }, then: "Lenguas" },
                            { case: { $eq: ["$_id", 500] }, then: "Ciencias Básicas" },
                            { case: { $eq: ["$_id", 600] }, then: "Tecnología y Ciencias Aplicadas" },
                            { case: { $eq: ["$_id", 700] }, then: "Artes y recreación" },
                            { case: { $eq: ["$_id", 800] }, then: "Literatura." },
                            { case: { $eq: ["$_id", 900] }, then: "Historia y Geografía" },
                            { case: { $eq: ["$_id", "Otros"] }, then: "Otros" }
                          ],
                          default: "Desconocido"
                        }
                      }
                    }
                },
                
                {
                    $project: {
                      _id: 0,
                      categoria :"$nombreRango",
                      Dewey_categoria: "$_id",
                      libros_categoria: "$number",
                      libros: "$books"
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 6. Mostrar los libros agrupados por su ubicación en la biblioteca. */
    async getBookByLocation(place){
        try {
            const connect = await this.connection();
            if(!place) return await connect.aggregate([
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                $group: {
                  _id: "$ubicacion",
                  cantidad: { $sum: 1 },
                  libros: { $push: "$$ROOT" }
                }
               },
               {
                $project: {
                  _id: 0,
                  ubicacion: "$_id",
                  cantidad: "$cantidad",
                  books: "$libros"
                }
               }
            ]).toArray()
            return await connect.aggregate([
                {
                    $match: {
                        location: {$regex: place, $options: "i"}
                    }
                },
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                $group: {
                  _id: "$ubicacion",
                  cantidad: { $sum: 1 },
                  libros: { $push: "$$ROOT" }
                }
               },
               {
                $project: {
                  _id: 0,
                  ubicacion: "$_id",
                  cantidad: "$cantidad",
                  books: "$libros"
                }
               }
            ]).toArray()
        } catch (error) {
            throw error;
        }
    };
    /* 7. mostrar todos los libros de una editorial específica. */
    async getBookByEditorial(name){
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([    
                {
                    $match: 
                        {"editorial": {$regex: name, $options: "i"}}
                },
                {
                    $project: {
                      _id: 0,
                      codigo: "$code",
                      titulo: "$title",
                      autor: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
                {
                $group: {
                  _id: "$editorial",
                  cantidad: { $sum: 1 },
                  libros: { $push: "$$ROOT" }
                }
               },
               {
                $project: {
                  _id: 0,
                  editorial: "$_id",
                  cantidad: "$cantidad",
                  books: "$libros"
                }
               }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 8. mostrar todos los libros que tengan una antiguedad de más de N años */
    //!In progress
    /* 9. mostrar los libros ingresados por su año */
    async getBookByYear(year){
        try {
            const connect = await this.connection();
            const result = await connect.db.Books.aggregate([
                {
                  $addFields: {
                    year_admission: {$year: "$date_admission"}
                  }
                },
                {
                    $match: 
                        {year_admission: { $eq: year}}
                },
                {
                    $project: {
                      _id: 0,
                      date_search: "$oldBooks",
                      codigo: "$code",
                      titulo: "$title",
                      author: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 10. mostrar los libros segun su estado. */
    async getBookByStatus(status){
        try {
            const connect = await this.connection();
            const result = await connect.db.Books.aggregate([
                {
                    $match: 
                      {"status": {$regex: status, $options: "i"}}
                },
                {
                    $project: {
                      _id: 0,
                      date_search: "$oldBooks",
                      codigo: "$code",
                      titulo: "$title",
                      author: "$author",
                      estado: "$status",
                      editorial: "$editorial",
                      categoria: "$category",
                      clasificacion_Dewey: "$dewey_clasification",
                      disponibilidad: "$aviability",
                      version: "$book_version",
                      ingreso: "$date_admission",
                      descripcion: "$descript",
                      ubicacion: "$location"
                    }
                },
              ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 17. listar todos los libros que no tienen ninguna reservación activa  */
    async getBookReservationFree(name){
        try {
            const connect = await this.connection();
            if(!name) return await connect.aggregate([
              {
                $project: {
                  _id: 0,
                  codigo: "$code",
                  titulo: "$title",
                  autor: "$author",
                  estado: "$status",
                  editorial: "$editorial",
                  categoria: "$category",
                  clasificacion_Dewey: "$dewey_clasification",
                  disponibilidad: "$aviability",
                  version: "$book_version",
                  ingreso: "$date_admission",
                  descripcion: "$descript",
                  ubicacion: "$location"
                }
              },
              {
                $group: {
                  _id: "$titulo",
                  libros: { $push: "$$ROOT" }
                }
              },
              {
                $lookup: {
                  from: "reservations",
                  localField: "_id",
                  foreignField: "title_book",
                  as: "reservas"
                }
              },
              { 
                $match: {
                  reservas: {$eq: []}
                }
              },
              {
                $project: {
                  _id: 0,
                  libro: "$_id",
                  books: "$libros"
                }
              }
            ]).toArray();
            return  await connect.aggregate([
              {
                $project: {
                  _id: 0,
                  codigo: "$code",
                  titulo: "$title",
                  autor: "$author",
                  estado: "$status",
                  editorial: "$editorial",
                  categoria: "$category",
                  clasificacion_Dewey: "$dewey_clasification",
                  disponibilidad: "$aviability",
                  version: "$book_version",
                  ingreso: "$date_admission",
                  descripcion: "$descript",
                  ubicacion: "$location"
                }
              },
              {
                $group: {
                  _id: "$titulo",
                  libros: { $push: "$$ROOT" }
                }
              },
              {
                $lookup: {
                  from: "reservations",
                  localField: "_id",
                  foreignField: "title_book",
                  as: "reservas"
                }
              },
              { 
                $match: {
                  reservas: {$eq: []}
                }
              },
              {
                $project: {
                  _id: 0,
                  libro: "$_id",
                  books: "$libros"
                }
              },
              {
                $match: {
                  libro: { $eq: name }
                }
              }
            ]).toArray();
        } catch (error) {
            throw error;
        }
    };
}

export { Books }