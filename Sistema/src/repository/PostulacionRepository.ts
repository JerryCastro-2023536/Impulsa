import { pool } from "../db/Conexion";
import { Postulacion } from "../models/Postulacion";
import { BaseRepository } from "./BaseRepository";

export class PostulacionRepository extends BaseRepository {
    async selectPostulacion(){
        const result = await pool.query(
            "SELECT * FROM postulacion ORDER BY id_postulacion"
        );
        return result.rows;
    }

    async selectPostulacionPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM postulacion WHERE id_postulacion = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertPostulacion(postulacion : Postulacion){
        const consulta = ` INSERT INTO postulacion
            (
                fecha_post,
                estado,
                observaciones,
                id_perfil,
                id_oportunidad
            )

            VALUES

            (
                $1,$2,$3,$4,$5
            )

            RETURNING *; 
            `;
        const values=[
            postulacion.fecha_postulacion,
            postulacion.estado,
            postulacion.observaciones,
            postulacion.id_perfil,
            postulacion.id_oportunidad
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updatePostulacion(id : number, postulacion : Postulacion){
        const consulta = `UPDATE postulacion SET 
            fecha_post=$1, estado=$2, observaciones=$3, id_perfil=$4, id_oportunidad=$5
            WHERE id_postulacion=$6
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            postulacion.fecha_postulacion,
            postulacion.estado,
            postulacion.observaciones,
            postulacion.id_perfil,
            postulacion.id_oportunidad,
            id
        ]);
        return result.rows[0];
    }

    async deletePostulacion(id : number){
        await pool.query("DELETE FROM postulacion WHERE id_postulacion = $1", [id]);
        return true;
    }
}
