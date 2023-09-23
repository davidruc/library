import { collectionGen } from "../db/connection.js";

export default async function siguienteId(coleccion){
    let db = await collectionGen("counters");
    const sequenceDocument = await db.findOneAndUpdate(
        { counter: `${coleccion}Id` },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after" }
    );
    return sequenceDocument.value.sequence_value;
}