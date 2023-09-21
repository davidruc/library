import { collectionGen } from "../db/connection.js";

class Staff {
    constructor() { };
    async connection() {
        try {
            const result = await collectionGen("staff");
            return result;
        } catch (error) {
            throw error;
        }
    };
    async getAllStaff(id_employee) {
        try {
            const connect = await this.connection();
            if (!id_employee) return await connect.find({}).toArray()
            return await connect.aggragate([{ $match: { "employeeId": parseInt(id_employee) } }]).toArray()
        } catch (error) {
            throw error;
        }
    };
    async postStaff(data) {
        try {
            const connect = await this.connection();
            let body = { ...data, "start_contract": new Date(data.start_contract) }
            const result = await connect.insertOne(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
    async updateStaff(id_employee, data) {
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
    async deleteStaff(id_employee) {
        try {
            const connect = await this.connection();
            const result = await connect.deleteOne({ "employeeId": parseInt(id_employee) });
            return result;
        } catch (error) {
            throw error;
        }
    };
    /* 28. Mostrar los empleados ordenados por sus áreas de trabajos. */
    async getStaffByTeams() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $project: {
                        _id: 0,
                        id: "$employeeId",
                        nombre: "$full_name",
                        equipo: "$team",
                        correo: "$email",
                        correo_empresarial: "$business_email",
                        numero: "$phone_number",
                        numero_empresarial: "$business_number",
                        salario: "$salary",
                        incio_contrato: "$start_contract",
                    }
                },
                {
                    $group: {
                        _id: "$equipo",
                        numero_empleados: {
                            $sum: 1
                        },
                        empleados: { $push: "$$ROOT" }

                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 29. Traer ordenados los empleados por salario */
    async getStaffBySalary() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $sort: {
                        salary: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: "$employeeId",
                        nombre: "$full_name",
                        equipo: "$team",
                        correo: "$email",
                        correo_empresarial: "$business_email",
                        numero: "$phone_number",
                        numero_empresarial: "$business_number",
                        salario: "$salary",
                        incio_contrato: "$start_contract",
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
    /* 30. Traer al empleado más antiguo de la biblioteca. */
    async getStaffBySeniority() {
        try {
            const connect = await this.connection();
            const result = await connect.aggregate([
                {
                    $sort: {
                        start_contract: 1
                    }
                },
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        id: "$employeeId",
                        nombre: "$full_name",
                        equipo: "$team",
                        correo: "$email",
                        correo_empresarial: "$business_email",
                        numero: "$phone_number",
                        numero_empresarial: "$business_number",
                        salario: "$salary",
                        incio_contrato: "$start_contract",
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            throw error;
        }
    };
}

export { Staff }