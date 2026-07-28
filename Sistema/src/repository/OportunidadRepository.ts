import { pool } from "../db/Conexion";
import { Oportunidad } from "../models/Oportunidad";
import { BaseRepository } from "./BaseRepository";

export class OportunidadRepository extends BaseRepository {
    async selectOportunidad(){
        const result = await pool.query(
            "SELECT * FROM oportunidad ORDER BY id_oportunidad"
        );
        return result.rows;
    }

    async selectOportunidadPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM oportunidad WHERE id_oportunidad = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertOportunidad(oportunidad : Oportunidad){
        const consulta = ` INSERT INTO oportunidad
            (
                titulo,
                tipo,
                categoria,
                descripcion,
                requisitos,
                fecha_publicacion,
                fecha_limite,
                modalidad,
                ubicacion,
                foto,
                estado,
                id_organizacion
            )

            VALUES

            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
            )

            RETURNING *; 
            `;
        const values=[
            oportunidad.titulo,
            oportunidad.tipo,
            oportunidad.categoria,
            oportunidad.descripcion,
            oportunidad.requisitos,
            oportunidad.fecha_publicacion,
            oportunidad.fecha_limite,
            oportunidad.modalidad,
            oportunidad.ubicacion,
            oportunidad.foto,
            oportunidad.estado,
            oportunidad.id_organizacion
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateOportunidad(id : number, oportunidad : Oportunidad){
        const consulta = `UPDATE oportunidad SET 
            titulo=$1, tipo=$2, categoria=$3, descripcion=$4, requisitos=$5,
            fecha_publicacion=$6, fecha_limite=$7, modalidad=$8, ubicacion=$9, foto=$10, estado=$11, id_organizacion=$12
            WHERE id_oportunidad=$13
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            oportunidad.titulo,
            oportunidad.tipo,
            oportunidad.categoria,
            oportunidad.descripcion,
            oportunidad.requisitos,
            oportunidad.fecha_publicacion,
            oportunidad.fecha_limite,
            oportunidad.modalidad,
            oportunidad.ubicacion,
            oportunidad.foto,
            oportunidad.estado,
            oportunidad.id_organizacion,
            id
        ]);
        return result.rows[0];
    }

    async deleteOportunidad(id : number){
        await pool.query("DELETE FROM oportunidad WHERE id_oportunidad = $1", [id]);
        return true;
    }

}
