import { pool } from "../db/Conexion";
import { Habilidad } from "../models/Habilidad";

export class HabilidadRepository{
    async selectHabilidad(){
        const result = await pool.query(
            "SELECT * FROM habilidad ORDER BY id_habilidad"
        );
        return result.rows;
    }

    async selectHabilidadPorId(id: number){
        const result = await pool.query(
            "SELECT * FROM habilidad WHERE id_habilidad = $1",
            [id]
        );
        return result.rows[0];
    }

    async insertHabilidad(habilidad : Habilidad){
        const consulta = ` INSERT INTO habilidad
            (
                nombre,
                descripcion,
                nivel,
                id_perfil
            )

            VALUES

            (
                $1,$2,$3,$4
            )

            RETURNING *; 
            `;
        const values=[
            habilidad.nombre,
            habilidad.descripcion,
            habilidad.nivel,
            habilidad.id_perfil
        ];

        const result = await pool.query(consulta, values);

        return result.rows[0];
    }

    async updateHabilidad(id : number, habilidad : Habilidad){
        const consulta = `UPDATE habilidad SET 
            nombre=$1, descripcion=$2, nivel=$3, id_perfil=$4
            WHERE id_habilidad=$5
            RETURNING *;`
        
        const result = await pool.query(consulta, [
            habilidad.nombre,
            habilidad.descripcion,
            habilidad.nivel,
            habilidad.id_perfil,
            id
        ]);
        return result.rows[0];
    }

    async deleteHabilidad(id : number){
        await pool.query("DELETE FROM habilidad WHERE id_habilidad = $1", [id]);
        return true;
    }

}
