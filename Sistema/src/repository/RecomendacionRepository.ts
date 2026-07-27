import { pool } from "../db/Conexion";
import { Recomendacion } from "../models/Recomendacion";

export class RecomendacionRepository{
    async selectRecomendacion(){
        const result = await pool.query(
            "SELECT * FROM recomendacion ORDER BY id_recomendacion"
        );
        return result.rows;
    }

    async selectRecomendacionPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM recomendacion WHERE id_recomendacion = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertRecomendacion(recomendacion : Recomendacion){
        const consulta = ` INSERT INTO recomendacion
            (
                porcentaje,
                fecha_generacion,
                id_perfil,
                id_oportunidad
            )

            VALUES

            (
                $1,$2,$3,$4
            )

            RETURNING *; 
            `;
        const values=[
            recomendacion.porcentaje,
            recomendacion.fecha_generacion,
            recomendacion.id_perfil,
            recomendacion.id_oportunidad
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateRecomendacion(id : number, recomendacion : Recomendacion){
        const consulta = `UPDATE recomendacion SET 
            porcentaje=$1, fecha_generacion=$2, id_perfil=$3, id_oportunidad=$4
            WHERE id_recomendacion=$5
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            recomendacion.porcentaje,
            recomendacion.fecha_generacion,
            recomendacion.id_perfil,
            recomendacion.id_oportunidad,
            id
        ]);
        return result.rows[0];
    }

    async deleteRecomendacion(id : number){
        await pool.query("DELETE FROM recomendacion WHERE id_recomendacion = $1", [id]);
        return true;
    }
}
