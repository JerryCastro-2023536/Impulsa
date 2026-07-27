import { pool } from "../db/Conexion";
import { Organizacion } from "../models/Organizacion";

export class OrganizacionRepository{
    async selectOrganizacion(){
        const result = await pool.query(
            "SELECT * FROM organizacion ORDER BY id_organizacion"
        );
        return result.rows;
    }

    async selectOrganizacionPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM organizacion WHERE id_organizacion = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertOrganizacion(organizacion : Organizacion){
        const consulta = ` INSERT INTO organizacion
            (
                nombre,
                foto,
                tipo,
                descripcion,
                correo,
                telefono,
                sitio_web,
                pais,
                estado,
                fecha_registro,
                id_usuario
            )

            VALUES

            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
            )

            RETURNING *; 
            `;
        const values=[
            organizacion.nombre,
            organizacion.foto,
            organizacion.tipo,
            organizacion.descripcion,
            organizacion.correo,
            organizacion.telefono,
            organizacion.sitio_web,
            organizacion.pais,
            organizacion.estado,
            organizacion.fecha_registro,
            organizacion.id_usuario
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateOrganizacion(id : number, organizacion : Organizacion){
        const consulta = `UPDATE organizacion SET 
            nombre=$1, foto=$2, tipo=$3, descripcion=$4, correo=$5, telefono=$6, sitio_web=$7, pais=$8, estado=$9, fecha_registro=$10, id_usuario=$11
            WHERE id_organizacion=$12
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            organizacion.nombre,
            organizacion.foto,
            organizacion.tipo,
            organizacion.descripcion,
            organizacion.correo,
            organizacion.telefono,
            organizacion.sitio_web,
            organizacion.pais,
            organizacion.estado,
            organizacion.fecha_registro,
            organizacion.id_usuario,
            id
        ]);
        return result.rows[0];
    }

    async deleteOrganizacion(id : number){
        await pool.query("DELETE FROM organizacion WHERE id_organizacion = $1", [id]);
        return true;
    }

}
