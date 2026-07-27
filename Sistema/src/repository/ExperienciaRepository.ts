import { pool } from "../db/Conexion";
import { Experiencia } from "../models/Experiencia";

export class ExperienciaRepository{
    async selectExperiencia(){
        const result = await pool.query(
            "SELECT * FROM experiencia ORDER BY id_experiencia"
        );
        return result.rows;
    }

    async selectExperienciaPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM experiencia WHERE id_experiencia = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertExperiencia(experiencia : Experiencia){
        const consulta = ` INSERT INTO experiencia
            (
                empresa,
                cargo,
                fecha_inicio,
                fecha_fin
            )

            VALUES

            (
                $1,$2,$3,$4
            )

            RETURNING *; 
            `;
        const values=[
            experiencia.empresa,
            experiencia.cargo,
            experiencia.fecha_inicio,
            experiencia.fecha_fin
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateExperiencia(id : number, experiencia : Experiencia){
        const consulta = `UPDATE experiencia SET 
            empresa=$1, cargo=$2, fecha_inicio=$3, fecha_fin=$4
            WHERE id_experiencia=$5
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            experiencia.empresa,
            experiencia.cargo,
            experiencia.fecha_inicio,
            experiencia.fecha_fin,
            id
        ]);
        return result.rows[0];
    }

    async deleteExperiencia(id : number){
        await pool.query("DELETE FROM experiencia WHERE id_experiencia = $1", [id]);
        return true;
    }

}
