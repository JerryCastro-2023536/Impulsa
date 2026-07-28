import { pool } from "../db/Conexion";
import { Notificacion } from "../models/Notificacion";
import { BaseRepository } from "./BaseRepository";

export class NotificacionRepository extends BaseRepository {
    async selectNotificacion(){
        const result = await pool.query(
            "SELECT * FROM notificacion ORDER BY id_notificacion"
        );
        return result.rows;
    }

    async selectNotificacionPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM notificacion WHERE id_notificacion = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertNotificacion(notificacion : Notificacion){
        const consulta = ` INSERT INTO notificacion
            (
                titulo,
                mensaje,
                fecha_envio,
                tipo,
                id_perfil,
                id_organizacion
            )

            VALUES

            (
                $1,$2,$3,$4,$5,$6
            )

            RETURNING *; 
            `;
        const values=[
            notificacion.titulo,
            notificacion.mensaje,
            notificacion.fecha_envio,
            notificacion.tipo,
            notificacion.id_perfil,
            notificacion.id_organizacion
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateNotificacion(id : number, notificacion : Notificacion){
        const consulta = `UPDATE notificacion SET 
            titulo=$1, mensaje=$2, fecha_envio=$3, tipo=$4, id_perfil=$5, id_organizacion=$6
            WHERE id_notificacion=$7
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            notificacion.titulo,
            notificacion.mensaje,
            notificacion.fecha_envio,
            notificacion.tipo,
            notificacion.id_perfil,
            notificacion.id_organizacion,
            id
        ]);
        return result.rows[0];
    }

    async deleteNotificacion(id : number){
        await pool.query("DELETE FROM notificacion WHERE id_notificacion = $1", [id]);
        return true;
    }

}
