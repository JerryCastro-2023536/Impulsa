import { pool } from "../db/Conexion";
import { Historial } from "../models/Historial";

export class HistorialRepository{
    async selectHistorial(){
        const result = await pool.query(
            "SELECT * FROM historial ORDER BY id_historial"
        );
        return result.rows;
    }

    async selectHistorialPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM historial WHERE id_historial = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertHistorial(historial : Historial){
        const consulta = ` INSERT INTO historial
            (
                pregunta,
                respuesta,
                fecha,
                id_perfil
            )

            VALUES

            (
                $1,$2,$3,$4
            )

            RETURNING *; 
            `;
        const values=[
            historial.pregunta,
            historial.respuesta,
            historial.fecha,
            historial.id_perfil
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateHistorial(id : number, historial : Historial){
        const consulta = `UPDATE historial SET 
            pregunta=$1, respuesta=$2, fecha=$3, id_perfil=$4
            WHERE id_historial=$5
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            historial.pregunta,
            historial.respuesta,
            historial.fecha,
            historial.id_perfil,
            id
        ]);
        return result.rows[0];
    }

    async deleteHistorial(id : number){
        await pool.query("DELETE FROM historial WHERE id_historial = $1", [id]);
        return true;
    }

}
